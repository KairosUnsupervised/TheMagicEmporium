import { BaseSchema, type CreateProps, Modifier } from "../Modifier";
import {
	applicationSchema,
	Flavor,
	flavorSchema,
	ModifierType,
} from "../modifier.schema";
import Ajv from "ajv";
import { Logger } from "../../misc/Logger";
import { ActiveEffect } from "../../effects/activeEffects/ActiveEffect";
import { Feat } from "../../effects/feats/Feat";
import { FloatDataManager } from "../dataManagers/FloatDataManager";
import { Icon } from "../../item/icon";

const ajv = new Ajv({ removeAdditional: true, useDefaults: true });

interface Breakpoint {
	min: number;
	value: number;
}

interface Tier {
	min: number;
	flavor: Flavor;
	activeEffects: unknown[];
	feats: unknown[];
}

interface Schema extends BaseSchema {
	type: ModifierType.Tiered;
	breakpoints: Breakpoint[];
	tiers: Tier[];
}

const validateSchema = ajv.compile<Schema>({
	type: "object",
	required: ["identifier", "type", "application", "breakpoints", "tiers"],
	properties: {
		identifier: { type: "string" },
		type: { type: "string", enum: Object.values(ModifierType) },
		application: applicationSchema,
		breakpoints: {
			type: "array",
			minItems: 1,
			items: {
				type: "object",
				required: ["min", "value"],
				properties: {
					min: { type: "number", minimum: 0 },
					value: { type: "number" },
				},
			},
		},
		tiers: {
			type: "array",
			minItems: 1,
			items: {
				type: "object",
				required: ["min", "flavor"],
				properties: {
					min: { type: "number", minimum: 0 },
					flavor: flavorSchema,
					activeEffects: { type: "array", default: [] },
					feats: { type: "array", default: [] },
				},
			},
		},
	},
});

/**
 * A Tiered modifier resolves a float to a numeric value via breakpoints, then maps that value
 * to a specific tier. Each tier carries its own flavor and effects, so different tiers can apply
 * completely different effects. The resolved values from all active instances are summed, and that
 * sum is matched against the tier thresholds. Breakpoints and tiers are independent — their counts
 * do not need to match.
 */
export class TieredModifier extends Modifier<Schema> {
	public readonly dataManager = FloatDataManager.create<Breakpoint>();
	private readonly tiers: Tier[];

	static create(props: CreateProps): TieredModifier | null {
		if (!validateSchema(props.definition)) {
			Logger.error("Invalid modifier definition for TieredModifier", {
				definition: props.definition,
				errors: validateSchema.errors,
			});
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

	constructor(definition: Schema) {
		super(definition);
		this.dataManager.setBreakpoints(definition.breakpoints);
		this.tiers = [...definition.tiers].sort((a, b) => b.min - a.min);
	}

	private resolveTier(value: number): Tier {
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

	private getActiveTier = (data: unknown[]): Tier | null => {
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
}
