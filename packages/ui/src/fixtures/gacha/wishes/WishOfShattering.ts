import {
	Field,
	type GachaItem5e,
	GachaItemType, LockOperation,
	NumberOperation,
	WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./WishOfShattering.jpg";

export const wishOfShatteringFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-shattering",
	img,
	name: "Wish of Shattering",
	system: {
		quantity: 4,
		description: {
			value: "Fate itself cracks open. Locks to one reveal and one pull. +2 to Luck for Rarity",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-shattering",
			operations: [
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.PickAmount, op: LockOperation.Lock },
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.RevealAmount, op: LockOperation.Lock },
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 2 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfShatteringFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
