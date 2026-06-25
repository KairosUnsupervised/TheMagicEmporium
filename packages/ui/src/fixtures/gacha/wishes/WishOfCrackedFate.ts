import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	LockOperation,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfCrackedFateFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-cracked-fate",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfCrackedFate.jpg",
	name: "Wish of Cracked Fate",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"Fate itself cracks open. Locks to one reveal and one pull. +2 to Luck for Rarity",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-cracked-fate",
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
			wishOfCrackedFateFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
