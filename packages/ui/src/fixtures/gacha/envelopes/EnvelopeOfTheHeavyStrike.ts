import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	ArrayOperation,
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfTheHeavyStrikeFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-the-heavy-strike",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfTheHeavyStrike.jpg",
	name: "Envelope of the Heavy Strike",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"A battered envelope that hits hard and leaves a mark. 6 Reveals, 1 Pull, Medium Visibility, restricts to bludgeoning weapons only",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 6 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 2 },
				{
					field: Field.EquipmentWhitelist,
					op: ArrayOperation.Set,
					value: [
						"CLUB",
						"GREATCLUB",
						"LIGHT_HAMMER",
						"MACE",
						"QUARTERSTAFF",
						"SLING",
						"FLAIL",
						"MAUL",
						"WARHAMMER",
					],
				},
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfTheHeavyStrikeFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
