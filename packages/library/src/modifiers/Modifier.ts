import {Application, Flavor, ModifierType} from "./modifier.types";

export type ModifierFactory = (props: CreateProps) => Modifier | null;

export interface CreateProps {
    definition: unknown,
    enabled: boolean
}

export abstract class Modifier {

    public abstract type: ModifierType;
    //public abstract schema: unknown;

    // biome-ignore lint/complexity/noUselessConstructor: Required for type inheritance
    public constructor(_data: unknown) {

    }

    /**
     * Unique identifier under which this modifier gets saved <br>
     * Use SCREAMING_SNAKE_CASE
     */
    public identifier: string = "TODO";

    // /**
    //  * Manager which handles save data for this modifier
    //  */
    // public abstract dataManager: DataManager | null;

    // /**
    //  * Manager which handles stacking logic of multiple modifiers across an actor
    //  */
    // public abstract stackingManager: StackingManager;

    /**
     * Configure when this modifier can be applied to an item <br/>
     * See {@link Application} for more information
     */
    public application: Application = {
        weight: 0,
        tags: {
            whitelistedBy: [],
            blacklistedBy: [],
            applies: [],
        },
    };

    protected flavor: Flavor = {
        title: 'Base Modifier',
        description: 'This should not be on your item',
        disclaimer: null,
    }

    public getFlavor = (): Flavor => {
        return this.flavor
    };

}
