import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	LockOperation,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";
import img from "./MoongateOffering.jpg";

export const moongateOfferingFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-moongate-offering",
	img,
	name: "Moongate Offering",
	system: {
		quantity: 4,
		description: {
			value:
				"Left at the threshold of the moongate when the stars align. 5 Items, 3 Pulls, Forced to be Blind",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 5 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 3 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 0 },
				{ field: Field.VisibilityLevel, op: LockOperation.Lock },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			moongateOfferingFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
