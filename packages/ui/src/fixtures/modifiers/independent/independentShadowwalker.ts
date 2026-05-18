import { IndependentModifier } from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";

export const independentShadowwalkerFixture = new IndependentModifier({
	identifier: "fixture.shadowwalker",
	type: ModifierType.Independent,
	application: { weight: 1, whitelistedBy: [], blacklistedBy: [], applies: [] },
	breakpoints: [
		{
			min: 0,
			flavor: {
				title: "Shadowwalker Minor",
				description:
					"You have advantage on Stealth checks made in dim light or darkness.",
				disclaimer: null,
			},
			changes: [],
			activities: [],
		},
		{
			min: 0.5,
			flavor: {
				title: "Shadowwalker Major",
				description:
					"You have advantage on Stealth checks and cannot be tracked by non-magical means while in dim light or darkness.",
				disclaimer: null,
			},
			changes: [],
			activities: [],
		},
		{
			min: 0.8,
			flavor: {
				title: "Shadowwalker Evolved",
				description:
					"You have advantage on Stealth checks, cannot be tracked by non-magical means, and are invisible to darkvision while in dim light or darkness.",
				disclaimer:
					"Attacking or casting a spell ends the invisibility until the start of your next turn.",
			},
			changes: [],
			activities: [],
		},
	],
});
