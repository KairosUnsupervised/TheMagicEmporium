import { UniqueModifier } from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import {
	ModifierType,
	Restriction,
} from "@tme/library/src/modifiers/modifier.schema";
import image from "./RedSkull.jpg";

export const uniqueBloodthirstyFixture = new UniqueModifier({
	identifier: "fixture.bloodthirsty",
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
				title: "Bloodthirsty",
				description:
					"On direct creature kill, you gain advantage on your next attack.",
				disclaimer: null,
				background: image,
			},
			activeEffects: [],
			feats: [],
		},
	],
});
