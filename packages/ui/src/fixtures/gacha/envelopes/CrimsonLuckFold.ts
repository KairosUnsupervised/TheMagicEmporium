import {
	GachaItemType,
	type GachaItem5e, EnvelopeFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./CrimsonLuckFold.jpg";

export const crimsonLuckFoldFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-crimson-luck-fold",
	img,
	name: "Crimson Luck Fold",
	system: { quantity: 4 },
	flags: {
		[namespace.core.id]: {
			type: GachaItemType.Envelope,
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			crimsonLuckFoldFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
