import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfLuminousSkyFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-luminous-sky",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfLuminousSky.jpg",
	name: "Wish of Luminous Sky",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value: "The sky opens and hides nothing. Provides perfect visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-luminous-sky",
			operations: [
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 4 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfLuminousSkyFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
