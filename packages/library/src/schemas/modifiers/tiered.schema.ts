import Ajv from "ajv";
import type { BaseSchema } from "../../modifiers/Modifier";
import { ModifierType } from "../../modifiers/modifier.schema";
import { applicationSchema } from "./application.schema";
import { type Flavor, flavorSchema } from "./flavor.schema";
import {BaseBreakpoint} from "../../modifiers/manager/FloatManager";

const ajv = new Ajv({ removeAdditional: true, useDefaults: true });

export interface TieredBreakpoint extends BaseBreakpoint {
	value: number;
}

export interface TieredTier {
	min: number;
	flavor: Flavor;
	activeEffects: unknown[];
	feats: unknown[];
}

export interface TieredSchema extends BaseSchema {
	type: ModifierType.Tiered;
	breakpoints: TieredBreakpoint[];
	tiers: TieredTier[];
}

export const validateTiered = ajv.compile<TieredSchema>({
	title: "Tiered Modifier",
	description:
		"Resolves a float to a numeric value via breakpoints, sums all active instance values, then maps the total to a tier. Each tier carries its own flavor and effects. Breakpoint count and tier count are independent.",
	examples: [
		{
			identifier: "TME.DETERMINED",
			type: "TIERED",
			application: {
				weight: 1024,
				restriction: "TERTIARY",
				whitelistedBy: ["WEAPON"],
			},
			breakpoints: [
				{ min: 0, value: 1 },
				{ min: 0.5, value: 2 },
				{ min: 0.8, value: 4 },
			],
			tiers: [
				{
					min: 1,
					flavor: {
						title: "Determined",
						description:
							"You can reroll 1's on your weapon induced damage dice, 1 reroll. The new rolls must be used",
						background: "%BACKGROUNDS%/tertiary/determined.jpg",
					},
				},
				{
					min: 2,
					flavor: {
						title: "Fiercely Determined",
						description:
							"You can reroll 1-2's on your weapon induced damage dice, up to 2 rerolls. The new rolls must be used",
						background: "%BACKGROUNDS%/tertiary/determined.jpg",
					},
				},
				{
					min: 4,
					flavor: {
						title: "Relentlessly Determined",
						description:
							"You can reroll 1-3's on your weapon induced damage dice, up to 3 rerolls. The new rolls must be used",
						background: "%BACKGROUNDS%/tertiary/determined.jpg",
					},
				},
			],
		},
	],
	type: "object",
	required: ["identifier", "type", "application", "breakpoints", "tiers"],
	properties: {
		identifier: {
			description:
				"Unique key under which this modifier is stored. Use SOURCE.SCREAMING_SNAKE_CASE convention",
			type: "string",
		},
		type: {
			description: "Must be TIERED",
			type: "string",
			enum: Object.values(ModifierType),
		},
		application: applicationSchema,
		breakpoints: {
			description:
				"Maps float ranges to numeric values. Values from all active instances are summed before tier resolution. Use the powers-of-two convention: [0.0→1, 0.5→2, 0.8→4]. A single item contributes at most 4 points — tier IV (min 8) is intentionally unreachable solo and requires at least two items",
			type: "array",
			minItems: 1,
			items: {
				type: "object",
				required: ["min", "value"],
				properties: {
					min: {
						description:
							"Minimum float value (inclusive) required to activate this breakpoint",
						type: "number",
						minimum: 0,
					},
					value: {
						description:
							"Numeric amount contributed by this breakpoint to the summed total used for tier selection",
						type: "number",
					},
				},
			},
		},
		tiers: {
			description:
				"Qualitative stages unlocked by accumulated breakpoint values. The highest tier whose min ≤ the sum is applied",
			type: "array",
			minItems: 1,
			items: {
				type: "object",
				required: ["min", "flavor"],
				properties: {
					min: {
						description:
							"Minimum summed breakpoint value required to activate this tier",
						type: "number",
						minimum: 0,
					},
					flavor: flavorSchema,
					activeEffects: {
						description:
							"Foundry active effects applied when this tier is active. Each entry follows activeEffect.schema.ts",
						type: "array",
						default: [],
					},
					feats: {
						description:
							"Foundry feats added to the item when this tier is active. Each entry follows feat.schema.ts",
						type: "array",
						default: [],
					},
				},
			},
		},
	},
});
