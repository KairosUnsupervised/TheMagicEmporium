import {Rarity} from "../item/item.types";

export const getRandomRarity = (): Rarity => {
    const random = Math.random();
    if (random < 0.08)                   return Rarity.Legendary;
    if (random < 0.08 + 0.12)           return Rarity.VeryRare;
    if (random < 0.08 + 0.12 + 0.15)   return Rarity.Rare;
    if (random < 0.08 + 0.12 + 0.15 + 0.25) return Rarity.Uncommon;
    return Rarity.Common;
};
