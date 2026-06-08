import { equipmentRarity } from "../item/equipment/equipment.adjectives";
import { equipmentDetails } from "../item/equipment/equipment.details";
import { Equipment } from "../item/equipment/equipment.types";
import { Rarity } from "../item/item.types";
import { logger } from "../logger";
import { FloatDataManager } from "../modifiers/dataManagers/FloatDataManager";
import type { Modifier } from "../modifiers/Modifier";
import type { Restriction } from "../modifiers/modifier.schema";
import { registry } from "../registry/Registry";
import { ForgeProcess } from "./ForgeProcess";
import { getRandomTemplate } from "./forge.templates";
import type { Template } from "./forge.types";

export interface GachaRevealProps {
	equipmentWhitelist: Equipment[];
	rarityLuck: number;
	modifierLuck: number;
	forcedRarity?: Rarity;
}

// TODO The forge is in a desperate need of a rework
export class Forge {
	/**
	 * Generate a complete random magic item, optionally forcing equipment type or rarity.
	 */
	public static random = (
		equipment?: Equipment,
		rarity?: Rarity,
		luck = 0,
	): ForgeProcess => {
		const template = Forge.getTemplate(luck, rarity);
		const process = new ForgeProcess();

		process.abstractItem.backgroundEligible = template.backgroundEligible;

		process.setBase(equipment ?? Forge.pickRandomEquipment());
		Forge.generateGoldValue(process, template);
		Forge.generateModifiers(process, template);
		process.setRarity(template.rarity);
		Forge.generateName(process);

		return process;
	};

	public static getGachaAbstractItem = (props: GachaRevealProps) => {
		const process = new ForgeProcess();
		const template = this.getTemplate(props.rarityLuck,  props.forcedRarity);
		const internalTemplate = {...template, luck: template.luck + props.modifierLuck}

		process.abstractItem.backgroundEligible = internalTemplate.backgroundEligible;
		process.setBase(
			props.equipmentWhitelist[Math.floor(Math.random() * props.equipmentWhitelist.length)],
		);
		Forge.generateGoldValue(process, internalTemplate);
		Forge.generateModifiers(process, internalTemplate);
		process.setRarity(internalTemplate.rarity);
		Forge.generateName(process);

		return process.abstractItem;
	};

	private static rarityOrder = [
		Rarity.Common,
		Rarity.Uncommon,
		Rarity.Rare,
		Rarity.VeryRare,
		Rarity.Legendary,
	];

	private static getTemplate = (
		luck: number,
		forcedRarity?: Rarity,
	): Template => {
		const absLuck = Math.abs(luck);
		const floor = Math.trunc(absLuck);
		const fraction = absLuck - floor;
		const extraRolls = Math.random() < fraction ? floor + 1 : floor;
		const count = extraRolls + 1;

		const candidates = Array.from({ length: count }, () =>
			getRandomTemplate(forcedRarity),
		);

		if (count === 1) {
			return candidates[0];
		}

		return candidates.reduce((best, current) => {
			const bestRank = Forge.rarityOrder.indexOf(best.rarity);
			const currentRank = Forge.rarityOrder.indexOf(current.rarity);
			return luck > 0
				? currentRank > bestRank
					? current
					: best
				: currentRank < bestRank
					? current
					: best;
		});
	};

	// ── Private generation steps ──────────────────────────────────────────────

	private static generateModifiers = (
		process: ForgeProcess,
		template: Template,
	): void => {
		const slots = [...template.slots];
		let remainingPoints = template.points;

		while (remainingPoints > 0 && slots.length > 0) {
			const index = Math.floor(Math.random() * slots.length);
			const slot = slots[index];
			slots.splice(index, 1);

			const modifier = Forge.getRandomModifier(process, slot);
			const hasFloat = modifier.dataManager instanceof FloatDataManager;
			const data = hasFloat
				? { float: Forge.generateFloat(template.luck) }
				: null;

			process.addModifier(slot, modifier, data);

			remainingPoints -= hasFloat
				? (data as { float: number }).float
				: template.nonFloatCost;
		}
	};

	private static getRandomModifier = (
		process: ForgeProcess,
		slot: Restriction,
	): Modifier => {
		const totalWeight = registry.weighted.reduce(
			(sum, mod) => sum + mod.application.weight,
			0,
		);

		for (let attempt = 0; attempt < 10000; attempt++) {
			let remaining = Math.random() * totalWeight;

			for (const mod of registry.weighted) {
				remaining -= mod.application.weight;
				if (remaining <= 0) {
					if (process.canAdd(mod, slot)) return mod;
					break;
				}
			}
		}

		logger.notification.all.error(
			"Could not find a valid modifier for slot after 10000 attempts",
			{
				process,
			},
		);
		return registry.mapped["INTERNAL_EXHAUSTED"];
	};

	private static generateFloat = (luck: number): number => {
		const floor = Math.trunc(luck);
		const fraction = Math.abs(luck - floor);
		const sign = luck >= 0 ? 1 : -1;
		const amountRolled = Math.random() < fraction ? floor + sign : floor;

		if (amountRolled === 0) {
			return Math.random();
		}
		const rolls = Array.from(
			{ length: Math.abs(amountRolled) + 1 },
			Math.random,
		);
		return amountRolled > 0 ? Math.max(...rolls) : Math.min(...rolls);
	};

	private static generateGoldValue = (
		process: ForgeProcess,
		template: Template,
	): void => {
		const equipmentValue = equipmentDetails[process.abstractItem.base].value;
		process.abstractItem.currency = Math.floor(
			template.gold.min +
				Math.random() * template.gold.additional +
				equipmentValue * template.gold.equipmentValueImpact,
		);
	};

	private static generateName = (process: ForgeProcess): void => {
		const details = equipmentDetails[process.abstractItem.base];
		const baseName = details.altTitles?.length
			? details.altTitles[Math.floor(Math.random() * details.altTitles.length)]
			: details.title;
		const adjective = details.adjectives?.length
			? details.adjectives[
					Math.floor(Math.random() * details.adjectives.length)
				]
			: "";
		const rarity = equipmentRarity[process.abstractItem.rarity];

		process.abstractItem.name = `${rarity} ${adjective} ${baseName}`.trim();
	};

	private static pickRandomEquipment = (): Equipment => {
		const all = Object.values(Equipment);
		return all[Math.floor(Math.random() * all.length)];
	};
}
