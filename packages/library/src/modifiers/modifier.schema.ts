import Ajv from "ajv";
import {Tag} from "../item/tag.types";

const ajv = new Ajv()

export enum ModifierType {
    Unique = "UNIQUE",
    Linear = "LINEAR",
    Independent = "INDEPENDENT",
    Tiered = "TIERED",
}

export interface ModifierTypeSchema {
    type: ModifierType
}

export const validateModifierTypeSchema = ajv.compile<ModifierTypeSchema>({
    type: "object",
    required: ["type"],
    properties: {
        type: {type: "string", enum: Object.values(ModifierType)},
    },
})

export interface Application {
    /**
     * Weight for this modifier, zero removes the modifier from the loot pool <br/>
     * Positive numbers, and zero only
     */
    weight: number;
    /**
     * The modifier can only be applied a single item tag is on the modifier whitelist <br/>
     * Ignored if empty
     */
    whitelistedBy: Tag[];
    /**
     * The modifier cannot be applied if a single blacklisted tag is on the item <br/>
     * Ignored if empty
     */
    blacklistedBy: Tag[];
    /**
     * After being added to the item, the following tags get merged onto the item
     */
    applies: Tag[];
}

export const applicationSchema = {
    type: "object",
    required: ["weight"],
    properties: {
        weight: { type: "number", minimum: 0 },
        whitelistedBy: { type: "array", items: { type: "string", enum: Object.values(Tag) }, default: [] },
        blacklistedBy: { type: "array", items: { type: "string", enum: Object.values(Tag) }, default: [] },
        applies: { type: "array", items: { type: "string", enum: Object.values(Tag) }, default: [] },
    },
};

export interface Flavor {
    /**
     * UI title of this modifier
     */
    title: string;
    /**
     * UI description of this modifier
     */
    description: string;
    /**
     * UI disclaimer text, small explanatory text
     */
    disclaimer: string | null;
}

export const flavorSchema = {
    type: "object",
    required: ["title", "description"],
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        disclaimer: { type: ["string", "null"], default: null },
    },
};
