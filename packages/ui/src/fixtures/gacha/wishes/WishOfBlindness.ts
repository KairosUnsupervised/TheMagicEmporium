import {
	Field,
	type GachaItem5e,
	GachaItemType,
	LockOperation,
	NumberOperation,
	WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./WishOfBlindness.jpg";

export const wishOfBlindnessFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-blindness",
	img,
	name: "Wish of Blindness",
	system: {
		quantity: 4,
		description: {
			value: "You surrender your sight to fate. +1 Luck to Rarity, you are forced to be blind",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-blindness",
			operations: [
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 0 },
				{ field: Field.VisibilityLevel, op: LockOperation.Lock },
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfBlindnessFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
