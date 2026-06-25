import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfTheDragonsHoardFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-the-dragons-hoard",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfTheDragonsHoard.jpg",
	name: "Envelope of the Dragon's Hoard",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"Spilled from a hoard too vast to count. 6 Reveals, 5 Pulls, Medium Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 6 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 5 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 2 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfTheDragonsHoardFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
