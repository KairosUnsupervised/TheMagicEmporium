import {ActiveEffect} from "../effects/activeEffects/ActiveEffect";
import {Feat} from "../effects/feats/Feat";
import {Application, Flavor, ModifierType} from "./modifier.schema";
import {DataManager} from "./dataManagers/DataManager";
import {applyKeydotChanges, KeydotChange} from "./keydot";

export type ModifierFactory = (props: CreateProps) => Modifier | null;

export interface CreateProps {
    definition: unknown,
    enabled: boolean
}

export interface BaseSchema {
    identifier: string;
    type: ModifierType;
    application: Application
    flavor: Flavor
}

export interface AppliedModifier {
    modifier: Modifier;
    data: unknown;
}

export abstract class Modifier<Schema extends BaseSchema = BaseSchema> {

    /**
     * Unique identifier under which this modifier gets saved <br>
     * Use SOURCE.SCREAMING_SNAKE_CASE_NAME naming convention
     */
    public readonly identifier: string;

    /**
     * Configure when this modifier can be applied to an item <br/>
     * See {@link Application} for more information
     */
    public readonly application: Application;

    public readonly schema: Schema;

    public readonly dataManager: DataManager | null = DataManager.Disabled;

    protected constructor(definition: Schema) {
        this.identifier = definition.identifier
        this.application = definition.application
        this.schema = definition;
    }

    /**
     * Retrieves a description for a slot on an item
     * @param _data TODO Either null or an object containing the data
     */
    public getDescription(_data: unknown): Flavor {
        return this.schema.flavor;
    };

    /**
     * Retrieves activeEffects and feats for the actor
     * @param _data
     */
    public getEffects = (_data: any[]): (ActiveEffect | Feat)[] => {
        return []
    };

    /**
     * Retrieves keydot changes to be applied to the item document
     * @param _data
     */
    public getItemChanges = (_data: unknown): KeydotChange[] => {
        return [];
    };

    /**
     * Applies an array of keydot operations to a document, returning a new patched copy.
     */
    protected applyChanges = <T extends object>(target: T, changes: KeydotChange[]): T => {
        return applyKeydotChanges(target, changes);
    };

    /**
     * Replaces every {key} placeholder with the matching value
     */
    protected replaceKeyWords = <T>(target: T, replacements: Record<string, string>): T => {
        let json = JSON.stringify(target);
        for (const [key, value] of Object.entries(replacements)) {
            json = json.replaceAll(`{${key}}`, value);
        }
        return JSON.parse(json);
    };

}
