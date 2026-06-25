import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfTheLoneStarFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-the-lone-star",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfTheLoneStar.jpg",
	name: "Envelope of the Lone Star",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"One star, seen clearly, claimed for your own. 4 Reveals, 1 Pull, +1 Luck to Rarity, Perfect Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 4 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 1 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 4 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfTheLoneStarFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
