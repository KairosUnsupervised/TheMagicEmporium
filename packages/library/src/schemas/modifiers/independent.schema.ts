import Ajv from "ajv";
import type { BaseSchema } from "../../modifiers/Modifier";
import { ModifierType } from "../../modifiers/modifier.schema";
import { applicationSchema } from "./application.schema";
import { type Flavor, flavorSchema } from "./flavor.schema";
import {BaseBreakpoint} from "../../modifiers/manager/FloatManager";

const ajv = new Ajv({ removeAdditional: true, useDefaults: true });

export interface IndependentBreakpoint extends BaseBreakpoint {
	flavor: Flavor;
	changes: unknown[];
	activities: unknown[];
}

export interface IndependentSchema extends BaseSchema {
	type: ModifierType.Independent;
	breakpoints: IndependentBreakpoint[];
}

export const validateIndependent = ajv.compile<IndependentSchema>({
	title: "Independent Modifier",
	description:
		"Selects a single breakpoint based on a float value and applies that breakpoint's flavor, changes, and activities directly to the item. Each breakpoint is fully self-contained.",
	examples: [
		{
			identifier: "TME.ZEN",
			type: "INDEPENDENT",
			application: {
				weight: 1024,
				restriction: "PRIMARY",
				whitelistedBy: ["WEAPON"],
			},
			breakpoints: [
				{
					min: 0,
					flavor: {
						title: "Zen",
						description:
							"Once per long rest, as an action, meditate and empower this weapon with +1 to attack and damage rolls for 3 rounds.",
						disclaimer: "Not automatically applied as of now",
					},
				},
				{
					min: 0.5,
					flavor: {
						title: "Inner Harmony",
						description:
							"Once per long rest, as an action, meditate and empower this weapon with +2 to attack and damage rolls for 4 rounds.",
						disclaimer: "Not automatically applied as of now",
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
			description: "Must be INDEPENDENT",
			type: "string",
			const: ModifierType.Independent,
		},
		application: applicationSchema,
		breakpoints: {
			description:
				"Ordered list of breakpoints. The highest breakpoint whose min ≤ the float value is selected",
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
					changes: {
						description:
							"Item property changes applied while this breakpoint is active. Each entry follows change.schema.ts",
						type: "array",
						default: [],
					},
					activities: {
						description:
							"Foundry activities added to the item while this breakpoint is active. Each entry follows activity.schema.ts",
						type: "array",
						default: [],
					},
				},
			},
		},
	},
});
