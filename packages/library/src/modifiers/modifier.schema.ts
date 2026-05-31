import Ajv from "ajv";

export type { Application } from "../schemas/modifiers/application.schema";
export {
	applicationSchema,
	Restriction,
} from "../schemas/modifiers/application.schema";
export type { Flavor } from "../schemas/modifiers/flavor.schema";
export { flavorSchema } from "../schemas/modifiers/flavor.schema";

const ajv = new Ajv();

export enum ModifierType {
	Unique = "UNIQUE",
	Linear = "LINEAR",
	Independent = "INDEPENDENT",
	Tiered = "TIERED",
}

export interface ModifierTypeSchema {
	type: ModifierType;
}

export const validateModifierTypeSchema = ajv.compile<ModifierTypeSchema>({
	type: "object",
	required: ["type"],
	properties: {
		type: { type: "string", enum: Object.values(ModifierType) },
	},
});
