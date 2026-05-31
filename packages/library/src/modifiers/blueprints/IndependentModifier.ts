import { Activity } from "../../effects/activity/Activity";
import { Change } from "../../effects/change/Change";
import { Logger } from "../../misc/Logger";
import {
	type IndependentBreakpoint,
	type IndependentSchema,
	validateIndependent,
} from "../../schemas/modifiers/independent.schema";
import { FloatDataManager } from "../dataManagers/FloatDataManager";
import { type CreateProps, Modifier } from "../Modifier";
import type { Flavor } from "../modifier.schema";

export class IndependentModifier extends Modifier<IndependentSchema> {
	public readonly dataManager =
		FloatDataManager.create<IndependentBreakpoint>();

	static create(props: CreateProps): IndependentModifier | null {
		if (!validateIndependent(props.definition)) {
			Logger.error("Invalid modifier definition for IndependentModifier", {
				definition: props.definition,
				errors: validateIndependent.errors,
			});
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
		this.dataManager.setBreakpoints(definition.breakpoints);
	}

	public override getDescription = (data: unknown): Flavor => {
		const breakpoint = this.dataManager.getBreakpoint(data);

		return breakpoint.flavor;
	};

	public override getItemChanges = (data: unknown): Change[] => {
		const breakpoint = this.dataManager.getBreakpoint(data);

		return Change.createMultiple(breakpoint.changes);
	};

	public override getItemActivities = (data: unknown): Activity[] => {
		const breakpoint = this.dataManager.getBreakpoint(data);

		return Activity.createMultiple(breakpoint.activities);
	};

	public override getBackground = (data: unknown): string | null => {
		return this.dataManager.getBreakpoint(data).flavor.background ?? null;
	};
}
