import { Activity } from "../../effects/activity/Activity";
import { Change } from "../../effects/change/Change";
import { logger } from "../../logger";
import {
	type IndependentBreakpoint,
	type IndependentSchema,
	validateIndependent,
} from "../../schemas/modifiers/independent.schema";
import { FloatManager } from "../manager/FloatManager";
import { type CreateProps, Modifier } from "../Modifier";
import type { Flavor } from "../modifier.schema";

export class IndependentModifier extends Modifier<IndependentSchema> {

	public readonly float = FloatManager.create<IndependentBreakpoint>();

	static create(props: CreateProps): IndependentModifier | null {
		if (!validateIndependent(props.definition)) {
			logger.notification.gm.error(
				"Invalid modifier definition for IndependentModifier, skipping entry",
				{
					definition: props.definition,
					errors: validateIndependent.errors,
				},
			);
			return null;
		}

		if (props.enabled) {
			return new IndependentModifier(props.definition);
		}
		return new IndependentModifier({
			...props.definition,
			application: { ...props.definition.application, weight: 0 },
		});
	}

	constructor(definition: IndependentSchema) {
		super(definition);
		this.float.setBreakpoints(definition.breakpoints);
	}

	public override getDescription = (float: number): Flavor => {
		const breakpoint = this.float.getBreakpoint(float);

		return breakpoint.flavor;
	};

	public override getItemChanges = (float: number): Change[] => {
		const breakpoint = this.float.getBreakpoint(float);

		return Change.createMultiple(breakpoint.changes);
	};

	public override getItemActivities = (float: number): Activity[] => {
		const breakpoint = this.float.getBreakpoint(float);

		return Activity.createMultiple(breakpoint.activities);
	};

	public override getBackground = (float: number): string | null => {
		return this.float.getBreakpoint(float).flavor.background ?? null;
	};

	public isHighestPossibleBreakpoint = (float: number): boolean => {
		return this.float.isHighestBreakpoint(float);
	};

	public getBreakpointIndex = (float: number): number => {
		return this.float.getBreakpointIndex(float)
	}
}
