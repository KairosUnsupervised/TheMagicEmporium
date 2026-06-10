import type {Actor5e} from "@tme/shared/src/types/actor5e.ts";
import type {GachaItem5e,} from "@tme/shared/src/types/GachaItem5e.ts";
import {GachaReveal} from "@tme/ui/src/components/gacha/GachaReveal.tsx";
import {gacha} from "@tme/ui/src/context/gacha/library/Gacha.ts";
import {createElement} from "react";
import {createRoot, type Root} from "react-dom/client";

const TAG = "tme-gacha-overlay";
const STYLESHEET = "modules/the-magic-emporium/index.css";

class TmeGachaOverlayElement extends HTMLElement {
	private readonly mountPoint: HTMLDivElement;

	constructor() {
		super();
		const shadow = this.attachShadow({mode: "open"});

		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = STYLESHEET;

		this.mountPoint = document.createElement("div");
		this.mountPoint.style.cssText =
			"position:absolute;inset:0;will-change:transform;transform:translateZ(0);";

		shadow.appendChild(link);
		shadow.appendChild(this.mountPoint);
	}

	getMountPoint(): HTMLDivElement {
		return this.mountPoint;
	}
}

if (customElements.get(TAG) === undefined) {
	customElements.define(TAG, TmeGachaOverlayElement);
}

export class GachaOverlay {
	private element: TmeGachaOverlayElement | null = null;
	private root: Root | null = null;

	public open = (
		actor: Actor5e,
		initial?: GachaItem5e,
	): void => {
		if (this.element !== null) {
			return;
		}

		this.element = document.createElement(TAG) as TmeGachaOverlayElement;
		this.element.style.cssText =
			"position:fixed;inset:0;z-index:9999;pointer-events:all;";

		document.body.appendChild(this.element);
		this.root = createRoot(this.element.getMountPoint());

		gacha.setOpen(actor, initial);

		this.root.render(createElement(GachaReveal, {onClosed: this.close}));
	};

	public close = (): void => {
		if (this.root !== null) {
			this.root.unmount();
			this.root = null;
		}
		if (this.element !== null) {
			this.element.remove();
			this.element = null;
		}
	};

	public isOpen = (): boolean => {
		return this.element !== null;
	};
}

export const gachaOverlay = new GachaOverlay();
