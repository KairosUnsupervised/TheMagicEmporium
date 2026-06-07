import {
	GachaItemType,
	type GachaItem5e, EnvelopeFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./FestivalSleeve.jpg";

export const festivalSleeveFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-festival-sleeve",
	img,
	name: "Festival Sleeve",
	system: { quantity: 4 },
	flags: {
		[namespace.core.id]: {
			type: GachaItemType.Envelope,
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			festivalSleeveFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
