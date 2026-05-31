import Ajv from "ajv";
import type { BaseSchema } from "../../modifiers/Modifier";
import { ModifierType } from "../../modifiers/modifier.schema";
import { applicationSchema } from "./application.schema";
import { type Flavor, flavorSchema } from "./flavor.schema";

const ajv = new Ajv({ removeAdditional: true, useDefaults: true });

export interface LinearBreakpoint {
	min: number;
	value: number;
	background: string | null;
}

export interface LinearSchema extends BaseSchema {
	type: ModifierType.Linear;
	flavor: Flavor;
	breakpoints: LinearBreakpoint[];
	activeEffects: unknown[];
	feats: unknown[];
}

export const validateLinear = ajv.compile<LinearSchema>({
	title: "Linear Modifier",
	description:
		"Resolves a float value to a numeric amount via breakpoints, then applies that amount to a shared flavor and effects. Use {amount} in flavor text to interpolate the resolved value. All active instances are summed.",
	examples: [
		{
			identifier: "TME.CRIMSON_HARVEST",
			type: "LINEAR",
			application: {
				weight: 1024,
				restriction: "SECONDARY",
				whitelistedBy: ["WEAPON"],
			},
			flavor: {
				title: "Crimson Harvest",
				description: "Gain {amount}d4 temporary HP on direct creature kill",
				disclaimer:
					"Temporary HP do not stack — only the highest value applies.",
			},
			breakpoints: [
				{ min: 0, value: 1 },
				{ min: 0.5, value: 2 },
				{ min: 0.8, value: 3 },
				{ min: 0.95, value: 4 },
			],
		},
	],
	type: "object",
	required: ["identifier", "type", "application", "flavor", "breakpoints"],
	properties: {
		identifier: {
			description:
				"Unique key under which this modifier is stored. Use SOURCE.SCREAMING_SNAKE_CASE convention",
			type: "string",
		},
		type: {
			description: "Must be LINEAR",
			type: "string",
			enum: Object.values(ModifierType),
		},
		application: applicationSchema,
		flavor: {
			...flavorSchema,
			description:
				"Shared display text for all breakpoints. Use {amount} to interpolate the resolved numeric value",
		},
		breakpoints: {
			description:
				"Maps float ranges to numeric values. The highest breakpoint whose min ≤ the float is selected. All active instances are summed. Standard setups: very strong modifier → [0.0→1, 0.7→2]; medium modifier → [0.0→1, 0.5→2, 0.8→3, 0.95→4]",
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
							"Numeric amount contributed by this breakpoint. Used to replace {amount} in flavor text",
						type: "number",
					},
					background: {
						description:
							"Optional per-breakpoint background override. Falls back to the top-level flavor background",
						type: ["string", "null"],
						default: null,
					},
				},
			},
		},
		activeEffects: {
			description:
				"Foundry active effects applied when this modifier is active. Supports {amount} interpolation. Each entry follows activeEffect.schema.ts",
			type: "array",
			default: [],
		},
		feats: {
			description:
				"Foundry feats added to the item when this modifier is active. Supports {amount} interpolation. Each entry follows feat.schema.ts",
			type: "array",
			default: [],
		},
	},
});
