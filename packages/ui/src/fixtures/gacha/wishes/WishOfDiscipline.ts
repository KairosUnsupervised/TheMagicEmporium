import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfDisciplineFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-discipline",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfDiscipline.jpg",
	name: "Wish of Discipline",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value: "A wish forged through patience and focus. +3 Reveals",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-discipline",
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Add, value: 3 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfDisciplineFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
