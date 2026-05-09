import {Rarity} from "../item/item.types";

export enum Slot {
    Primary = 'PRIMARY',
    Secondary = 'SECONDARY',
    Tertiary = 'TERTIARY',
}

export type FloatBias = 'NORMAL' | 'LUCKY' | 'UNLUCKY';

export interface Template {
    rarity: Rarity;
    slots: Slot[];
    points: number;
    nonFloatCost: number;
    floatBias: FloatBias;
}
