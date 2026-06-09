import type { Actor5e } from "@tme/shared/src/types/actor5e.ts";

export const registerRarityBorderColors = () => {
	Hooks.on(
		"renderActorSheetV2",
		(_sheet: unknown, html: HTMLElement, actor: Actor5e, _token: unknown) => {
			html.querySelectorAll(".item").forEach((_element: Element) => {
				const element = _element as HTMLElement;
				const uuid = element.dataset["uuid"];

				const data = actor.items.find((item) => item.uuid === uuid);

				if (!data) {
					return;
				}

				const img = element.querySelector("img") as HTMLImageElement;

				switch (data.system.rarity) {
					case "common":
						img.style.borderColor = "#9d9d9d";
						break;
					case "uncommon":
						img.style.borderColor = "#4fc978";
						break;
					case "rare":
						img.style.borderColor = "#5b9de8";
						break;
					case "veryRare":
						img.style.borderColor = "#b88ce8";
						break;
					case "legendary":
						img.style.borderColor = "#ee7e3e";
						break;
					case "artifact":
						img.style.borderColor = "#d4a64a";
						break;
				}
			});
		},
	);
};
