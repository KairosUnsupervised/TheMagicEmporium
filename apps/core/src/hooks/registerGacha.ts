import {namespace} from "@tme/shared/src/namespaceConfig.ts";
import {gachaOverlay} from "../gacha/GachaOverlay.ts";
import {GachaItem5e, GachaItemType} from "@tme/shared/src/types/GachaItem5e.ts";

interface Option {
	icon: string;
	name: string;
	element?: HTMLDivElement;
	condition: () => boolean;
	callback: () => void;
	group?: string;
}

export const registerGacha = () => {
	Hooks.on("dnd5e.getItemContextOptions", (item: GachaItem5e, options: Option[]) => {
		options.splice(options.length - 1, 0, {
			icon: '<i class="fa-solid fa-envelope"> </i>',
			name: "Open Envelope",
			// CORE ID since we want every option grouped together
			group: namespace.core.id,
			condition: () => {
				if (!item.isOwner) {
					return false;
				}
				return item.flags[namespace.gacha.id]?.type === GachaItemType.Envelope;
			},
			callback: () => {
				gachaOverlay.open([item]);
			},
		});

		options.splice(options.length - 1, 0, {
			icon: '<i class="fa-solid fa-star"> </i>',
			name: "Cast Your Wish",
			// CORE ID since we want every option grouped together
			group: namespace.core.id,
			condition: () => {
				if (!item.isOwner) {
					return false;
				}
				return item.flags[namespace.gacha.id]?.type === GachaItemType.Wish;
			},
			callback: () => {
				gachaOverlay.open([item]);
			},
		});
	});


};
