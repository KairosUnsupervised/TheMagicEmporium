import { ActiveEffect } from "../../effects/activeEffects/ActiveEffect";
import { Feat } from "../../effects/feats/Feat";
import { Icon } from "../../item/icon";
import { logger } from "../../logger";
import {
	type LinearBreakpoint,
	type LinearSchema,
	validateLinear,
} from "../../schemas/modifiers/linear.schema";
import { FloatDataManager } from "../dataManagers/FloatDataManager";
import { type CreateProps, Modifier } from "../Modifier";
import type { Flavor } from "../modifier.schema";

export class LinearModifier extends Modifier<LinearSchema> {
	public readonly dataManager = FloatDataManager.create<LinearBreakpoint>();

	static create(props: CreateProps): LinearModifier | null {
		if (!validateLinear(props.definition)) {
			logger.notification.gm.error("Invalid modifier definition for UniqueModifier, skipping entry", {
				definition: props.definition,
				errors: validateLinear.errors,
			});
			return null;
		}
		if (props.enabled) {
			return new LinearModifier(props.definition);
		}
		return new LinearModifier({
			...props.definition,
			application: { ...props.definition.application, weight: 0 },
		});
	}

	constructor(definition: LinearSchema) {
		super(definition);
		this.dataManager.setBreakpoints(definition.breakpoints);
	}

	public override getDescription(data: unknown): Flavor {
		const amount = this.dataManager.getBreakpoint(data).value.toString();

		return this.replaceKeyWords(this.schema.flavor, { amount });
	}

	/**
	 * Get the breakpoint amount of each passed float and sums them up
	 * @param data
	 */
	private getAmount = (data: unknown[]): string => {
		return data
			.map((d) => this.dataManager.getBreakpoint(d).value)
			.reduce((a, b) => a + b, 0)
			.toString();
	};

	public override getActiveEffects = (data: unknown[]): ActiveEffect[] => {
		const amount = this.getAmount(data);
		return ActiveEffect.createMultiple(
			this.replaceKeyWords(this.schema.activeEffects, { amount }),
			this.replaceKeyWords(this.schema.flavor, { amount }),
			Icon.Linear,
		);
	};

	public override getFeats = (data: unknown[]): Feat[] => {
		const amount = this.getAmount(data);
		return Feat.createMultiple(
			this.replaceKeyWords(this.schema.feats, { amount }),
			this.replaceKeyWords(this.schema.flavor, { amount }),
			Icon.Linear,
		);
	};

	public override getBackground = (data: unknown): string | null => {
		const breakpoint = this.dataManager.getBreakpoint(data);
		return breakpoint.background ?? this.schema.flavor.background ?? null;
	};

	public isHighestPossibleBreakpoint = (data: unknown): boolean => {
		return this.dataManager.isHighestBreakpoint(data);
	};
}
