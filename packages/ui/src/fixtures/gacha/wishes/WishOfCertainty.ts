import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfCertaintyFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-certainty",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfCertainty.jpg",
	name: "Wish of Certainty",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"A wish that trades quantity for quality. -2 Pulls, +1 Luck to Rarity",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-certainty",
			operations: [
				{ field: Field.PickAmount, op: NumberOperation.Subtract, value: 2 },
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfCertaintyFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
