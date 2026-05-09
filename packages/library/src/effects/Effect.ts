import {ActiveEffect} from "./activeEffects/ActiveEffect";
import {Feat} from "./feats/Feat";
import {EffectType, validateEffect} from "./effect.schema";
import {Logger} from "../misc/Logger";
import {validateActiveEffectSchema} from "./activeEffects/activeEffect.schema";
import {FeatSchema, validateFeatSchema} from "./feats/feat.schema";
import {Flavor} from "../modifiers/modifier.schema";

/**
 * This is a utility class that bridges the gap between raw JSON definitions for ActiveEffects and Feats their clean class instance counterpart
 */
export class Effect {

    /**
     * Parse an array of effect definitions into valid instances
     * @param json Raw JSON definition of an effect
     * @param defaultFlavor Default title and description to fall back to if not specified
     */
    static parseEffectDefinitions = (json: unknown[], defaultFlavor: Flavor): (ActiveEffect | Feat)[] => {

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
                    return Effect.parseFeatDefinition(part, defaultFlavor);
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

    static parseFeatDefinition = (json: unknown, defaultFlavor: Flavor): null | Feat => {
        if (!validateFeatSchema(json)) {
            Logger.warn("Feat definition has mismatched properties — importing anyway", {errors: validateFeatSchema.errors, json})
        }

        return Feat.create({
            ...defaultFlavor,
            ...(json as FeatSchema),
        })
    }

}
