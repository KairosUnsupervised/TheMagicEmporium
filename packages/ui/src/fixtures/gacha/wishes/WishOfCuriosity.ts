import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfCuriosityFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-curiosity",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfCuriosity.jpg",
	name: "Wish of Curiosity",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value: "A small glimpse beyond the veil. +1 Reveal",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-curiosity",
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfCuriosityFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
