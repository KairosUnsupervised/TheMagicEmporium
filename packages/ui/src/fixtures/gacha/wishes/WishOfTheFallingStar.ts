import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfTheFallingStarFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-the-falling-star",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfTheFallingStar.jpg",
	name: "Wish of the Falling Star",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"A star falls, and with it every promise it carried. +1 Luck to Rarity, +1 Luck to Modifiers",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-the-falling-star",
			operations: [
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 1 },
				{ field: Field.FloatLuck, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfTheFallingStarFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
