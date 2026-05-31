import { Tag } from "../../item/tag.types";

export enum Restriction {
	Primary = "PRIMARY",
	Secondary = "SECONDARY",
	Tertiary = "TERTIARY",
}

export interface Application {
	weight: number;
	// TODO MAKE REQUIRED
	restriction?: Restriction;
	whitelistedBy: Tag[];
	blacklistedBy: Tag[];
	applies: Tag[];
}

export const applicationSchema = {
	description:
		"Controls the loot-pool weight, slot restriction, and tag-based inclusion/exclusion rules for a modifier",
	examples: [
		{
			weight: 1024,
			restriction: "PRIMARY",
			whitelistedBy: ["WEAPON"],
		},
		{
			weight: 512,
			restriction: "SECONDARY",
			blacklistedBy: ["CONSUMABLE"],
			applies: ["CONSUMABLE"],
		},
	],
	type: "object",
	required: ["weight"],
	properties: {
		weight: {
			description:
				"Relative probability for this modifier to appear in the loot pool. Default weight is 1024, 0 removes it entirely",
			type: "number",
			minimum: 0,
		},
		restriction: {
			description:
				"Limits this modifier to a specific item slot. Omit to allow any slot",
			type: "string",
			enum: Object.values(Restriction),
		},
		whitelistedBy: {
			description:
				"Modifier can only roll on items that carry at least one of these tags. Ignored if empty",
			type: "array",
			items: { type: "string", enum: Object.values(Tag) },
			default: [],
		},
		blacklistedBy: {
			description:
				"Modifier cannot roll on items that carry any of these tags. Ignored if empty",
			type: "array",
			items: { type: "string", enum: Object.values(Tag) },
			default: [],
		},
		applies: {
			description: "Tags merged onto the item when this modifier is added",
			type: "array",
			items: { type: "string", enum: Object.values(Tag) },
			default: [],
		},
	},
};
