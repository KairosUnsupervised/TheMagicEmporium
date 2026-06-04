import Ajv from "ajv";
import { type ActivitySchema, activityArraySchema } from "./activity.schema";

const ajv = new Ajv({ removeAdditional: false, strict: false });

export interface FeatSystem {
	description?: {
		value?: string;
		chat?: string;
	};
	source?: {
		book?: string;
		page?: string;
		custom?: string;
		license?: string;
	};
	activation?: {
		type?:
			| ""
			| "action"
			| "bonus"
			| "reaction"
			| "special"
			| "legendary"
			| "mythic"
			| "lair"
			| "crew";
		cost?: number | null;
		condition?: string;
	};
	duration?: {
		value?: string | number | null;
		units?:
			| "inst"
			| "turn"
			| "round"
			| "minute"
			| "hour"
			| "day"
			| "month"
			| "year"
			| "perm"
			| "spec"
			| "";
	};
	target?: {
		value?: number | null;
		width?: number | null;
		units?: string;
		type?:
			| ""
			| "self"
			| "ally"
			| "enemy"
			| "creature"
			| "object"
			| "space"
			| "radius"
			| "sphere"
			| "cylinder"
			| "cone"
			| "square"
			| "cube"
			| "line"
			| "wall"
			| "any";
		prompt?: boolean;
	};
	range?: {
		value?: number | null;
		long?: number | null;
		units?: "ft" | "mi" | "m" | "km" | "self" | "touch" | "spec" | "any" | "";
	};
	uses?: {
		value?: number;
		max?: string | number;
		per?: "sr" | "lr" | "day" | "charges" | "dawn" | "dusk" | null;
		recovery?: {
			period: "sr" | "lr" | "dawn" | "dusk" | "charges" | "day";
			type: "recoverAll" | "loseAll" | "formula";
			formula?: string;
		}[];
		prompt?: boolean;
	};
	type?: {
		value?:
			| "feat"
			| "class"
			| "subclass"
			| "background"
			| "race"
			| "monster"
			| "supernatural"
			| "maneuver"
			| "";
		subtype?: string;
	};
	requirements?: string;
	recharge?: {
		value?: number | null;
		charged?: boolean;
	};
	activities?: ActivitySchema[];
}

export interface FeatSchema {
	/** Generates document.name if not already set via system */
	title?: string;
	/** Generates system.description.value if not already set */
	description?: string;
	/** Appended to system.description.value as an italicised note */
	disclaimer?: string | null;
	system?: FeatSystem;
}

const systemSchema = {
	type: "object",
	properties: {
		description: {
			type: "object",
			properties: {
				value: { type: "string" },
				chat: { type: "string" },
			},
		},
		source: {
			type: "object",
			properties: {
				book: { type: "string" },
				page: { type: "string" },
				custom: { type: "string" },
				license: { type: "string" },
			},
		},
		activation: {
			type: "object",
			properties: {
				type: { type: "string" },
				cost: { type: ["number", "null"] },
				condition: { type: "string" },
			},
		},
		duration: {
			type: "object",
			properties: {
				value: { type: ["string", "number", "null"] },
				units: { type: "string" },
			},
		},
		target: {
			type: "object",
			properties: {
				value: { type: ["number", "null"] },
				width: { type: ["number", "null"] },
				units: { type: "string" },
				type: { type: "string" },
				prompt: { type: "boolean" },
			},
		},
		range: {
			type: "object",
			properties: {
				value: { type: ["number", "null"] },
				long: { type: ["number", "null"] },
				units: { type: "string" },
			},
		},
		uses: {
			type: "object",
			properties: {
				value: { type: "number" },
				max: { type: ["string", "number"] },
				per: { type: ["string", "null"] },
				recovery: {
					type: "array",
					items: {
						type: "object",
						properties: {
							period: {
								type: "string",
								enum: ["sr", "lr", "dawn", "dusk", "charges", "day"],
							},
							type: {
								type: "string",
								enum: ["recoverAll", "loseAll", "formula"],
							},
							formula: { type: "string" },
						},
					},
				},
				prompt: { type: "boolean" },
			},
		},
		type: {
			type: "object",
			properties: {
				value: { type: "string" },
				subtype: { type: "string" },
			},
		},
		requirements: { type: "string" },
		recharge: {
			type: "object",
			properties: {
				value: { type: ["number", "null"] },
				charged: { type: "boolean" },
			},
		},
		activities: activityArraySchema,
	},
};

export const validateFeatSchema = ajv.compile<FeatSchema>({
	title: "Feat",
	description:
		"A named ability that appears as its own entry on the character sheet. Used by UNIQUE, LINEAR, and TIERED modifiers. The system block follows the Foundry dnd5e item schema — anything Foundry accepts there is valid. title/description/disclaimer default to the parent modifier's values and are ignored entirely if system.description.value is set directly",
	examples: [
		{
			title: "Arcane Eruption",
			description: "Deal 4d10 force damage in a 30 ft area, DEX save for half",
			system: {
				activation: { type: "action", cost: 1, condition: "" },
				uses: { max: 4, recovery: [{ period: "lr", type: "recoverAll" }] },
				activities: [
					{
						type: "save",
						name: "Use Arcane Eruption",
						activation: { type: "action", override: false, condition: "" },
						consumption: { targets: [{ type: "itemUses", value: "1" }] },
						damage: {
							onSave: "half",
							types: ["force"],
							custom: { enabled: false },
							scaling: { number: 1 },
							number: 4,
							denomination: 10,
							bonus: "",
						},
						save: {
							ability: ["dex"],
							dc: { calculation: "spellcasting", formula: "" },
						},
					},
				],
			},
		},
	],
	type: "object",
	properties: {
		title: {
			description:
				"Name shown on the feat entry. Defaults to the modifier's title. When a tier grants multiple feats, use 'Tier Title - Ability Name' format so the parent modifier is always identifiable",
			type: "string",
		},
		description: {
			description:
				"Shown on the feat entry wrapped in <p><strong>…</strong></p>. Defaults to the modifier's description. Each feat in a multi-feat tier must have its own description scoped to that feat's ability only",
			type: "string",
		},
		disclaimer: {
			description:
				"Appended below the description in italics. Defaults to the modifier's disclaimer",
			type: ["string", "null"],
		},
		system: {
			...systemSchema,
			description:
				"Raw Foundry dnd5e system block. No useless activities — only add an activity when it provides mechanical value (rolls dice, tracks a save, heals, etc.). Do not add a utility activity just to represent an activation type; system.activation already conveys that. img defaults to PassiveIcon.png, or ActiveIcon.png when system.activation is set",
		},
	},
});
