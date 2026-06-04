import type { Rarity } from "../item/item.types";
import type { Restriction } from "../modifiers/modifier.schema";

export type FloatBias = "NORMAL" | "LUCKY" | "UNLUCKY";

export interface Template {
	rarity: Rarity;
	weight: number;

	slots: Restriction[];
	points: number;
	nonFloatCost: number;
	floatBias: FloatBias;
	backgroundEligible: boolean;

	gold: {
		/**
		 * Guaranteed gold
		 */
		min: number;
		/**
		 * Random additional gold
		 */
		additional: number;
		/**
		 * Impact factor for the base equipment value
		 */
		equipmentValueImpact: number;
	};
}
