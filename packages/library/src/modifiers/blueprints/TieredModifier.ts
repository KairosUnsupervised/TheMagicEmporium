import { ActiveEffect } from "../../effects/activeEffects/ActiveEffect";
import { Feat } from "../../effects/feats/Feat";
import { Icon } from "../../item/icon";
import { logger } from "../../logger";
import {
	type TieredBreakpoint,
	type TieredSchema,
	type TieredTier,
	validateTiered,
} from "../../schemas/modifiers/tiered.schema";
import { FloatDataManager } from "../dataManagers/FloatDataManager";
import { type CreateProps, Modifier } from "../Modifier";
import type { Flavor } from "../modifier.schema";

/**
 * A Tiered modifier resolves a float to a numeric value via breakpoints, then maps that value
 * to a specific tier. Each tier carries its own flavor and effects, so different tiers can apply
 * completely different effects. The resolved values from all active instances are summed, and that
 * sum is matched against the tier thresholds. Breakpoints and tiers are independent — their counts
 * do not need to match.
 */
export class TieredModifier extends Modifier<TieredSchema> {
	public readonly dataManager = FloatDataManager.create<TieredBreakpoint>();
	private readonly tiers: TieredTier[];

	static create(props: CreateProps): TieredModifier | null {
		if (!validateTiered(props.definition)) {
			logger.notification.gm.error(
				"Invalid modifier definition for TieredModifier, skipping entry",
				{
					definition: props.definition,
					errors: validateTiered.errors,
				},
			);
			return null;
		}
		if (props.enabled) {
			return new TieredModifier(props.definition);
		}
		return new TieredModifier({
			...props.definition,
			application: { ...props.definition.application, weight: 0 },
		});
	}

	constructor(definition: TieredSchema) {
		super(definition);
		this.dataManager.setBreakpoints(definition.breakpoints);
		this.tiers = [...definition.tiers].sort((a, b) => b.min - a.min);
	}

	private resolveTier(value: number): TieredTier {
		for (const tier of this.tiers) {
			if (value >= tier.min) {
				return tier;
			}
		}
		return this.tiers[this.tiers.length - 1];
	}

	public override getDescription(data: unknown): Flavor {
		const value = this.dataManager.getBreakpoint(data).value;
		return this.resolveTier(value).flavor;
	}

	private getActiveTier = (data: unknown[]): TieredTier | null => {
		if (data.length === 0) {
			return null;
		}
		const sum = data.reduce(
			(acc: number, d) => acc + this.dataManager.getBreakpoint(d).value,
			0,
		);
		return this.resolveTier(sum);
	};

	public override getActiveEffects = (data: unknown[]): ActiveEffect[] => {
		const tier = this.getActiveTier(data);
		if (!tier) {
			return [];
		}
		return ActiveEffect.createMultiple(
			tier.activeEffects,
			tier.flavor,
			Icon.Tiered,
		);
	};

	public override getFeats = (data: unknown[]): Feat[] => {
		const tier = this.getActiveTier(data);
		if (!tier) {
			return [];
		}
		return Feat.createMultiple(tier.feats, tier.flavor, Icon.Tiered);
	};

	public override getBackground = (data: unknown): string | null => {
		return (
			this.resolveTier(this.dataManager.getBreakpoint(data).value).flavor
				.background ?? null
		);
	};

	public isHighestPossibleBreakpoint = (data: unknown): boolean => {
		return this.dataManager.isHighestBreakpoint(data);
	};
}
