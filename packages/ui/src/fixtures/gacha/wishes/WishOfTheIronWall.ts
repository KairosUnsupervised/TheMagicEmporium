import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	ArrayOperation,
	Field,
	type GachaItem5e,
	GachaItemType,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfTheIronWallFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-the-iron-wall",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfTheIronWall.jpg",
	name: "Wish of the Iron Wall",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value: "A wish forged in iron and resolve. Restricts to armor only",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-the-iron-wall",
			operations: [
				{
					field: Field.EquipmentWhitelist,
					op: ArrayOperation.Set,
					value: [
						"PADDED_ARMOR",
						"LEATHER_ARMOR",
						"STUDDED_LEATHER_ARMOR",
						"HIDE_ARMOR",
						"CHAIN_SHIRT",
						"SCALE_MAIL",
						"BREASTPLATE",
						"HALF_PLATE",
						"RING_MAIL",
						"CHAIN_MAIL",
						"SPLINT_ARMOR",
						"PLATE_ARMOR",
						"SHIELD",
					],
				},
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfTheIronWallFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
