import { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";

export const tieredStealthFixture = new TieredModifier({
	identifier: "fixture.tiered-stealth",
	type: ModifierType.Tiered,
	application: { weight: 1, whitelistedBy: [], blacklistedBy: [], applies: [] },
	breakpoints: [
		{ min: 0, value: 1 },
		{ min: 0.5, value: 2 },
	],
	tiers: [
		{
			min: 1,
			flavor: {
				title: "Redacted I",
				description: "Your Stealth skill increases by +2.",
				disclaimer: null,
				background: null,
			},
			activeEffects: [],
			feats: [],
		},
		{
			min: 2,
			flavor: {
				title: "Redacted II",
				description:
					"Your Stealth skill increases by +4 and you leave no tracks.",
				disclaimer: null,
				background: null,
			},
			activeEffects: [],
			feats: [],
		},
	],
});
