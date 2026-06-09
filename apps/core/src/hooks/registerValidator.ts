import type { DeepPartial } from "@tme/shared/src/helpers/deepPartial.types.ts";
import { namespace } from "@tme/shared/src/namespaceConfig.ts";
import type { Actor5e } from "@tme/shared/src/types/actor5e.ts";
import type { Item5e } from "@tme/shared/src/types/item5e.ts";
import { ItemType } from "@tme/shared/src/types/item5e.ts";
import { Validator } from "../validator/Validator.ts";

const validator = new Validator();

const isMagicItem = (item: Item5e): boolean => {
	return item.flags[namespace.core.id]?.type === ItemType.MagicItem;
};

const debounceTimers = new WeakMap<Actor5e, ReturnType<typeof setTimeout>>();

const scheduleValidation = (actor: Actor5e): void => {
	const existing = debounceTimers.get(actor);
	if (existing) {
		clearTimeout(existing);
	}
	debounceTimers.set(
		actor,
		setTimeout(() => {
			debounceTimers.delete(actor);
			void validator.validate(actor);
		}, 50),
	);
};

export const registerValidator = () => {
	Hooks.on(
		"updateItem",
		(
			item: Item5e,
			update: DeepPartial<Item5e>,
			// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT
			_context: any,
			userId: string,
		) => {
			if (userId !== game.userId) {
				return;
			}
			if (
				!update.system ||
				!("attuned" in update.system || "equipped" in update.system)
			) {
				return;
			}

			console.log("VALIDATION - UPDATE ITEM")
			scheduleValidation(item.actor);
		},
	);

	Hooks.on("createItem", (item: Item5e, _options: unknown, userId: string) => {
		if (userId !== game.userId) {
			return;
		}
		if (!isMagicItem(item)) {
			return;
		}
		if (!item.actor) {
			return;
		}

		console.log("VALIDATION - CREATE ITEM")
		scheduleValidation(item.actor);
	});

	Hooks.on("deleteItem", (item: Item5e, _options: unknown, userId: string) => {
		if (userId !== game.userId) {
			return;
		}
		if (!isMagicItem(item)) {
			return;
		}
		if (!item.actor) {
			return;
		}

		console.log("VALIDATION - DELETE ITEM")
		scheduleValidation(item.actor);
	});
};
