import { Item5e } from "@tme/shared/src/types/item5e.ts";
import { namespace } from "@tme/shared/src/namespaceConfig.ts";
import { gachaOverlay } from "../gacha/GachaOverlay.ts";

interface Option {
	icon: string;
	name: string;
	element?: HTMLDivElement;
	condition: () => boolean;
	callback: () => void;
	group?: string;
}

export const registerGacha = () => {
	Hooks.on("dnd5e.getItemContextOptions", (item: Item5e, options: Option[]) => {
		options.splice(options.length - 1, 0, {
			icon: '<i class="fa-solid fa-envelope"> </i>',
			name: "Open Envelope",
			// CORE ID since we want every option grouped together
			group: namespace.core.id,
			condition: () => {
				return item.isOwner;
			},
			callback: () => {
				gachaOverlay.open([item]);
			},
		});
	});
};
