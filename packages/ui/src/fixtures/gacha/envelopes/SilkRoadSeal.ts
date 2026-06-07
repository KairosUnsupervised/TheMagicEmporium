import {
	GachaItemType,
	type GachaItem5e, EnvelopeFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./SilkRoadSeal.jpg";

export const silkRoadSealFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-silk-road-seal",
	img,
	name: "Silk Road Seal",
	system: { quantity: 4 },
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: []
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			silkRoadSealFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
