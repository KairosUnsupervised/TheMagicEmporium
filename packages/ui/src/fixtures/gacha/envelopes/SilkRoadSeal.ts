import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	LockOperation,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";
import img from "./SilkRoadSeal.jpg";

export const silkRoadSealFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-silk-road-seal",
	img,
	name: "Silk Road Seal",
	system: {
		quantity: 4,
		description: {
			value:
				"Traded across a thousand leagues of silk and sand. 12 Items, Locked to 1 Pull, Locked to Moderate Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 12 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.PickAmount, op: LockOperation.Lock },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 3 },
				{ field: Field.VisibilityLevel, op: LockOperation.Lock },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			silkRoadSealFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
