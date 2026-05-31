import Ajv from "ajv";

const ajv = new Ajv({ removeAdditional: true });

export enum ModeSchema {
	Custom = "CUSTOM",
	Multiply = "MULTIPLY",
	Add = "ADD",
	Downgrade = "DOWNGRADE",
	Upgrade = "UPGRADE",
	Override = "OVERRIDE",
}

export interface ActiveEffectSchema {
	title?: string;
	description?: string;
	disclaimer?: string | null;
	changes: {
		key: string;
		mode: ModeSchema;
		value: string;
	}[];
}

export const validateActiveEffectSchema = ajv.compile<ActiveEffectSchema>({
	title: "Active Effect",
	description:
		"Modifies a character stat silently in the background. Used by UNIQUE, LINEAR, and TIERED modifiers. title/description/disclaimer all default to the parent modifier's values if omitted",
	examples: [
		{
			title: "Titan's Blessing",
			description: "Your strength and constitution both increase by 2",
			changes: [
				{ key: "system.abilities.str.value", mode: "ADD", value: "2" },
				{ key: "system.abilities.con.value", mode: "ADD", value: "2" },
			],
		},
	],
	type: "object",
	required: ["changes"],
	properties: {
		title: {
			description: "Name shown on the effect entry. Defaults to the modifier's title",
			type: "string",
		},
		description: {
			description: "Description shown on the effect entry. Defaults to the modifier's description",
			type: "string",
		},
		disclaimer: {
			description: "Small print shown below the description. Defaults to the modifier's disclaimer",
			type: ["string", "null"],
		},
		changes: {
			description:
				"One or more stat changes this effect applies. A single Active Effect can target multiple stats; multiple Active Effects on the same modifier each appear as a separate entry on the character sheet",
			type: "array",
			items: {
				type: "object",
				required: ["key", "mode", "value"],
				properties: {
					key: {
						description:
							"Foundry dot-notation path to the character stat. Common keys: system.abilities.str.value, system.abilities.dex.value, system.abilities.con.value, system.abilities.int.value, system.abilities.wis.value, system.abilities.cha.value, system.attributes.ac.bonus, system.attributes.movement.walk, system.attributes.init.bonus",
						type: "string",
					},
					mode: {
						description:
							"How the value is applied — ADD: adds to current (use negative to subtract); MULTIPLY: multiplies current; UPGRADE: sets only if current is lower; DOWNGRADE: sets only if current is higher; OVERRIDE: replaces unconditionally; CUSTOM: game-system-defined logic",
						type: "string",
						enum: Object.values(ModeSchema),
					},
					value: {
						description: "The value to apply, always written as a string even when numeric",
						type: "string",
					},
				},
			},
		},
	},
});
