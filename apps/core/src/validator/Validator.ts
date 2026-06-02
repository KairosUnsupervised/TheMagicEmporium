import type { ActiveEffect } from "@tme/library/src/effects/activeEffects/ActiveEffect.ts";
import type { Feat } from "@tme/library/src/effects/feats/Feat.ts";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Item } from "@tme/library/src/item/Item.ts";
import type { Modifier } from "@tme/library/src/modifiers/Modifier";
import { registry } from "@tme/library/src/registry/Registry.ts";
import { namespace } from "@tme/shared/src/namespaceConfig.ts";
import type { Actor5e, Effect5e } from "@tme/shared/src/types/actor5e.ts";
import {
	type BaseItem,
	type Item5e,
	ItemType,
	type SubItem,
} from "@tme/shared/src/types/item5e.ts";
import { Logger } from "../misc/Logger.ts";

interface QuickAccess {
	item5e: Item5e<BaseItem>;
	abstract: AbstractItem;
}

interface ModifiersMapped {
	[key: string]: {
		modifier: Modifier;
		data: unknown[];
	};
}

export class Validator {
	public validate = async (actor: Actor5e) => {
		const magicItems = this.getActiveMagicItems(actor);
		const modifiers = this.getAllModifiers(magicItems);

		await this.synchronizeDescriptions(magicItems);

		await this.synchronizeFeats(this.getAllFeats(modifiers), actor);
		await this.synchronizeEffects(this.getAllActiveEffects(modifiers), actor);
	};

	/**
	 * Check descriptions of base items and update if necessarry
	 * @param items
	 */
	private synchronizeDescriptions = async (items: QuickAccess[]) => {
		const sync = items.map((item) => {
			const newDocument = new Item(item.abstract).export();

			if (
				item.item5e.system.description.value ===
				newDocument.system?.description?.value
			) {
				return null;
			}

			return item.item5e.update({
				system: {
					description: {
						value: newDocument.system?.description?.value,
					},
				},
			});
		});
		await Promise.all(sync);
	};

	/**
	 * Retrieve all active base magic items from an actor
	 * @param actor
	 */
	private getActiveMagicItems = (actor: Actor5e): QuickAccess[] => {
		return actor.items
			.map((item: Item5e) => {
				if (!item.system.attuned) {
					return null;
				}
				if (!item.system.equipped) {
					return null;
				}
				return {
					abstract: AbstractItem.createFromDocument(item),
					item5e: item,
				};
			})
			.filter((item) => {
				return item !== null && item.abstract !== null;
			}) as QuickAccess[];
	};

	/**
	 * Get all modifiers with each of their respective data in an array
	 * @param items
	 */
	private getAllModifiers = (items: QuickAccess[]): ModifiersMapped => {
		const modifierMap: ModifiersMapped = {};

		items.forEach((item) => {
			const all = [
				...item.abstract.primary,
				...item.abstract.secondary,
				...item.abstract.tertiary,
			];
			all.forEach((item) => {
				const identifier = item.modifier.identifier;
				const modifier = registry.get(identifier);

				if (!modifier) {
					Logger.error(`Could not find modifier ${identifier} in registry`);
					return;
				}

				if (!modifierMap[identifier]) {
					modifierMap[identifier] = { modifier, data: [] };
				}
				modifierMap[identifier].data.push(item.data || null);
			});
		});

		return modifierMap;
	};

	private getAllFeats = (modifiersMapped: ModifiersMapped): Feat[] => {
		return Object.values(modifiersMapped).flatMap(({ modifier, data }) =>
			modifier.getFeats(data),
		);
	};

	private getAllActiveEffects = (
		modifiersMapped: ModifiersMapped,
	): ActiveEffect[] => {
		return Object.values(modifiersMapped).flatMap(({ modifier, data }) =>
			modifier.getActiveEffects(data),
		);
	};

	private getMagicFeats = (actor: Actor5e): Item5e<SubItem>[] => {
		return actor.items.filter((item: Item5e) => {
			if (!item.flags[namespace.core.id]) {
				return false;
			}

			if (item.flags[namespace.core.id].type === ItemType.TemporaryItem) {
				return true;
			}

			return false;
		}) as Item5e<SubItem>[];
	};

	private synchronizeFeats = async (feats: Feat[], actor: Actor5e) => {
		let remaining = this.getMagicFeats(actor);

		const creation = feats.map((feat, index) => {
			const id =
				feat.document.name + index + feat.document.system.description?.value;

			/**
			 * If the feat exists, remove it from the remaining array
			 */
			const exists = remaining.find((item) => {
				return item.flags[namespace.core.id].id === id;
			});

			if (exists) {
				remaining = remaining.filter((item) => {
					return item.flags[namespace.core.id].id !== id;
				});
				return null;
			}

			Logger.log("Creating SubItem", {
				id,
			});

			return actor.createEmbeddedDocuments("Item", [
				{
					...feat.export(),
					flags: {
						[namespace.core.id]: {
							type: ItemType.TemporaryItem,
							id,
						},
					},
				},
			]);
		});
		await Promise.all(creation);

		/**
		 * Remove remaining feats
		 */
		for (const item of remaining) {
			Logger.log("Removing feat", { item });
			await actor.deleteEmbeddedDocuments("Item", [item.id]);
		}
	};

	/**
	 * Get all existing active effects of an actor related to this module
	 * @param actor
	 */
	private getExistingActiveEffects = (actor: Actor5e) => {
		return actor.effects.filter((effect: Effect5e) => {
			if (!effect.flags[namespace.core.id]) {
				return false;
			}

			if (effect.flags[namespace.core.id]?.type === ItemType.TemporaryItem) {
				return true;
			}

			return false;
		});
	};

	/**
	 * Sync the wantActiveEffects with the existing activeEffects of the actor
	 * @param wantActiveEffects
	 * @param actor
	 */
	private synchronizeEffects = async (
		wantActiveEffects: ActiveEffect[],
		actor: Actor5e,
	) => {
		let remaining = this.getExistingActiveEffects(actor);

		const creation = wantActiveEffects.map((effect, index) => {
			const id = effect.document.name + index + effect.document.description;

			/**
			 * If the effect exists, remove it from the remaining array
			 */
			const exists = remaining.find((effect) => {
				return effect.flags[namespace.core.id]?.id === id;
			});

			if (exists) {
				remaining = remaining.filter((effect) => {
					return effect.flags[namespace.core.id]?.id !== id;
				});
				return null;
			}

			/**
			 * Otherwise create a new activeEffect
			 */
			Logger.log("Creating ActiveEffect", {
				id,
			});

			return actor.createEmbeddedDocuments("ActiveEffect", [effect.export(id)]);
		});
		await Promise.all(creation);

		/**
		 * Remove remaining effects
		 */
		for (const item of remaining) {
			Logger.log("Removing effect", { item });

			await actor.deleteEmbeddedDocuments("ActiveEffect", [item.id]);
		}
	};
}
