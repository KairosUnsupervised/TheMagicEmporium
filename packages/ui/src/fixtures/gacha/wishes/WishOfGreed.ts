import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./WishOfGreed.jpg";

export const wishOfGreedFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-greed",
	img,
	name: "Wish of Greed",
	system: {
		quantity: 4,
		description: {
			value: "More. Always more. +2 Pulls, -2 Luck to Rarity",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-greed",
			operations: [
				{ field: Field.PickAmount, op: NumberOperation.Add, value: 2 },
				{ field: Field.RarityLuck, op: NumberOperation.Subtract, value: 2 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfGreedFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
