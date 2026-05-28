import type { ActiveEffect } from "../effects/activeEffects/ActiveEffect";
import type { Activity } from "../effects/activity/Activity";
import type { Change } from "../effects/change/Change";
import type { Feat } from "../effects/feats/Feat";
import { DataManager } from "./dataManagers/DataManager";
import type { Application, Flavor, ModifierType } from "./modifier.schema";

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
	data: unknown;
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

	public readonly dataManager: DataManager | null = DataManager.Disabled;

	protected constructor(definition: Schema) {
		this.identifier = definition.identifier;
		this.application = definition.application;
		this.schema = definition;
	}

	/**
	 * Retrieves a description for a slot on an item
	 * @param _data
	 */
	public abstract getDescription(_data: unknown): Flavor;

	/**
	 * Retrieves activeEffects for the actor
	 * @param _data Unverified data from multiple item documents e.g. [{float: 0.777}]
	 */
	public getActiveEffects = (_data: any[]): ActiveEffect[] => {
		return [];
	};

	/**
	 * Retrieves feats for the actor
	 * @param _data Unverified data from multiple item documents e.g. [{float: 0.777}]
	 */
	public getFeats = (_data: any[]): Feat[] => {
		return [];
	};

	/**
	 * Retrieves changes to be applied to the item document
	 * @param _data Unverified data from the item document e.g. {float: 0.777}
	 */
	public getItemChanges = (_data: unknown): Change[] => {
		return [];
	};

	/**
	 * Retrieves activities to be merged into the item document
	 * @param _data Unverified data from the item document e.g. {float: 0.777}
	 */
	public getItemActivities = (_data: unknown): Activity[] => {
		return [];
	};

	public getBackground = (_data: unknown): string | null => {
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
}
