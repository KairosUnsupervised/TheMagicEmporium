import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	LockOperation,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfTheBlindMonkFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-the-blind-monk",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfTheBlindMonk.jpg",
	name: "Wish of the Blind Monk",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"You surrender your sight to fate. +1 Luck to Rarity, you are forced to be blind",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-the-blind-monk",
			operations: [
				{ field: Field.VisibilityLevel, op: LockOperation.Unlock },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 0 },
				{ field: Field.VisibilityLevel, op: LockOperation.Lock },
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfTheBlindMonkFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
