import { ActiveEffect } from "../../effects/activeEffects/ActiveEffect";
import { Feat } from "../../effects/feats/Feat";
import { Icon } from "../../item/icon";
import { Logger } from "../../misc/Logger";
import {
	type UniqueBreakpoint,
	type UniqueSchema,
	validateUnique,
} from "../../schemas/modifiers/unique.schema";
import { FloatDataManager } from "../dataManagers/FloatDataManager";
import { type CreateProps, Modifier } from "../Modifier";
import type { Flavor } from "../modifier.schema";

/**
 * A Unique modifier bound to a player, e.g. multiple instances do not stack effects instead the highest effect is applied
 */
export class UniqueModifier extends Modifier<UniqueSchema> {
	public readonly dataManager = FloatDataManager.create<UniqueBreakpoint>();

	static create(props: CreateProps): UniqueModifier | null {
		if (!validateUnique(props.definition)) {
			Logger.error("Invalid modifier definition for UniqueModifier", {
				definition: props.definition,
				errors: validateUnique.errors,
			});
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
		this.dataManager.setBreakpoints(definition.breakpoints);
	}

	public override getDescription(data: unknown): Flavor {
		const breakpoint = this.dataManager.getBreakpoint(data);
		return breakpoint.flavor;
	}

	private getHighestBreakpoint = (data: unknown[]): UniqueBreakpoint => {
		return data
			.map((d) => this.dataManager.getBreakpoint(d))
			.sort((a, b) => b.min - a.min)[0];
	};

	public override getActiveEffects = (data: unknown[]): ActiveEffect[] => {
		const highest = this.getHighestBreakpoint(data);
		return ActiveEffect.createMultiple(
			highest.activeEffects,
			highest.flavor,
			Icon.Unique,
		);
	};

	public override getFeats = (data: unknown[]): Feat[] => {
		const highest = this.getHighestBreakpoint(data);
		return Feat.createMultiple(highest.feats, highest.flavor, Icon.Unique);
	};

	public override getBackground = (data: unknown): string | null => {
		return this.dataManager.getBreakpoint(data).flavor.background ?? null;
	};
}
