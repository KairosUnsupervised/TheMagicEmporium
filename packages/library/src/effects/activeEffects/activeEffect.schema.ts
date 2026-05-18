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
	type: "object",
	required: ["changes"],
	properties: {
		title: { type: "string" },
		description: { type: "string" },
		disclaimer: { type: ["string", "null"] },
		changes: {
			type: "array",
			items: {
				type: "object",
				required: ["key", "mode", "value"],
				properties: {
					key: { type: "string" },
					mode: { type: "string", enum: Object.values(ModeSchema) },
					value: { type: "string" },
				},
			},
		},
	},
});
