import Ajv from "ajv"
import {Modifier, ModifierFactory} from "../modifiers/Modifier";
import {UniqueModifier} from "../modifiers/blueprints/UniqueModifier";
import {Logger} from "../misc/Logger";
import {ModifierType} from "../modifiers/modifier.types";

const ajv = new Ajv()

const validateType = ajv.compile<{ type: ModifierType }>({
    type: "object",
    required: ["type"],
    properties: {
        type: {type: "string", enum: Object.values(ModifierType)},
    },
})

const factoryMap: Record<ModifierType, ModifierFactory> = {
    [ModifierType.UNIQUE]: UniqueModifier.create
}

export class Registry {
    /**
     * Modifiers that have weight and can be drawn
     */
    public weighted: Modifier[] = [];

    /**
     * All modifiers mapped by their identifier
     */
    public mapped: { [key: string]: Modifier } = {};

    /**
     * Loads all modifiers of a specific pack into the registry
     * @param packs
     */
    public loadPacks = async (packs: { modifiers: unknown[], enabled: boolean }[]): Promise<void> => {
        packs.forEach((pack) => {

            pack.modifiers.forEach((modifier) => {

                this.loadModifier(modifier, pack.enabled)
            })

        })
    }

    /**
     * Load a specific modifier into the registry
     * @param definition
     * @param enabled
     */
    public loadModifier = (definition: unknown, enabled: boolean): Modifier | null => {
        if (!validateType(definition)) {
            Logger.error("Invalid modifier type", {errors: validateType.errors})
            return null;
        }

        const modifier = factoryMap[definition.type]({definition, enabled})

        if (!modifier) {
            return null;
        }

        if(this.mapped[modifier.identifier]) {
            Logger.error("Duplicate modifier identifier, the duplicate will not be added to the registry", {identifier: modifier.identifier})
            return null;
        }
        this.mapped[modifier.identifier] = modifier

        if(modifier.application.weight > 0) {
            this.weighted.push(modifier)
        }

        return modifier;
    }


}
