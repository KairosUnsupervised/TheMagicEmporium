import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfMoongateTributeFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-moongate-tribute",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfMoongateTribute.jpg",
	name: "Envelope of Moongate Tribute",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"Left at the threshold of the moongate when the stars align. 5 Items, 3 Pulls, -0.5 to Luck to Rarity",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 5 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 3 },
				{ field: Field.RarityLuck, op: NumberOperation.Subtract, value: 0.5 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfMoongateTributeFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
