import {Application, Flavor, ModifierType} from "./modifier.types";
import {DataManager} from "./dataManagers/DataManager";
import type {StackingManager} from "./stackingManagers/StackingManager";

export type ModifierFactory = (props: CreateProps) => Modifier | null;

export interface CreateProps {
    definition: unknown,
    enabled: boolean
}

export interface Schema {
    identifier: string;
    type: ModifierType;
    application: Application
}

export abstract class Modifier {

    /**
     * Hard type definition so it's easier to discriminate between modifiers types
     */
    public readonly type: ModifierType;

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

    protected constructor(definition: Schema) {
        this.application = definition.application
        this.type = definition.type
        this.identifier = definition.identifier
    }

    /**
     * Manager which handles save data for this modifier
     */
    public abstract dataManager: DataManager | null;

    /**
     * Manager which handles stacking logic of multiple modifiers across an actor
     */
    public abstract stackingManager: StackingManager | null;

    protected flavor: Flavor = {
        title: 'Base Modifier',
        description: 'This should not be on your item',
        disclaimer: null,
    }

    public getFlavor = (): Flavor => {
        return this.flavor
    };

}
