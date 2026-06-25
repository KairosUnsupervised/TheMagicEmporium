import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfDewdropFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-dewdrop",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfDewdrop.jpg",
	name: "Wish of Dewdrop",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"A single dewdrop catches the light. +0.2 Luck to Rarity, +0.2 Luck to Modifier",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-dewdrop",
			operations: [
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 0.2 },
				{ field: Field.FloatLuck, op: NumberOperation.Add, value: 0.2 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfDewdropFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
