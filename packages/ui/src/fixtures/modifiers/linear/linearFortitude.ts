import { LinearModifier } from "@tme/library/src/modifiers/blueprints/LinearModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";

export const linearFortitudeFixture = new LinearModifier({
	identifier: "fixture.fortitude",
	type: ModifierType.Linear,
	application: { weight: 1, whitelistedBy: [], blacklistedBy: [], applies: [] },
	flavor: {
		title: "Fortitude +{amount}",
		description: "Your maximum hit points increase by +{amount}.",
		disclaimer: "This bonus is recalculated when the item is re-attuned.",
	},
	breakpoints: [
		{ min: 0, value: 2 },
		{ min: 0.4, value: 4 },
		{ min: 0.7, value: 6 },
		{ min: 0.9, value: 10 },
	],
	activeEffects: [],
	feats: [],
});
