import {
	GachaItemType,
	type GachaItem5e, EnvelopeFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./GoldenBlessingSeal.jpg";

export const goldenBlessingSealFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-golden-blessing-seal",
	img,
	name: "Golden Blessing Seal",
	system: { quantity: 4 },
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: []
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			goldenBlessingSealFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
