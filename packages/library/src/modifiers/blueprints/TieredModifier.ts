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
import { FloatManager } from "../manager/FloatManager";
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
	public readonly float = FloatManager.create<TieredBreakpoint>();
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
		this.float.setBreakpoints(definition.breakpoints);
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

	public override getDescription(float: number): Flavor {
		const value = this.float.getBreakpoint(float).value;
		return this.resolveTier(value).flavor;
	}

	private getActiveTier = (floats: number[]): TieredTier | null => {
		if (floats.length === 0) {
			return null;
		}
		const sum = floats.reduce(
			(acc: number, float) => acc + this.float.getBreakpoint(float).value,
			0,
		);
		return this.resolveTier(sum);
	};

	public override getActiveEffects = (floats: number[]): ActiveEffect[] => {
		const tier = this.getActiveTier(floats);
		if (!tier) {
			return [];
		}
		return ActiveEffect.createMultiple(
			tier.activeEffects,
			tier.flavor,
			Icon.Tiered,
		);
	};

	public override getFeats = (floats: number[]): Feat[] => {
		const tier = this.getActiveTier(floats);
		if (!tier) {
			return [];
		}
		return Feat.createMultiple(tier.feats, tier.flavor, Icon.Tiered);
	};

	public override getBackground = (float: number): string | null => {
		return (
			this.resolveTier(this.float.getBreakpoint(float).value).flavor
				.background ?? null
		);
	};

	public isHighestPossibleBreakpoint = (float: number): boolean => {
		return this.float.isHighestBreakpoint(float);
	};

	public getBreakpointIndex = (float: number): number => {
		return this.float.getBreakpointIndex(float);
	};
}
