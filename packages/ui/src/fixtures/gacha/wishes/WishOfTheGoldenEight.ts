import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfTheGoldenEightFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-the-golden-eight",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfTheGoldenEight.jpg",
	name: "Wish of the Golden Eight",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value: "Triple eights align in your favor. +0.888 Luck to Modifiers",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-the-golden-eight",
			operations: [
				{ field: Field.FloatLuck, op: NumberOperation.Add, value: 0.888 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfTheGoldenEightFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
