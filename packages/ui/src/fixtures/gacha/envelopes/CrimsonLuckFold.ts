import {
	GachaItemType,
	type GachaItem5e,
	EnvelopeFlag,
	Field,
	NumberOperation,
	LockOperation,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./CrimsonLuckFold.jpg";

export const crimsonLuckFoldFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-crimson-luck-fold",
	img,
	name: "Crimson Luck Fold",
	system: {
		quantity: 4,
		description: {
			value:
				"A crimson paper fold soaked in fortune's favour. +8 Items, +2 Pulls, Low Visibility, Locks Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 8 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 2 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 1 },
				{ field: Field.VisibilityLevel, op: LockOperation.Lock },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			crimsonLuckFoldFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
