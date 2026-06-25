import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	ArrayOperation,
	Field,
	type GachaItem5e,
	GachaItemType,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfTheIronGardenFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-the-iron-garden",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfTheIronGarden.jpg",
	name: "Wish of the Iron Garden",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"A wish honed to a razor's edge. Restricts to slashing weapons only",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-the-iron-garden",
			operations: [
				{
					field: Field.EquipmentWhitelist,
					op: ArrayOperation.Set,
					value: [
						"HANDAXE",
						"SICKLE",
						"BATTLEAXE",
						"GLAIVE",
						"GREATAXE",
						"GREATSWORD",
						"HALBERD",
						"LONGSWORD",
						"SCIMITAR",
						"WHIP",
					],
				},
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfTheIronGardenFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
