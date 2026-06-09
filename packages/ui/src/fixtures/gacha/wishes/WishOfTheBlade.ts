import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	ArrayOperation,
	Field,
	type GachaItem5e,
	GachaItemType,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import img from "./WishOfTheBlade.jpg";

export const wishOfTheBlade: GachaItem5e<WishFlag> = {
	id: "fixture-wish-the-blade",
	img: img,
	name: "Wish of the Blade",
	isOwner: true,
	system: {
		quantity: 1,
		description: {
			value:
				"Only the dagger finds its mark. Restricts the equipment pool to daggers alone",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-the-blade",
			operations: [
				{
					field: Field.EquipmentWhitelist,
					op: ArrayOperation.Set,
					value: [Equipment.Dagger],
				},
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfTheBlade.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
