import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Modifier } from "@tme/library/src/modifiers/Modifier";
import {Actor5e} from "@tme/shared/src/types/actor5e.ts"
import {Item5e, BaseItem} from "@tme/shared/src/types/item5e.ts";
import {MagicItem} from "@tme/library/src/item/Item.ts";

// interface MagicItem {
//     item5e: Item5e<BaseItem>;
//     itemV3: ItemV3;
// }

interface QuickAccess {
    item5e: Item5e<BaseItem>;
    abstract: AbstractItem;
}

export class Validator {
    public validate = async (actor: Actor5e) => {

        const magicItems = this.getActiveMagicItems(actor);
        const modifiers = this.getAllModifiers(magicItems);

        await this.synchronizeDescriptions(magicItems);

        console.log(magicItems)
        console.log(modifiers)
        //
        // const effects = MagicEffect.create();
        // modifiers.forEach((modifier) => {
        //     modifier.getMagicEffects(effects);
        // });
        //
        // await this.synchronizeFeats(effects.feats, actor);
        // await this.synchronizeEffects(effects.activeEffects, actor);
    };

    /**
     * Check descriptions of base items and update if necessarry
     * @param items
     */
    private synchronizeDescriptions = async (items: QuickAccess[]) => {
        const sync = items.map((item) => {
            const newDocument = new MagicItem(item.abstract).export();

            if (
                item.item5e.system.description.value ===
                newDocument.system?.description?.value
            ) {
                return null;
            }

            return item.item5e.update({
                system: {
                    description: {
                        value: newDocument.system?.description?.value,
                    },
                },
            });
        });
        await Promise.all(sync);
    };

    /**
     * Retrieve all active base magic items from an actor
     * @param actor
     */
    private getActiveMagicItems = (actor: Actor5e): QuickAccess[] => {
        return actor.items
            .map((item: Item5e) => {
                if (!item.system.attuned) {
                    return null;
                }
                if (!item.system.equipped) {
                    return null;
                }
                return {
                    abstract: AbstractItem.createFromDocument(item),
                    item5e: item,
                };
            })
            .filter((item) => item !== null) as QuickAccess[];
    };

    /**
     * Get all stacked modifiers from a list of magic items
     * @param items
     */
    private getAllModifiers = (items: QuickAccess[]): Modifier[] => {
        /**
         * Group all modifiers by their identifier
         */
        const modifierMap: { [key: string]: Modifier[] } = {};

        items.forEach((item) => {
            const all = [
                ...item.abstract.primary,
                ...item.abstract.secondary,
                ...item.abstract.tertiary,
            ];
            all.forEach((modifier) => {
                const id = modifier.identifier;

                if (!modifierMap[id]) {
                    modifierMap[id] = [];
                }

                modifierMap[id].push(modifier);
            });
        });

        /**
         * Call each stacking manager and merge their result
         */
        const output: Modifier[] = [];
        Object.values(modifierMap).forEach((modifierList) => {
            if(modifierList[0].stackingManager === null){
                return;
            }
            const result = modifierList[0].stackingManager.calculate(modifierList);
            result.forEach((modifier) => {
                output.push(modifier);
            });
        });
        return output;
    };
    //
    // private getMagicFeats = (actor: Actor5e) => {
    //     return actor.items.filter((item: Item5e) => {
    //         if (!item.flags.magicInfluxV3) {
    //             return false;
    //         }
    //
    //         if (item.flags.magicInfluxV3.type === 'SUB_ITEM') {
    //             return true;
    //         }
    //
    //         return false;
    //     });
    // };
    //
    // private synchronizeFeats = async (feats: Feat[], actor: Actor5e) => {
    //     let remaining = this.getMagicFeats(actor);
    //
    //     const creation = feats.map((feat, index) => {
    //         const id = feat.document.name + index;
    //
    //         /**
    //          * If the feat exists, remove it from the remaining array
    //          */
    //         const exists = remaining.find((item) => {
    //             // @ts-ignore
    //             return item.flags.magicInfluxV3?.id === id;
    //         });
    //
    //         if (exists) {
    //             remaining = remaining.filter((item) => {
    //                 // @ts-ignore
    //                 return item.flags.magicInfluxV3?.id !== id;
    //             });
    //             return;
    //         }
    //
    //         Logger.log('Creating SubItem', {
    //             id,
    //         });
    //
    //         return actor.createEmbeddedDocuments('Item', [
    //             {
    //                 ...feat.export(),
    //                 flags: {
    //                     magicInfluxV3: {
    //                         type: 'SUB_ITEM',
    //                         id,
    //                     },
    //                 },
    //             },
    //         ]);
    //     });
    //     await Promise.all(creation);
    //
    //     /**
    //      * Remove remaining feats
    //      */
    //     for (const item of remaining) {
    //         Logger.log('Removing feat', { item });
    //         // @ts-ignore
    //         await actor.deleteEmbeddedDocuments('Item', [item.id]);
    //     }
    // };
    //
    // private getMagicEffects = (actor: Actor5e) => {
    //     return actor.effects.filter((effect: Effect5e) => {
    //         if (!effect.flags.magicInfluxV3) {
    //             return false;
    //         }
    //
    //         if (effect.flags.magicInfluxV3.type === 'SUB_EFFECT') {
    //             return true;
    //         }
    //
    //         return false;
    //     });
    // };
    //
    // private synchronizeEffects = async (
    //     effects: ActiveEffect[],
    //     actor: Actor5e,
    // ) => {
    //     let remaining = this.getMagicEffects(actor);
    //
    //     const creation = effects.map((effect, index) => {
    //         const id = effect.document.name + index;
    //
    //         /**
    //          * If the effect exists, remove it from the remaining array
    //          */
    //         const exists = remaining.find((effect) => {
    //             return effect.flags.magicInfluxV3?.id === id;
    //         });
    //
    //         if (exists) {
    //             remaining = remaining.filter((effect) => {
    //                 return effect.flags.magicInfluxV3?.id !== id;
    //             });
    //             return;
    //         }
    //
    //         Logger.log('Creating SubEffect', {
    //             id,
    //         });
    //
    //         return actor.createEmbeddedDocuments('ActiveEffect', [
    //             {
    //                 ...effect.export(),
    //                 flags: {
    //                     magicInfluxV3: {
    //                         type: 'SUB_EFFECT',
    //                         id,
    //                     },
    //                 },
    //             },
    //         ]);
    //     });
    //     await Promise.all(creation);
    //
    //     /**
    //      * Remove remaining effects
    //      */
    //     for (const item of remaining) {
    //         Logger.log('Removing effect', { item });
    //         // @ts-ignore
    //         await actor.deleteEmbeddedDocuments('ActiveEffect', [item.id]);
    //     }
    // };
}
