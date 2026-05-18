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
	type: "object",
	required: ["key", "operation", "value"],
	properties: {
		key: { type: "string" },
		operation: { type: "string", enum: Object.values(ChangeOperation) },
		value: { type: ["string", "number", "boolean"] },
	},
};

export const changesSchema = {
	type: "array",
	default: [],
	items: changeSchema,
};

export const validateChangeSchema = ajv.compile<ChangeSchema>(changeSchema);
