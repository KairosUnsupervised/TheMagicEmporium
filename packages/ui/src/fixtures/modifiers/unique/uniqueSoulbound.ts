import { UniqueModifier } from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import {
	ModifierType,
	Restriction,
} from "@tme/library/src/modifiers/modifier.schema";

export const uniqueSoulboundFixture = new UniqueModifier({
	identifier: "fixture.soulbound",
	type: ModifierType.Unique,
	application: {
		weight: 1,
		restriction: Restriction.Primary,
		whitelistedBy: [],
		blacklistedBy: [],
		applies: [],
	},
	breakpoints: [
		{
			min: 0,
			flavor: {
				title: "Soulbound",
				description:
					"This item cannot be unequipped by any means other than death.",
				disclaimer: "Attunement cannot be broken while the wielder lives.",
				background: null,
			},
			activeEffects: [],
			feats: [],
		},
	],
});
