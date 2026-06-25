import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfGoldenBlessingFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-golden-blessing",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfGoldenBlessing.jpg",
	name: "Envelope of Golden Blessing",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"Pressed in gold leaf and sealed with a prayer. 3 Items, 1 Pull, Medium Visibility",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 3 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 2 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfGoldenBlessingFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
