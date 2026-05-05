export enum Tag {
    DUMMY = "DUMMY",
}

export enum ModifierType {
    UNIQUE = "UNIQUE",
}

export interface Application {
    /**
     * Weight for this modifier, zero removes the modifier from the loot pool <br/>
     * Positive numbers, and zero only
     */
    weight: number;
    tags: {
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
    };
}

/**
 * Some attributes inside the schema are optional with default values
 */
export const applicationSchema = {
    type: "object",
    required: ["weight"],
    properties: {
        weight: { type: "number", minimum: 0 },
        tags: {
            type: "object",
            default: {},
            properties: {
                whitelistedBy: { type: "array", items: { type: "string", enum: Object.values(Tag) }, default: [] },
                blacklistedBy: { type: "array", items: { type: "string", enum: Object.values(Tag) }, default: [] },
                applies: { type: "array", items: { type: "string", enum: Object.values(Tag) }, default: [] },
            },
        },
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
