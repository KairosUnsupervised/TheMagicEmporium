import {Rarity} from "../item/item.types";
import {Restriction} from "../modifiers/modifier.schema";

export type FloatBias = 'NORMAL' | 'LUCKY' | 'UNLUCKY';

export interface Template {
    rarity: Rarity;
    slots: Restriction[];
    points: number;
    nonFloatCost: number;
    floatBias: FloatBias;
}
