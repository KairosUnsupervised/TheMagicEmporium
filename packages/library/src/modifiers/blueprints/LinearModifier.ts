import { ActiveEffect } from "../../effects/activeEffects/ActiveEffect";
import { Feat } from "../../effects/feats/Feat";
import { Icon } from "../../item/icon";
import { logger } from "../../logger";
import {
	type LinearBreakpoint,
	type LinearSchema,
	validateLinear,
} from "../../schemas/modifiers/linear.schema";
import { FloatManager } from "../manager/FloatManager";
import { type CreateProps, Modifier } from "../Modifier";
import type { Flavor } from "../modifier.schema";

export class LinearModifier extends Modifier<LinearSchema> {
	public readonly float = FloatManager.create<LinearBreakpoint>();

	static create(props: CreateProps): LinearModifier | null {
		if (!validateLinear(props.definition)) {
			logger.notification.gm.error(
				"Invalid modifier definition for UniqueModifier, skipping entry",
				{
					definition: props.definition,
					errors: validateLinear.errors,
				},
			);
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
		this.float.setBreakpoints(definition.breakpoints);
	}

	public override getDescription(float: number): Flavor {
		const amount = this.float.getBreakpoint(float).value.toString();

		return this.replaceKeyWords(this.schema.flavor, { amount });
	}

	/**
	 * Get the breakpoint amount of each passed float and sums them up
	 * @param floats
	 */
	private getAmount = (floats: number[]): string => {
		return floats
			.map((float) => this.float.getBreakpoint(float).value)
			.reduce((a, b) => a + b, 0)
			.toString();
	};

	public override getActiveEffects = (floats: number[]): ActiveEffect[] => {
		const amount = this.getAmount(floats);
		return ActiveEffect.createMultiple(
			this.replaceKeyWords(this.schema.activeEffects, { amount }),
			this.replaceKeyWords(this.schema.flavor, { amount }),
			Icon.Linear,
		);
	};

	public override getFeats = (floats: number[]): Feat[] => {
		const amount = this.getAmount(floats);
		return Feat.createMultiple(
			this.replaceKeyWords(this.schema.feats, { amount }),
			this.replaceKeyWords(this.schema.flavor, { amount }),
			Icon.Linear,
		);
	};

	public override getBackground = (float: number): string | null => {
		const breakpoint = this.float.getBreakpoint(float);
		return breakpoint.background ?? this.schema.flavor.background ?? null;
	};

	public isHighestPossibleBreakpoint = (float: number): boolean => {
		return this.float.isHighestBreakpoint(float);
	};

	public getBreakpointIndex = (float: number): number => {
		return this.float.getBreakpointIndex(float);
	};
}
