import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfAbundanceFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-abundance",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfAbundance.jpg",
	name: "Wish of Abundance",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value: "More of everything, freely given. +3 Reveals, +2 Pulls",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-abundance",
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Add, value: 3 },
				{ field: Field.PickAmount, op: NumberOperation.Add, value: 2 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfAbundanceFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
