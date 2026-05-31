import Ajv from "ajv";
import type { BaseSchema } from "../../modifiers/Modifier";
import { ModifierType } from "../../modifiers/modifier.schema";
import { applicationSchema } from "./application.schema";
import { type Flavor, flavorSchema } from "./flavor.schema";

const ajv = new Ajv({ removeAdditional: true, useDefaults: true });

export interface UniqueBreakpoint {
	min: number;
	flavor: Flavor;
	activeEffects: unknown[];
	feats: unknown[];
}

export interface UniqueSchema extends BaseSchema {
	type: ModifierType.Unique;
	breakpoints: UniqueBreakpoint[];
}

export const validateUnique = ajv.compile<UniqueSchema>({
	title: "Unique Modifier",
	description:
		"A player-bound modifier where multiple instances do not stack — only the breakpoint with the highest min value is applied. Each breakpoint carries its own flavor and effects.",
	examples: [
		{
			identifier: "TME.BLOODTHIRSTY",
			type: "UNIQUE",
			application: {
				weight: 1024,
				restriction: "PRIMARY",
				whitelistedBy: ["WEAPON"],
			},
			breakpoints: [
				{
					min: 0,
					flavor: {
						title: "Bloodthirsty",
						description:
							"On direct creature kill, you gain advantage on your next attack",
					},
				},
				{
					min: 0.8,
					flavor: {
						title: "Bloodthirsty II",
						description:
							"On direct creature kill, you gain advantage on your next two attacks",
					},
				},
			],
		},
	],
	type: "object",
	required: ["identifier", "type", "application", "breakpoints"],
	properties: {
		identifier: {
			description:
				"Unique key under which this modifier is stored. Use SOURCE.SCREAMING_SNAKE_CASE convention",
			type: "string",
		},
		type: {
			description: "Must be UNIQUE",
			type: "string",
			const: ModifierType.Unique,
		},
		application: applicationSchema,
		breakpoints: {
			description:
				"Ordered list of breakpoints. When multiple instances are active, only the one with the highest min is applied. Multi-breakpoint Unique modifiers are rare — when used, the standard two-breakpoint setup is { min: 0, value: 1 } and { min: 0.75, value: 2 }",
			type: "array",
			minItems: 1,
			items: {
				type: "object",
				required: ["min", "flavor"],
				properties: {
					min: {
						description:
							"Minimum float value (inclusive) required to activate this breakpoint",
						type: "number",
						minimum: 0,
					},
					flavor: flavorSchema,
					activeEffects: {
						description:
							"Foundry active effects applied when this breakpoint is the highest active one. Each entry follows activeEffect.schema.ts",
						type: "array",
						default: [],
					},
					feats: {
						description:
							"Foundry feats added to the item when this breakpoint is the highest active one. Each entry follows feat.schema.ts",
						type: "array",
						default: [],
					},
				},
			},
		},
	},
});
