import {
	GachaItemType,
	type GachaItem5e,
	EnvelopeFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./MoongateOffering.jpg";

export const moongateOfferingFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-moongate-offering",
	img,
	name: "Moongate Offering",
	system: {
		quantity: 4,
		description: {
			value:
				"Left at the threshold of the moongate when the stars align. The veil between worlds grows thin for those who offer it.",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			moongateOfferingFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
