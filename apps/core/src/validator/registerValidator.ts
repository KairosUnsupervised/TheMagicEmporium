import type { DeepPartial } from "@tme/shared/src/helpers/deepPartial.types.ts";
import type { Item5e } from "@tme/shared/src/types/item5e.ts";
import { Logger } from "../misc/Logger.ts";
import { Validator } from "./Validator.ts";

const validator = new Validator();

export const registerValidator = () => {
	window.Hooks.on(
		"updateItem",
		(
			item: Item5e,
			update: DeepPartial<Item5e>,
			_context: any,
			userId: string,
		) => {
			if (userId !== game.userId) {
				Logger.log("updateItem hook: userId and game user do not match", {
					hookUserId: userId,
					gameUserId: game.userId,
				});
				return;
			}
			if (
				!update.system ||
				!("attuned" in update.system || "equipped" in update.system)
			) {
				Logger.log(
					"updateItem hook: attuned or equipped state was not updated",
				);
				return;
			}

			validator.validate(item.actor);
		},
	);
};
