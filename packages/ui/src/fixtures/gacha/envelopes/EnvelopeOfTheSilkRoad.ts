import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfTheSilkRoadFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-the-silk-road",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfTheSilkRoad.jpg",
	name: "Envelope of the Silk Road",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"Traded across a thousand leagues of silk and sand. 12 Reveals, 1 Pull",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 12 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 1 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfTheSilkRoadFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
