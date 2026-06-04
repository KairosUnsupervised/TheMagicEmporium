import {equipmentRarity} from "../item/equipment/equipment.adjectives";
import {equipmentDetails} from "../item/equipment/equipment.details";
import {Equipment} from "../item/equipment/equipment.types";
import type {Rarity} from "../item/item.types";
import {logger} from "../logger";
import {FloatDataManager} from "../modifiers/dataManagers/FloatDataManager";
import type {Modifier} from "../modifiers/Modifier";
import type {Restriction} from "../modifiers/modifier.schema";
import {registry} from "../registry/Registry";
import {ForgeProcess} from "./ForgeProcess";
import {getRandomTemplate} from "./forge.templates";
import type {FloatBias, Template} from "./forge.types";

export class Forge {
	/**
	 * Generate a complete random magic item, optionally forcing equipment type or rarity.
	 */
	public static random = (
		equipment?: Equipment,
		rarity?: Rarity,
	): ForgeProcess => {
		const template = getRandomTemplate(rarity);
		const process = new ForgeProcess();

		process.abstractItem.backgroundEligible = template.backgroundEligible;

		process.setBase(equipment ?? Forge.pickRandomEquipment());
		Forge.generateGoldValue(process, template);
		Forge.generateModifiers(process, template);
		process.setRarity(template.rarity);
		Forge.generateName(process);

		return process;
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
				? {float: Forge.generateFloat(template.floatBias)}
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

	private static generateFloat = (bias: FloatBias): number => {
		if (bias === "LUCKY") {
			return Math.max(Math.random(), Math.random());
		}
		if (bias === "UNLUCKY") {
			return Math.min(Math.random(), Math.random());
		}
		return Math.random();
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
