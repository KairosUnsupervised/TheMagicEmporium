import { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";

export const tieredFuryFixture = new TieredModifier({
	identifier: "fixture.tiered-fury",
	type: ModifierType.Tiered,
	application: { weight: 1, whitelistedBy: [], blacklistedBy: [], applies: [] },
	breakpoints: [
		{ min: 0, value: 1 },
		{ min: 0.3, value: 2 },
		{ min: 0.6, value: 3 },
		{ min: 0.8, value: 4 },
	],
	tiers: [
		{
			min: 1,
			flavor: {
				title: "Fury I",
				description: "Your melee attacks deal an extra 1 fire damage.",
				disclaimer: null,
				background: null,
			},
			activeEffects: [],
			feats: [],
		},
		{
			min: 2,
			flavor: {
				title: "Fury II",
				description: "Your melee attacks deal an extra 1d4 fire damage.",
				disclaimer: null,
				background: null,
			},
			activeEffects: [],
			feats: [],
		},
		{
			min: 3,
			flavor: {
				title: "Fury III",
				description:
					"Your melee attacks deal an extra 1d6 fire damage and ignite the target.",
				disclaimer:
					"Ignited targets take 1d4 fire damage at the start of their turn.",
				background: null,
			},
			activeEffects: [],
			feats: [],
		},
		{
			min: 4,
			flavor: {
				title: "Fury IV",
				description:
					"Your melee attacks deal an extra 1d10 fire damage, ignite the target, and push it 5 feet.",
				disclaimer:
					"Ignited targets take 1d4 fire damage at the start of their turn.",
				background: null,
			},
			activeEffects: [],
			feats: [],
		},
	],
});
