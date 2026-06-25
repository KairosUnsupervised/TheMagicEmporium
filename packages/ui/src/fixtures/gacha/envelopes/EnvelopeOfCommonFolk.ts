import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	ArrayOperation,
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfCommonFolkFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-common-folk",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfCommonFolk.jpg",
	name: "Envelope of Common Folk",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"A humble envelope tied with plain thread. 5 Reveals, 2 Pulls, restricts to accessories and everyday wear",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 5 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 2 },
				{
					field: Field.EquipmentWhitelist,
					op: ArrayOperation.Set,
					value: [
						"RING",
						"AMULET",
						"RELIC",
						"COMMONER_CLOTHES",
						"FINE_CLOTHES",
						"NOBLE_CLOTHES",
						"ROYAL_CLOTHES",
					],
				},
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfCommonFolkFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
