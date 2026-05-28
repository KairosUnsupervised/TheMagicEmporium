import Ajv from "ajv";
import { Activity } from "../../effects/activity/Activity";
import { Change } from "../../effects/change/Change";
import { Logger } from "../../misc/Logger";
import { FloatDataManager } from "../dataManagers/FloatDataManager";
import { type BaseSchema, type CreateProps, Modifier } from "../Modifier";
import {
	applicationSchema,
	type Flavor,
	flavorSchema,
	ModifierType,
} from "../modifier.schema";

const ajv = new Ajv({ removeAdditional: true, useDefaults: true });

interface Breakpoint {
	min: number;
	flavor: Flavor;
	changes: unknown[];
	activities: unknown[];
}

interface Schema extends BaseSchema {
	type: ModifierType.Independent;
	breakpoints: Breakpoint[];
}

const validateRaw = ajv.compile<Schema>({
	type: "object",
	required: ["identifier", "type", "application", "breakpoints"],
	properties: {
		identifier: { type: "string" },
		type: { type: "string", const: ModifierType.Independent },
		application: applicationSchema,
		breakpoints: {
			type: "array",
			minItems: 1,
			items: {
				type: "object",
				required: ["min", "flavor"],
				properties: {
					min: { type: "number", minimum: 0 },
					flavor: flavorSchema,
					changes: { type: "array", default: [] },
					activities: { type: "array", default: [] },
				},
			},
		},
	},
});

/**
 * An Independent modifier selects a tier based on a float value and applies that breakpoint's
 * flavor, changes, and activities directly to the item document.
 */
export class IndependentModifier extends Modifier<Schema> {
	public readonly dataManager = FloatDataManager.create<Breakpoint>();

	static create(props: CreateProps): IndependentModifier | null {
		if (!validateRaw(props.definition)) {
			Logger.error("Invalid modifier definition for IndependentModifier", {
				definition: props.definition,
				errors: validateRaw.errors,
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

	constructor(definition: Schema) {
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
