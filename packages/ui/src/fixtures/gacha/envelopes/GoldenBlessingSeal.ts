import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";
import img from "./GoldenBlessingSeal.jpg";

export const goldenBlessingSealFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-golden-blessing-seal",
	img,
	name: "Golden Blessing Seal",
	system: {
		quantity: 4,
		description: {
			value:
				"Pressed in gold leaf and sealed with a prayer. 3 Items, 1 Pull, Moderate Visibility, +0.5 Luck to Rarity",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 3 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 1 },
				{ field: Field.VisibilityLevel, op: NumberOperation.Set, value: 3 },
				{ field: Field.RarityLuck, op: NumberOperation.Add, value: 0.5 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			goldenBlessingSealFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
