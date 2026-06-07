import {
	GachaItemType,
	type GachaItem5e,
	WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./CelestialWish.jpg";

export const celestialWishFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-celestial",
	img,
	name: "Celestial Wish",
	system: { quantity: 4 },
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "celestial-wish",
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			celestialWishFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
