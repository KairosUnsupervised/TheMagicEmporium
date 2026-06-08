import {
	GachaItemType,
	type GachaItem5e,
	EnvelopeFlag,
	Field,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import img from "./FestivalSleeve.jpg";

export const festivalSleeveFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-festival-sleeve",
	img,
	name: "Festival Sleeve",
	system: {
		quantity: 4,
		description: {
			value:
				"Stitched with lantern-thread and offered at the height of the harvest moon. 3 Items, 3 Pulls, Moderate Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 3 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 3 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 3 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			festivalSleeveFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
