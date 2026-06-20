import { ActiveEffect } from "../../effects/activeEffects/ActiveEffect";
import { Feat } from "../../effects/feats/Feat";
import { Icon } from "../../item/icon";
import { logger } from "../../logger";
import {
	type UniqueBreakpoint,
	type UniqueSchema,
	validateUnique,
} from "../../schemas/modifiers/unique.schema";
import { FloatManager } from "../manager/FloatManager";
import { type CreateProps, Modifier } from "../Modifier";
import type { Flavor } from "../modifier.schema";

/**
 * A Unique modifier bound to a player, e.g. multiple instances do not stack effects instead the highest effect is applied
 */
export class UniqueModifier extends Modifier<UniqueSchema> {
	public readonly float = FloatManager.create<UniqueBreakpoint>();

	static create(props: CreateProps): UniqueModifier | null {
		if (!validateUnique(props.definition)) {
			logger.notification.gm.error(
				"Invalid modifier definition for UniqueModifier, skipping entry",
				{
					definition: props.definition,
					errors: validateUnique.errors,
				},
			);
			return null;
		}
		if (props.enabled) {
			return new UniqueModifier(props.definition);
		}
		return new UniqueModifier({
			...props.definition,
			application: { ...props.definition.application, weight: 0 },
		});
	}

	constructor(definition: UniqueSchema) {
		super(definition);
		this.float.setBreakpoints(definition.breakpoints);
	}

	public override getDescription(float: number): Flavor {
		const breakpoint = this.float.getBreakpoint(float);
		return breakpoint.flavor;
	}

	private getHighestBreakpoint = (floats: number[]): UniqueBreakpoint => {
		return floats
			.map((float) => this.float.getBreakpoint(float))
			.sort((a, b) => b.min - a.min)[0];
	};

	public override getActiveEffects = (floats: number[]): ActiveEffect[] => {
		const highest = this.getHighestBreakpoint(floats);
		return ActiveEffect.createMultiple(
			highest.activeEffects,
			highest.flavor,
			Icon.Unique,
		);
	};

	public override getFeats = (floats: number[]): Feat[] => {
		const highest = this.getHighestBreakpoint(floats);
		return Feat.createMultiple(highest.feats, highest.flavor, Icon.Unique);
	};

	public override getBackground = (float: number): string | null => {
		return this.float.getBreakpoint(float).flavor.background ?? null;
	};

	public isHighestPossibleBreakpoint = (float: number): boolean => {
		return this.float.isHighestBreakpoint(float);
	};

	public getBreakpointIndex = (float: number): number => {
		return this.float.getBreakpointIndex(float);
	};
}
