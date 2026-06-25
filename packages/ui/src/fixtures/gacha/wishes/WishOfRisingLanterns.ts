import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfRisingLanternsFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-rising-lanterns",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfRisingLanterns.jpg",
	name: "Wish of Rising Lanterns",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value: "Lanterns rise one by one into the night. +1 Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-rising-lanterns",
			operations: [
				{ field: Field.VisibilityLevel, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfRisingLanternsFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
