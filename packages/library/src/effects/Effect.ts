import {ActiveEffect} from "./activeEffects/ActiveEffect";
import {EffectType, validateEffect} from "./effect.schema";
import {Logger} from "../misc/Logger";
import {validateActiveEffectSchema} from "./activeEffects/activeEffect.schema";
import {Flavor} from "../modifiers/modifier.types";

/**
 * This is a utility class that bridges the gap between raw JSON definitions for ActiveEffects and Feats their clean class instance counterpart
 */
export class Effect {

    /**
     * Parse an array of effect definitions into valid instances
     * @param json Raw JSON definition of an effect
     * @param defaultFlavor Default title and description to fall back to if not specified
     */
    static parseEffectDefinitions = (json: unknown[], defaultFlavor: Flavor): (ActiveEffect)[] => {

        return json.map((part) => {

            if (!validateEffect(part)) {
                Logger.error("Invalid effect", {errors: validateEffect.errors})
                return null;
            }

            const type: EffectType = part.type;

            switch (type) {
                case EffectType.ActiveEffect:
                    return Effect.parseActiveEffectDefinition(part, defaultFlavor);
                case EffectType.Feat:
                    Logger.error("FEATS ARE NOT YET IMPLEMENTED")
                    return null;
                default:
                    return null;
            }
        }).filter((item) => {
            return item !== null;
        })
    };


    static parseActiveEffectDefinition = (json: unknown, defaultFlavor: Flavor): null | ActiveEffect => {
        if (!validateActiveEffectSchema(json)) {
            Logger.error("Invalid activeEffect definition", {errors: validateActiveEffectSchema.errors, json})
            return null;
        }

        return ActiveEffect.create({
            ...defaultFlavor,
            ...json,
        })
    }

}
