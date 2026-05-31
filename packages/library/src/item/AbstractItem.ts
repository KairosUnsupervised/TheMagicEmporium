import { namespace } from "@tme/shared/src/namespaceConfig";
import { type Item5e, ItemType } from "@tme/shared/src/types/item5e";
import type { AppliedModifier } from "../modifiers/Modifier";
import { registry } from "../registry/Registry";
import { Equipment } from "./equipment/equipment.types";
import { Rarity } from "./item.types";

/**
 * Represents an abstracted magic item, no fluff
 */
export class AbstractItem {
	public name = "Empty Abstraction Item Name";

	public rarity: Rarity = Rarity.Common;
	public base: Equipment = Equipment.Relic;

	public currency = 0;

	public backgroundOverride: string | null = null;
	public backgroundEligible = false;

	public primary: AppliedModifier[] = [];
	public secondary: AppliedModifier[] = [];
	public tertiary: AppliedModifier[] = [];

	/**
	 * Creates an abstract item from a foundry item document
	 * @param document
	 */
	public static createFromDocument = (document: any): null | AbstractItem => {
		const data = document.flags[
			namespace.core.id
		] as Item5e["flags"][typeof namespace.core.id];

		if (!data) {
			return null;
		}

		if (data.type !== ItemType.MagicItem) {
			return null;
		}

		const item = new AbstractItem();
		item.base = data.base as Equipment;
		item.name = document.name;
		item.backgroundOverride = data.backgroundOverride;
		item.backgroundEligible = data.backgroundEligible;

		if (document.system.price.denomination === "gp") {
			item.currency = document.system.price.value;
		}

		data.primary.forEach((rawMod) => {
			const modifier = registry.get(rawMod.identifier);
			if (!modifier) return;
			item.primary.push({ modifier, data: rawMod.data ?? null });
		});

		data.secondary.forEach((rawMod) => {
			const modifier = registry.get(rawMod.identifier);
			if (!modifier) return;
			item.secondary.push({ modifier, data: rawMod.data ?? null });
		});

		data.tertiary.forEach((rawMod) => {
			const modifier = registry.get(rawMod.identifier);
			if (!modifier) return;
			item.tertiary.push({ modifier, data: rawMod.data ?? null });
		});

		return item;
	};

	public getBackground = (): string | null => {
		if (this.backgroundOverride) {
			return this.backgroundOverride;
		}
		if (!this.backgroundEligible) {
			return null;
		}
		const background = (() => {for (const applied of [
			...this.primary,
			...this.secondary,
			...this.tertiary,
		].reverse()) {
			const backgroundOverride = applied.modifier.getBackground(applied.data);
			if (backgroundOverride) {
				return backgroundOverride;
			}
			return null;
		}})()

		if(background){
			return background.replaceAll("%BACKGROUNDS%", `worlds/${game.world.id}/data/${namespace.core.id}/backgrounds`)
		}
		return null;
	};
}
