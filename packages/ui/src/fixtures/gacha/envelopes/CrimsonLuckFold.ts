import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	LockOperation,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";
import img from "./CrimsonLuckFold.jpg";

export const crimsonLuckFoldFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-crimson-luck-fold",
	img,
	name: "Crimson Luck Fold",
	system: {
		quantity: 4,
		description: {
			value:
				"A crimson paper fold soaked in fortune's favour. +8 Reveals, +2 Pulls, Locks to low Visibility",
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
