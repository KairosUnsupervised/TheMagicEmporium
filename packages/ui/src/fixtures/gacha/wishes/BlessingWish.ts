import {
	GachaItemType,
	type GachaItem5e, WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./BlessingWish.jpg";

export const blessingWishFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-blessing",
	img,
	name: "Blessing Wish",
	system: { quantity: 4 },
	flags: {
		[namespace.core.id]: {
			type: GachaItemType.Wish,
			id: "blessing-wish",
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			blessingWishFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
