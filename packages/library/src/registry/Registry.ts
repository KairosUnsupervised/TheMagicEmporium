import { logger } from "../logger";
import { IndependentModifier } from "../modifiers/blueprints/IndependentModifier";
import { LinearModifier } from "../modifiers/blueprints/LinearModifier";
import { TieredModifier } from "../modifiers/blueprints/TieredModifier";
import { UniqueModifier } from "../modifiers/blueprints/UniqueModifier";
import { BrokenModifier } from "../modifiers/internal/Broken";
import { ExhaustedModifier } from "../modifiers/internal/Exhausted";
import type { Modifier, ModifierFactory } from "../modifiers/Modifier";
import {
	ModifierType,
	validateModifierTypeSchema,
} from "../modifiers/modifier.schema";

const factoryMap: Record<ModifierType, ModifierFactory> = {
	[ModifierType.Unique]: UniqueModifier.create,
	[ModifierType.Linear]: LinearModifier.create,
	[ModifierType.Independent]: IndependentModifier.create,
	[ModifierType.Tiered]: TieredModifier.create,
};

export class Registry {
	/**
	 * Modifiers that have weight and can be drawn
	 */
	public weighted: Modifier[] = [];

	/**
	 * All modifiers mapped by their identifier
	 */
	public mapped: { [key: string]: Modifier } = {
		INTERNAL_BROKEN: new BrokenModifier(),
		INTERNAL_EXHAUSTED: new ExhaustedModifier(),
	};

	/**
	 * Registers all modifiers of a specific pack into the registry
	 * @param packs
	 */
	public registerPacks = async (
		packs: { modifiers: unknown[]; enabled: boolean }[],
	): Promise<void> => {
		packs.forEach((pack) => {
			pack.modifiers.forEach((modifier) => {
				this.loadModifier(modifier, pack.enabled);
			});
		});
	};

	/**
	 * Load a specific modifier into the registry
	 * @param definition
	 * @param enabled
	 */
	public loadModifier = (
		definition: unknown,
		enabled: boolean,
	): Modifier | null => {
		if (!validateModifierTypeSchema(definition)) {
			logger.notification.gm.error("Invalid modifier type, skipping entry", {
				errors: validateModifierTypeSchema.errors,
			});
			return null;
		}

		const modifier = factoryMap[definition.type]({ definition, enabled });

		if (!modifier) {
			return null;
		}

		if (this.mapped[modifier.identifier]) {
			logger.notification.gm.error(
				"Duplicate modifier identifier, skipping entry",
				{ identifier: modifier.identifier },
			);
			return null;
		}
		this.mapped[modifier.identifier] = modifier;

		if (modifier.application.weight > 0) {
			this.weighted.push(modifier);
		}

		return modifier;
	};

	public get = (identifier: string): Modifier | null => {
		if (this.mapped[identifier]) {
			return this.mapped[identifier];
		}
		logger.notification.all.error(
			`No modifier found with identifier ${identifier}`,
		);
		return null;
	};
}

export const registry = new Registry();
