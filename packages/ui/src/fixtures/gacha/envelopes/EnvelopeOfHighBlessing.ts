import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfHighBlessingFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-high-blessing",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfHighBlessing.jpg",
	name: "Envelope of High Blessing",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"A single thread of gold binds this envelope, holding one promise and one alone. 1 Reveal, 1 Pull, +2 Luck to Rarity",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 2 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfHighBlessingFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
