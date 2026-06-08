import {Field, type GachaItem5e, GachaItemType, LockOperation, WishFlag,} from "@tme/shared/src/types/GachaItem5e";
import {namespace} from "@tme/shared/src/namespaceConfig";
import img from "./CelestialWish.jpg";

export const celestialWishFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-celestial",
	img,
	name: "Wish of Celestials",
	system: {
		quantity: 4,
		description: {
			value:
				"Spoken into the void between stars. Unlocks all possibilities again",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "celestial-wish",
			operations: [
				{field: Field.PickAmount, op: LockOperation.Unlock},
				{field: Field.RevealAmount, op: LockOperation.Unlock},
				{field: Field.FloatLuck, op: LockOperation.Unlock},
				{field: Field.RarityLuck, op: LockOperation.Unlock},
				{field: Field.VisibilityLevel, op: LockOperation.Unlock},
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			celestialWishFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {
	},
};
