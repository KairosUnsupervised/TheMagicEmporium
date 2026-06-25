import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	LockOperation,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfSealedCrimsonBlessingFixture: GachaItem5e<EnvelopeFlag> =
	{
		id: "fixture-envelope-of-sealed-crimson-blessing",
		img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfSealedCrimsonBlessing.jpg",
		name: "Envelope of Sealed Crimson Blessing",
		isOwner: true,
		system: {
			quantity: 99,
			description: {
				value:
					"A crimson envelope sealed by fortune's hand. 6 Reveals, 2 Pulls, +0.5 Luck to Rarity, Forced to be blind",
			},
		},
		flags: {
			[namespace.gacha.id]: {
				type: GachaItemType.Envelope,
				operations: [
					{ field: Field.RevealAmount, op: NumberOperation.Set, value: 6 },
					{ field: Field.PickAmount, op: NumberOperation.Set, value: 2 },
					{ field: Field.RarityLuck, op: NumberOperation.Add, value: 0.5 },
					{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 0 },
					{ field: Field.VisibilityLevel, op: LockOperation.Lock },
				],
			},
		},
		update: async (data) => {
			if (data.system?.quantity !== undefined) {
				envelopeOfSealedCrimsonBlessingFixture.system.quantity =
					data.system.quantity;
			}
		},
		delete: async () => {},
	};
