import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	type EnvelopeFlag,
	Field,
	type GachaItem5e,
	GachaItemType,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";

export const envelopeOfUnfoundPotentialFixture: GachaItem5e<EnvelopeFlag> = {
	id: "fixture-envelope-of-unfound-potential",
	img: "modules/the-magic-emporium/gacha/envelopes/envelopeOfUnfoundPotential.jpg",
	name: "Envelope of Unfound Potential",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"Wax-sealed against the light. What lies within could be anything, and that is precisely the point. 6 Pulls, 0 Reveals",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Envelope,
			operations: [
				{ field: Field.RevealAmount, op: NumberOperation.Set, value: 0 },
				{ field: Field.PickAmount, op: NumberOperation.Set, value: 6 },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			envelopeOfUnfoundPotentialFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
