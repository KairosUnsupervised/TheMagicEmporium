import { Rarity } from "../item/item.types";
import { Restriction } from "../modifiers/modifier.schema";
import type { Template } from "./forge.types";

export const templates: Template[] = [
	// ── Common 45000 Total Weight────────────────────────────────────────────────────────────────
	{
		rarity: Rarity.Common,
		slots: [Restriction.Primary, Restriction.Primary],
		points: 0.4,
		floatBias: "NORMAL",
		nonFloatCost: 0.5,
		backgroundEligible: false,
		weight: 22500,
		gold: { min: 20, additional: 40, equipmentValueImpact: 0.25 },
	},
	{
		rarity: Rarity.Common,
		slots: [Restriction.Secondary],
		points: 0.4,
		floatBias: "UNLUCKY",
		nonFloatCost: 0.5,
		backgroundEligible: false,
		weight: 22500,
		gold: { min: 20, additional: 40, equipmentValueImpact: 0.25 },
	},

	// ── Uncommon 25000 Total Weight ──────────────────────────────────────────────────────────────
	{
		rarity: Rarity.Uncommon,
		slots: [Restriction.Primary, Restriction.Primary, Restriction.Primary],
		points: 0.8,
		floatBias: "NORMAL",
		nonFloatCost: 0.5,
		backgroundEligible: false,
		weight: 11000,
		gold: { min: 40, additional: 80, equipmentValueImpact: 0.25 },
	},
	{
		rarity: Rarity.Uncommon,
		slots: [Restriction.Primary, Restriction.Primary, Restriction.Primary],
		points: 0.8,
		floatBias: "NORMAL",
		nonFloatCost: 0.5,
		backgroundEligible: true,
		weight: 1500,
		gold: { min: 40, additional: 80, equipmentValueImpact: 0.25 },
	},
	{
		rarity: Rarity.Uncommon,
		slots: [Restriction.Primary, Restriction.Primary, Restriction.Secondary],
		points: 0.8,
		floatBias: "UNLUCKY",
		nonFloatCost: 0.5,
		backgroundEligible: false,
		weight: 11000,
		gold: { min: 40, additional: 80, equipmentValueImpact: 0.25 },
	},
	{
		rarity: Rarity.Uncommon,
		slots: [Restriction.Primary, Restriction.Primary, Restriction.Secondary],
		points: 0.8,
		floatBias: "UNLUCKY",
		nonFloatCost: 0.5,
		backgroundEligible: true,
		weight: 1500,
		gold: { min: 40, additional: 80, equipmentValueImpact: 0.25 },
	},

	// ── Rare 15000 Total Weight ──────────────────────────────────────────────────────────────────
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
		backgroundEligible: false,
		weight: 4000,
		gold: { min: 100, additional: 150, equipmentValueImpact: 0.5 },
	},
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
		backgroundEligible: true,
		weight: 1000,
		gold: { min: 100, additional: 150, equipmentValueImpact: 0.5 },
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
		backgroundEligible: false,
		weight: 4000,
		gold: { min: 100, additional: 150, equipmentValueImpact: 0.5 },
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
		backgroundEligible: true,
		weight: 1000,
		gold: { min: 100, additional: 150, equipmentValueImpact: 0.5 },
	},
	{
		rarity: Rarity.Rare,
		slots: [Restriction.Primary, Restriction.Secondary],
		points: 1.2,
		floatBias: "LUCKY",
		nonFloatCost: 0.4,
		backgroundEligible: false,
		weight: 4000,
		gold: { min: 100, additional: 150, equipmentValueImpact: 0.5 },
	},
	{
		rarity: Rarity.Rare,
		slots: [Restriction.Primary, Restriction.Secondary],
		points: 1.2,
		floatBias: "LUCKY",
		nonFloatCost: 0.4,
		backgroundEligible: true,
		weight: 1000,
		gold: { min: 100, additional: 150, equipmentValueImpact: 0.5 },
	},

	// ── Very Rare 10000 Total Weight ─────────────────────────────────────────────────────────────
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
		backgroundEligible: false,
		weight: 1667,
		gold: { min: 200, additional: 600, equipmentValueImpact: 1 },
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
		floatBias: "NORMAL",
		nonFloatCost: 0.3,
		backgroundEligible: true,
		weight: 1667,
		gold: { min: 200, additional: 600, equipmentValueImpact: 1 },
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
		backgroundEligible: false,
		weight: 1667,
		gold: { min: 200, additional: 600, equipmentValueImpact: 1 },
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
		backgroundEligible: true,
		weight: 1667,
		gold: { min: 200, additional: 600, equipmentValueImpact: 1 },
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
		backgroundEligible: false,
		weight: 1667,
		gold: { min: 200, additional: 600, equipmentValueImpact: 1 },
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
		backgroundEligible: true,
		weight: 1667,
		gold: { min: 200, additional: 600, equipmentValueImpact: 1 },
	},

	// ── Legendary 5000 Total Weight ─────────────────────────────────────────────────────────────
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
		backgroundEligible: false,
		weight: 500,
		gold: { min: 600, additional: 1200, equipmentValueImpact: 1 },
	},
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
		backgroundEligible: true,
		weight: 2000,
		gold: { min: 600, additional: 1200, equipmentValueImpact: 1 },
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
		backgroundEligible: false,
		weight: 500,
		gold: { min: 600, additional: 1200, equipmentValueImpact: 1 },
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
		backgroundEligible: true,
		weight: 2000,
		gold: { min: 600, additional: 1200, equipmentValueImpact: 1 },
	},
];

const pickByWeight = (pool: Template[]): Template => {
	const totalWeight = pool.reduce((sum, t) => sum + t.weight, 0);
	let roll = Math.random() * totalWeight;
	for (const template of pool) {
		roll -= template.weight;
		if (roll <= 0) {
			return JSON.parse(JSON.stringify(template));
		}
	}
	return JSON.parse(JSON.stringify(pool[pool.length - 1]));
};

export const getRandomTemplate = (rarity?: Rarity): Template => {
	const pool = rarity
		? templates.filter((t) => t.rarity === rarity)
		: templates;
	return pickByWeight(pool);
};
