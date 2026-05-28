import { LinearModifier } from "@tme/library/src/modifiers/blueprints/LinearModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";

export const linearStealthFixture = new LinearModifier({
	identifier: "fixture.stealth",
	type: ModifierType.Linear,
	application: { weight: 1, whitelistedBy: [], blacklistedBy: [], applies: [] },
	flavor: {
		title: "Redacted +{amount}",
		description: "Your Stealth skill increases by +{amount}.",
		disclaimer: null,
		background: null,
	},
	breakpoints: [{ min: 0, value: 2, background: null }],
	activeEffects: [],
	feats: [],
});
