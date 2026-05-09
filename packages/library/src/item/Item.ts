import {merge} from "ts-deepmerge";
import {AbstractItem} from "./AbstractItem";
import {DeepPartial} from "@tme/shared/src/helpers/deepPartial.types";
import {equipmentDetails} from "./equipment/equipment.details";
import {namespace} from "@tme/shared/src/namespaceConfig";
import {AppliedModifier} from "../modifiers/Modifier";
import {generateDescriptionV3} from "./generateDescription";
import {Item5e, ItemType} from "@tme/shared/src/types/item5e";

/**
 * Represent a magic item from the 5e system view
 */
export class MagicItem {
    // TODO Stop polluting the global scope

    private readonly abstractItem: AbstractItem;

    private document: DeepPartial<Item5e> = {
        name: 'Unset Item Name',
        img: "IMAGE.png", // TODO replace image
        system: {
            price: {
                value: 0,
                denomination: 'gp',
            },
            description: {
                chat: '',
                value: '',
            },
            properties: ['mgc'],
            weight: 777,
            rarity: 'common',
            attunement: 1,
        },
    };

    public static create = (abstractItem: AbstractItem) => {
        return new MagicItem(abstractItem)
    };

    constructor(abstractItem: AbstractItem) {
        this.abstractItem = abstractItem;

        this.addBase();
        this.addRarity();
        this.addName();
        this.addDescription();
        this.mergeModifiers();
    }

    private addBase = () => {
        const details = equipmentDetails[this.abstractItem.base];
        console.log("WTF", {details, base: this.abstractItem.base})

        this.merge({
            ...details.foundry,
        });

        this.merge({
            system: {
                weight: details.weight,
                price: {
                    value: this.abstractItem.currency + details.value,
                },
            },
        });
    };

    private addDescription = () => {
        // @ts-expect-error
        this.document.system.description.value = generateDescriptionV3(this.abstractItem);
    };

    private addRarity = () => {
        this.merge({
            system: {
                rarity: this.abstractItem.rarity,
            },
        });
    };

    private addName = () => {
        this.merge({
            name: this.abstractItem.name,
        });
    };

    private mergeModifiers = () => {
        // TODO IMPLEMENT THIS AGAIN
        // const modifiers = [
        //     ...this.abstractItem.primary,
        //     ...this.abstractItem.secondary,
        //     ...this.abstractItem.tertiary,
        // ];
        // modifiers.forEach((applied) => {
        //     const result = applied.modifier.mergeFoundryItem({
        //         item: this.item,
        //         document: this.document as Item5e,
        //     });
        //     if (result) {
        //         this.merge(result);
        //     }
        // });
    };

    public merge = (document: DeepPartial<Item5e>) => {
        this.document = merge.withOptions(
            {mergeArrays: true},
            this.document,
            document,
        ) as typeof this.document;
        return this;
    };

    public export = (folder?: string) => {
        return {
            ...this.document,
            flags: {
                [namespace.core.id]: {
                    type: ItemType.MagicItem,
                    base: this.abstractItem.base,
                    primary: this.exportModifiers(this.abstractItem.primary),
                    secondary: this.exportModifiers(this.abstractItem.secondary),
                    tertiary: this.exportModifiers(this.abstractItem.tertiary),
                },
            },
            folder,
        };
    };

    private exportModifiers = (mods: AppliedModifier[]) => {
        return mods.map(({ modifier, data }) => ({
            identifier: modifier.identifier,
            data,
        }));
    };

}
