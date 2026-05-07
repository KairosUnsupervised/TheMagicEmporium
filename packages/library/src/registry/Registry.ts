import {Modifier, ModifierFactory} from "../modifiers/Modifier";
import {UniqueModifier} from "../modifiers/blueprints/UniqueModifier";
import {Logger} from "../misc/Logger";
import {ModifierType, validateModifierTypeSchema} from "../modifiers/modifier.schema";
import {LinearModifier} from "../modifiers/blueprints/LinearModifier";

const factoryMap: Record<ModifierType, ModifierFactory> = {
    [ModifierType.UNIQUE]: UniqueModifier.create,
    [ModifierType.LINEAR]: LinearModifier.create
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
     * Registers all modifiers of a specific pack into the registry
     * @param packs
     */
    public registerPacks = async (packs: { modifiers: unknown[], enabled: boolean }[]): Promise<void> => {
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
        if (!validateModifierTypeSchema(definition)) {
            Logger.error("Invalid modifier type", {errors: validateModifierTypeSchema.errors})
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

    public get = (identifier: string): Modifier | null => {
        if (this.mapped[identifier]) {
            return this.mapped[identifier];
        }
        Logger.error(`No modifier found with identifier ${identifier}`);
        return null;
    };

}

export const registry = new Registry()
