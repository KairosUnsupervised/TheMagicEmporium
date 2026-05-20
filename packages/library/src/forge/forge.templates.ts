import { Rarity } from "../item/item.types";
import { Restriction } from "../modifiers/modifier.schema";
import type { Template } from "./forge.types";

export const templates: Template[] = [
	// ── Common ────────────────────────────────────────────────────────────────
	{
		rarity: Rarity.Common,
		slots: [Restriction.Primary, Restriction.Primary],
		points: 0.4,
		floatBias: "NORMAL",
		nonFloatCost: 0.5,
	},
	{
		rarity: Rarity.Common,
		slots: [Restriction.Secondary],
		points: 0.4,
		floatBias: "UNLUCKY",
		nonFloatCost: 0.5,
	},

	// ── Uncommon ──────────────────────────────────────────────────────────────
	{
		rarity: Rarity.Uncommon,
		slots: [Restriction.Primary, Restriction.Primary, Restriction.Primary],
		points: 0.8,
		floatBias: "NORMAL",
		nonFloatCost: 0.5,
	},
	{
		rarity: Rarity.Uncommon,
		slots: [Restriction.Primary, Restriction.Primary, Restriction.Secondary],
		points: 0.8,
		floatBias: "UNLUCKY",
		nonFloatCost: 0.5,
	},

	// ── Rare ──────────────────────────────────────────────────────────────────
	{
		rarity: Rarity.Rare,
		slots: [
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Secondary,
			Restriction.Secondary,
			Restriction.Secondary,
		],
		points: 1.2,
		floatBias: "UNLUCKY",
		nonFloatCost: 0.4,
	},
	{
		rarity: Rarity.Rare,
		slots: [
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Secondary,
		],
		points: 1.2,
		floatBias: "NORMAL",
		nonFloatCost: 0.4,
	},
	{
		rarity: Rarity.Rare,
		slots: [Restriction.Primary, Restriction.Secondary],
		points: 1.2,
		floatBias: "LUCKY",
		nonFloatCost: 0.4,
	},

	// ── Very Rare ─────────────────────────────────────────────────────────────
	{
		rarity: Rarity.VeryRare,
		slots: [
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Secondary,
			Restriction.Secondary,
			Restriction.Secondary,
		],
		points: 2.4,
		floatBias: "NORMAL",
		nonFloatCost: 0.3,
	},
	{
		rarity: Rarity.VeryRare,
		slots: [
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Secondary,
			Restriction.Secondary,
		],
		points: 2.4,
		floatBias: "LUCKY",
		nonFloatCost: 0.3,
	},
	{
		rarity: Rarity.VeryRare,
		slots: [
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Secondary,
			Restriction.Secondary,
			Restriction.Secondary,
		],
		points: 2.4,
		floatBias: "UNLUCKY",
		nonFloatCost: 0.3,
	},

	// ── Legendary ─────────────────────────────────────────────────────────────
	{
		rarity: Rarity.Legendary,
		slots: [
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Secondary,
			Restriction.Secondary,
			Restriction.Secondary,
			Restriction.Tertiary,
		],
		points: 4,
		floatBias: "NORMAL",
		nonFloatCost: 0.3,
	},
	{
		rarity: Rarity.Legendary,
		slots: [
			Restriction.Primary,
			Restriction.Primary,
			Restriction.Secondary,
			Restriction.Secondary,
			Restriction.Tertiary,
		],
		points: 4,
		floatBias: "LUCKY",
		nonFloatCost: 0.3,
	},
];

export const getRandomTemplate = (rarity: Rarity): Template => {
	const available = templates.filter((t) => t.rarity === rarity);
	const picked = available[Math.floor(Math.random() * available.length)];
	return JSON.parse(JSON.stringify(picked));
};
