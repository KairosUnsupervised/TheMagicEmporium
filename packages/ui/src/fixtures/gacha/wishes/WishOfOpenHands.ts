import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfOpenHandsFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-open-hands",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfOpenHands.jpg",
	name: "Wish of Open Hands",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value: "Open arms, open fate. +1 Pull",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-open-hands",
			operations: [
				{ field: Field.PickAmount, op: NumberOperation.Add, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfOpenHandsFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
