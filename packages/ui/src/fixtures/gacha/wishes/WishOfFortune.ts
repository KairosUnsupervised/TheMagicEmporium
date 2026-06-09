import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import img from "./WishOfFortune.jpg";

export const wishOfFortuneFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-fortune",
	img,
	name: "Wish of Fortune",
	system: {
		quantity: 4,
		description: {
			value:
				"Call upon the luck that lies dormant in all things. +0.5 Luck to Rarity, +1 Reveals",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-fortune",
			operations: [
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 0.5 },
				{ field: Field.RevealAmount, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfFortuneFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
