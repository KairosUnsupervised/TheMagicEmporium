import { merge } from "ts-deepmerge";
import { AbstractItem } from "./AbstractItem";
import { DeepPartial } from "@tme/shared/src/helpers/deepPartial.types";
import { equipmentDetails } from "./equipment/equipment.details";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { AppliedModifier } from "../modifiers/Modifier";
import { generateDescriptionV3 } from "./generateDescription";
import { Item5e, ItemType } from "@tme/shared/src/types/item5e";
import { Change } from "../effects/change/Change";
import { Activity } from "../effects/activity/Activity";

/**
 * Represent a magic item from the 5e system view
 */
export class Item {
	private readonly abstractItem: AbstractItem;

	private document: DeepPartial<Item5e> = {
		name: "Unset Item Name",
		system: {
			price: {
				value: 0,
				denomination: "gp",
			},
			description: {
				chat: "",
				value: "",
			},
			properties: ["mgc"],
			rarity: "common",
			attunement: 1,
			activities: {},
		},
	};

	public static create = (abstractItem: AbstractItem) => {
		return new Item(abstractItem);
	};

	constructor(abstractItem: AbstractItem) {
		this.abstractItem = abstractItem;

		this.addBase();
		this.addRarity();
		this.addName();
		this.addDescription();

		this.mergeItemChanges();
		// TODO Retroactive activity updates
		this.mergeItemActivities();
	}

	private addBase = () => {
		const details = equipmentDetails[this.abstractItem.base];

		this.merge({
			...details.foundry,
		});

		this.merge({
			img: `worlds/${game.world.id}/data/${namespace.core.id}/icons/${details.icon}`,
			system: {
				price: {
					value: this.abstractItem.currency + details.value,
				},
			},
		});
	};

	private addDescription = () => {
		// @ts-expect-error
		this.document.system.description.value = generateDescriptionV3(
			this.abstractItem,
		);
	};

	private addRarity = () => {
		this.merge({
			system: {
				rarity: this.abstractItem.rarity,
			},
		});
	};

	private addName = () => {
		this.merge({
			name: this.abstractItem.name,
		});
	};

	private mergeItemChanges = () => {
		const changes: Change[] = [
			...this.abstractItem.primary,
			...this.abstractItem.secondary,
			...this.abstractItem.tertiary,
		].flatMap(({ modifier, data }) => {
			return modifier.getItemChanges(data);
		});

		this.document = Change.applyAll(
			this.document,
			changes,
		) as typeof this.document;
	};

	private mergeItemActivities = () => {
		const baseActivities = (
			equipmentDetails[this.abstractItem.base].foundry.activities || []
		).map((schema) => {
			return new Activity(schema);
		});

		const activities: Activity[] = [
			...this.abstractItem.primary,
			...this.abstractItem.secondary,
			...this.abstractItem.tertiary,
		].flatMap(({ modifier, data }) => {
			return modifier.getItemActivities(data);
		});

		this.document.system!.activities = Activity.activitiesToRecord([
			...baseActivities,
			...activities,
		]);
	};

	public merge = (document: DeepPartial<Item5e>) => {
		this.document = merge.withOptions(
			{ mergeArrays: true },
			this.document,
			document,
		) as typeof this.document;
		return this;
	};

	public export = (folder?: string) => {
		return {
			...this.document,
			flags: {
				[namespace.core.id]: {
					type: ItemType.MagicItem,
					base: this.abstractItem.base,
					primary: this.exportModifiers(this.abstractItem.primary),
					secondary: this.exportModifiers(this.abstractItem.secondary),
					tertiary: this.exportModifiers(this.abstractItem.tertiary),
				},
			},
			folder,
		};
	};

	private exportModifiers = (mods: AppliedModifier[]) => {
		return mods.map(({ modifier, data }) => ({
			identifier: modifier.identifier,
			data,
		}));
	};
}
