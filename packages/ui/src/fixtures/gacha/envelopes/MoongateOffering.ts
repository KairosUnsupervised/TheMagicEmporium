import {
	GachaItemType,
	type GachaItem5e, EnvelopeFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./MoongateOffering.jpg";

export const moongateOfferingFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-moongate-offering",
	img,
	name: "Moongate Offering",
	system: { quantity: 4 },
	flags: {
		[namespace.core.id]: {
			type: GachaItemType.Envelope,
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			moongateOfferingFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
