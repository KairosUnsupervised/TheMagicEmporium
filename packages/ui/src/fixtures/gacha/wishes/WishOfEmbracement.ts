import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import img from "./WishOfEmbracement.jpg";

export const wishOfEmbracementFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-embracement",
	img,
	name: "Wish of Embracement",
	system: {
		quantity: 4,
		description: {
			value: "Open arms, open fate. +1 Pull, +1 Level of Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-embracement",
			operations: [
				{ field: Field.PickAmount, op: NumberOperation.Add, value: 1 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfEmbracementFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
