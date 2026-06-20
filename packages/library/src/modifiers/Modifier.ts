import type {ActiveEffect} from "../effects/activeEffects/ActiveEffect";
import type {Activity} from "../effects/activity/Activity";
import type {Change} from "../effects/change/Change";
import type {Feat} from "../effects/feats/Feat";
import type {Application, Flavor, ModifierType} from "./modifier.schema";
import {FloatManager} from "./manager/FloatManager";

export type ModifierFactory = (props: CreateProps) => Modifier | null;

export interface CreateProps {
	definition: unknown;
	enabled: boolean;
}

export interface BaseSchema {
	identifier: string;
	type: ModifierType;
	application: Application;
}

export interface AppliedModifier {
	modifier: Modifier;
	float: number;
}

export abstract class Modifier<Schema extends BaseSchema = BaseSchema> {
	/**
	 * Unique identifier under which this modifier gets saved <br>
	 * Use SOURCE.SCREAMING_SNAKE_CASE_NAME naming convention
	 */
	public readonly identifier: string;

	/**
	 * Configure when this modifier can be applied to an item <br/>
	 * See {@link Application} for more information
	 */
	public readonly application: Application;

	public readonly schema: Schema;

	public abstract readonly float: FloatManager<any>;

	protected constructor(definition: Schema) {
		this.identifier = definition.identifier;
		this.application = definition.application;
		this.schema = definition;
	}

	/**
	 * Retrieves a description for a slot on an item
	 */
	public abstract getDescription(_float: number): Flavor;

	/**
	 * Retrieves activeEffects for the actor
	 */
	public getActiveEffects = (_floats: number[]): ActiveEffect[] => {
		return [];
	};

	/**
	 * Retrieves feats for the actor
	 */
	public getFeats = (_floats: number[]): Feat[] => {
		return [];
	};

	/**
	 * Retrieves changes to be applied to the item document
	 */
	public getItemChanges = (_float: number): Change[] => {
		return [];
	};

	/**
	 * Retrieves activities to be merged into the item document
	 */
	public getItemActivities = (_float: number): Activity[] => {
		return [];
	};

	public getBackground = (_float: number): string | null => {
		return null;
	};

	/**
	 * Replaces every {key} placeholder with the matching value
	 */
	protected replaceKeyWords = <T>(
		target: T,
		replacements: Record<string, string>,
	): T => {
		let json = JSON.stringify(target);
		for (const [key, value] of Object.entries(replacements)) {
			json = json.replaceAll(`{${key}}`, value);
		}
		return JSON.parse(json);
	};

	public abstract isHighestPossibleBreakpoint: (_float: number) => boolean;

	public abstract getBreakpointIndex: (_float: number) => number;
}
