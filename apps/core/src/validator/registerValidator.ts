import type { DeepPartial } from "@tme/shared/src/helpers/deepPartial.types.ts";
import { namespace } from "@tme/shared/src/namespaceConfig.ts";
import type { Item5e } from "@tme/shared/src/types/item5e.ts";
import { ItemType } from "@tme/shared/src/types/item5e.ts";
import { Validator } from "./Validator.ts";

const validator = new Validator();

const isMagicItem = (item: Item5e): boolean => {
	return item.flags[namespace.core.id]?.type === ItemType.MagicItem;
};

export const registerValidator = () => {
	Hooks.on(
		"updateItem",
		(
			item: Item5e,
			update: DeepPartial<Item5e>,
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

			void validator.validate(item.actor);
		},
	);

	Hooks.on("createItem", (item: Item5e, _options: unknown, userId: string) => {
		if (userId !== game.userId) {
			return;
		}
		if (!isMagicItem(item)) {
			return;
		}
		if(!item.actor){
			return;
		}

		void validator.validate(item.actor);
	});

	Hooks.on("deleteItem", (item: Item5e, _options: unknown, userId: string) => {
		if (userId !== game.userId) {
			return;
		}
		if (!isMagicItem(item)) {
			return;
		}
		if(!item.actor){
			return;
		}

		void validator.validate(item.actor);
	});
};
