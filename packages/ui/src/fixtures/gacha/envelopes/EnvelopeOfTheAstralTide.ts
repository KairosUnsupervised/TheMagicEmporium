import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfTheAstralTideFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-the-astral-tide",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfTheAstralTide.jpg",
	name: "Envelope of the Astral Tide",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"The whole sky turns in your favor. 8 Reveals, 3 Pulls, +1 Luck to Rarity, Medium Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 8 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 3 },
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 1 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 2 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfTheAstralTideFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
