import { GachaReveal } from "@tme/ui/src/components/gacha/GachaReveal.tsx";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { gacha } from "@tme/ui/src/context/gacha/library/Gacha.ts";

const TAG = "tme-gacha-overlay";

class TmeGachaOverlayElement extends HTMLElement {
	private readonly mountPoint: HTMLDivElement;
	private observer: MutationObserver | null = null;
	private readonly mirrored = new WeakSet<Node>();

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		this.mountPoint = document.createElement("div");
		this.mountPoint.style.cssText = "position:absolute;inset:0;";
		shadow.appendChild(this.mountPoint);
	}

	connectedCallback(): void {
		// Mirror styles already in <head> then watch for new ones injected by Vite.
		// Only inline <style> tags are copied — <link> stylesheet tags (FoundryVTT)
		// stay outside the shadow boundary.
		this.mirrorStyles();
		this.observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeName === "STYLE") {
						this.adoptStyleNode(node);
					}
				});
			}
		});
		this.observer.observe(document.head, { childList: true });
	}

	disconnectedCallback(): void {
		this.observer?.disconnect();
		this.observer = null;
	}

	private mirrorStyles(): void {
		document.head
			.querySelectorAll("style")
			.forEach((node) => this.adoptStyleNode(node));
	}

	private adoptStyleNode(node: Node): void {
		if (this.mirrored.has(node)) {
			return;
		}
		this.mirrored.add(node);
		this.shadowRoot!.insertBefore(node.cloneNode(true), this.mountPoint);
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

	public open = (wishes: unknown[]): void => {
		if (this.element !== null) {
			return;
		}

		this.element = document.createElement(TAG) as TmeGachaOverlayElement;
		this.element.style.cssText =
			"position:fixed;inset:0;z-index:9999;pointer-events:all;";

		document.body.appendChild(this.element);
		this.root = createRoot(this.element.getMountPoint());

		gacha.setOpen();

		this.root.render(createElement(GachaReveal, { wishes, onClosed: this.close }));
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
