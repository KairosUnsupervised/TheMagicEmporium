import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfHarvestMoonFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-harvest-moon",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfHarvestMoon.jpg",
	name: "Envelope of Harvest Moon",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"Stitched with lantern-thread and offered at the height of the harvest moon. 3 Items, 2 Pulls, High Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 3 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 2 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 3 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfHarvestMoonFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
