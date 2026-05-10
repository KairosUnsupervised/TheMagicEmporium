import {namespace} from "@tme/shared/src/namespaceConfig";
import {ItemType} from "@tme/shared/src/types/item5e";
import {ActiveEffectSchema, ModeSchema} from "./activeEffect.schema";
import {Icon} from "../../item/icon";

export enum Mode {
    /**
     * The Custom change mode applies logic defined by a game system or add-on module.
     */
    Custom = 0,
    /**
     * Multiplies the defined attribute by the numeric value in the Effect Value field.
     */
    Multiply = 1,
    /**
     * Adds the provided value to a number. This can be used to both add and subtract from a particular value by specifying +1 or -1 as the value to add.
     */
    Add = 2,
    /**
     * Reduces the defined attribute only in cases where the current value of that attribute would be greater than value specified in the Effect Value field.
     */
    Downgrade = 3,
    /**
     * Increases the defined attribute only in cases where the current value of that attribute would be less than value specified in the Effect Value field.
     */
    Upgrade = 4,
    /**
     * Replaces the defined attribute with the value provided in the Effect Value field.
     */
    Override = 5,
}

interface Change {
    key: string;
    mode: Mode;
    value: string;
}

interface Document {
    name: string;
    type: 'base';
    description: string;
    img: string;
    transfer: boolean;
    changes: Change[];
    flags: {
        [namespace.core.id]: {
            identifier: string;
            type: ItemType
        }
    }
}

type CreateDefinition = ActiveEffectSchema & Required<Pick<ActiveEffectSchema, 'title' | 'description' | 'disclaimer'>>;

export class ActiveEffect {
    public document: Document = {
        name: 'Unnamed Effect',
        type: 'base',
        description: '',
        img: `worlds/${game.world.id}/data/${namespace.core.id}/icons/${Icon.Effect}`,
        transfer: true,
        changes: [],
        flags: {
            [namespace.core.id]: {
                identifier: "identifier",
                type: ItemType.TemporaryItem
            }
        }
    };

    static create = (definition: CreateDefinition) => {

        let description = `<p><strong>${definition.description}</strong></p>`;

        if (definition.disclaimer !== '' && definition.disclaimer !== null) {
            description = `${description}<p><em>${definition.disclaimer}</em></p>`;
        }

        const changes = definition.changes.map((effect) => ({
            key: effect.key,
            mode: ActiveEffect.schemaModeToRealMode(effect.mode),
            value: effect.value,
        }));

        return new ActiveEffect({
            name: definition.title,
            description,
            changes,
        })
    }

    constructor(props: Partial<Document>) {
        this.document = {...this.document, ...props};
    }


    public export = (identifier: string): object => {
        this.document.flags[namespace.core.id].identifier = identifier;
        return this.document;
    };

    private static schemaModeToRealMode = (mode: ModeSchema): Mode => {
        const map: Record<ModeSchema, Mode> = {
            [ModeSchema.Custom]: Mode.Custom,
            [ModeSchema.Multiply]: Mode.Multiply,
            [ModeSchema.Add]: Mode.Add,
            [ModeSchema.Downgrade]: Mode.Downgrade,
            [ModeSchema.Upgrade]: Mode.Upgrade,
            [ModeSchema.Override]: Mode.Override,
        }
        return map[mode];
    }

}
