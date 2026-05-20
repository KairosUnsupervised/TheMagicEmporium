import Ajv from "ajv";
import { ActiveEffect } from "../../effects/activeEffects/ActiveEffect";
import { Feat } from "../../effects/feats/Feat";
import { Icon } from "../../item/icon";
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
	value: number;
}

interface Schema extends BaseSchema {
	type: ModifierType.Linear;
	flavor: Flavor;
	breakpoints: Breakpoint[];
	activeEffects: unknown[];
	feats: unknown[];
}

const validateSchema = ajv.compile<Schema>({
	type: "object",
	required: ["identifier", "type", "application", "flavor", "breakpoints"],
	properties: {
		identifier: { type: "string" },
		type: { type: "string", enum: Object.values(ModifierType) },
		application: applicationSchema,
		flavor: flavorSchema,
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
		activeEffects: { type: "array", default: [] },
		feats: { type: "array", default: [] },
	},
});

export class LinearModifier extends Modifier<Schema> {
	public readonly dataManager = FloatDataManager.create<Breakpoint>();

	static create(props: CreateProps): LinearModifier | null {
		if (!validateSchema(props.definition)) {
			Logger.error("Invalid modifier definition for UniqueModifier", {
				definition: props.definition,
				errors: validateSchema.errors,
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

	constructor(definition: Schema) {
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
}
