import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { namespace } from "@tme/shared/src/namespaceConfig.ts";
import type { Actor5e } from "@tme/shared/src/types/actor5e.ts";
import { ItemType } from "@tme/shared/src/types/item5e.ts";
import { Tooltip } from "../tooltip/Tooltip.ts";

const tooltip = new Tooltip();

export const registerTooltip = () => {
	Hooks.on(
		"renderActorSheetV2",
		(_sheet: unknown, html: HTMLElement, actor: Actor5e, _token: unknown) => {
			const magicItems = actor.items.filter((item) => {
				if (!item.flags[namespace.core.id]) return false;
				return item.flags[namespace.core.id].type === ItemType.MagicItem;
			});

			// TODO OPTIMIZE
			html.querySelectorAll(".item").forEach((_element: Element) => {
				const element = _element as HTMLElement;
				const uuid = element.dataset["uuid"];
				const data = magicItems.find((item) => item.uuid === uuid);

				if (!data) return;

				const tooltipElement = element.querySelector(
					".item-tooltip",
				) as HTMLElement;

				delete tooltipElement.dataset["tooltip"];
				delete tooltipElement.dataset["tooltip-class"];
				delete tooltipElement.dataset["tooltip-direction"];

				const abstract = AbstractItem.createFromDocument(data);
				if (!abstract) return;

				tooltipElement.addEventListener("mouseenter", (e: MouseEvent) =>
					tooltip.showNextTo(e, abstract),
				);

				tooltipElement.addEventListener("mouseleave", () => tooltip.hide());
			});
		},
	);
};
