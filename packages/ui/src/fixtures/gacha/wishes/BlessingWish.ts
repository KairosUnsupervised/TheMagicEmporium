import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./BlessingWish.jpg";

export const blessingWishFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-blessing",
	img,
	name: "Blessing Wish",
	system: {
		quantity: 4,
		description: {
			value:
				"A wish woven from gratitude and grace. Provides perfect visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "blessing-wish",
			operations: [
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 4 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			blessingWishFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
