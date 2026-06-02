import Ajv from "ajv";

const ajv = new Ajv({ removeAdditional: false, strict: false });

export enum ChangeOperation {
	Set = "SET",
	Add = "ADD",
	Multiply = "MULTIPLY",
	Append = "APPEND",
	Min = "MIN",
	Max = "MAX",
	Remove = "REMOVE",
}

export interface ChangeSchema {
	key: string;
	operation: ChangeOperation;
	value: string | number | boolean;
}

export const changeSchema = {
	title: "Change",
	description:
		"Patches a field on the item document using a dot-notation key. Used by INDEPENDENT modifier breakpoints. Multiple changes are applied in order; later entries targeting the same field overwrite earlier ones",
	examples: [
		{ key: "system.magicalBonus", operation: "SET", value: 2 },
		{ key: "system.properties", operation: "APPEND", value: "mgc" },
	],
	type: "object",
	required: ["key", "operation", "value"],
	properties: {
		key: {
			description:
				"Dot-notation path to the field on the item. Common keys: system.magicalBonus (attack/damage bonus), system.rarity, system.armor.value, system.properties (append a property tag)",
			type: "string",
		},
		operation: {
			description:
				"SET: replace the field; ADD: add to current number (negative to subtract); MULTIPLY: multiply current number; APPEND: push a value onto an array field; MIN: keep whichever is smaller; MAX: keep whichever is larger",
			type: "string",
			enum: Object.values(ChangeOperation),
		},
		value: {
			description:
				"The value to apply — string, number, or boolean depending on the target field",
			type: ["string", "number", "boolean"],
		},
	},
};

export const changesSchema = {
	title: "Changes",
	description:
		"Item document patches applied by an INDEPENDENT modifier breakpoint",
	type: "array",
	default: [],
	items: changeSchema,
};

export const validateChangeSchema = ajv.compile<ChangeSchema>(changeSchema);
