import type { Rarity } from "../item/item.types";
import type { Restriction } from "../modifiers/modifier.schema";

export interface Template {
	/**
	 * Item output rarity
	 */
	rarity: Rarity;
	/**
	 * Weight of this specific template to be rolled
	 */
	weight: number;

	/**
	 * Max amount of specific slots that can be rolled
	 */
	slots: Restriction[];
	/**
	 * Max amount of points for this item, each float reduced its value from remaining points until none are left
	 */
	points: number;
	nonFloatCost: number;

	/**
	 * Allows the item to have a background provided by a modifier
	 */
	backgroundEligible: boolean;
	/**
	 * Luck of the rolled floats, supports decimals
	 * @example 0 = neutral
	 * @example 1 = lucky
	 * @example 2 = double lucky
	 * @example -1 = unlucky
	 */
	luck: number;

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
