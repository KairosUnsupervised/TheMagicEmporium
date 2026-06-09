import { GachaReveal } from "@tme/ui/src/components/gacha/GachaReveal.tsx";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import {gacha} from "@tme/ui/src/context/gacha/library/Gacha.ts";

export class GachaOverlay {
	private container: HTMLDivElement | null = null;
	private root: Root | null = null;

	public open = (wishes: unknown[]): void => {
		if (this.container !== null) {
			return;
		}

		this.container = document.createElement("div");
		this.container.id = "tme-gacha-overlay";
		this.container.style.cssText =
			"position:fixed;inset:0;z-index:9999;pointer-events:all;";

		document.body.appendChild(this.container);
		this.root = createRoot(this.container);

		gacha.setOpen()

		this.root.render(
			createElement(GachaReveal, { wishes, onClosed: this.close }),
		);
	};

	public close = (): void => {
		if (this.root !== null) {
			this.root.unmount();
			this.root = null;
		}
		if (this.container !== null) {
			this.container.remove();
			this.container = null;
		}
	};
}

export const gachaOverlay = new GachaOverlay();
