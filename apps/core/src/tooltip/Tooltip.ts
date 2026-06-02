import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { ItemDisplay } from "@tme/ui/src/components/item/ItemDisplay.tsx";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import styles from "./Tooltip.module.css";

const GAP = 20;
const TOOLTIP_WIDTH = 516;

export class Tooltip {
	private pinned: boolean = false;
	private shown: boolean = false;
	private mouseOver: boolean = false;
	private showTimer: ReturnType<typeof setTimeout> | null = null;
	private scrollTimer: ReturnType<typeof setTimeout> | null = null;
	private currentTop: number = 0;
	private currentScale: number = 1;
	private readonly container: HTMLDivElement;
	private readonly contentDiv: HTMLDivElement;
	private root: Root | null = null;

	constructor() {
		this.container = document.createElement("div");
		this.container.className = styles["container"];

		this.contentDiv = document.createElement("div");
		this.contentDiv.className = styles["content"];
		this.container.appendChild(this.contentDiv);

		document.body.appendChild(this.container);

		this.container.addEventListener("mouseenter", () => {
			this.mouseOver = true;
		});

		this.container.addEventListener("mouseleave", () => {
			this.mouseOver = false;
		});

		document.addEventListener(
			"wheel",
			(e: WheelEvent) => {
				if (!this.shown || !this.mouseOver) return;
				e.preventDefault();
				if (e.ctrlKey) {
					this.currentScale = Math.min(
						2,
						Math.max(0.5, this.currentScale - e.deltaY * 0.001),
					);
					this.container.style.transform = `scale(${this.currentScale})`;
					return;
				}
				this.container.classList.add(styles["scrolling"]);
				if (this.scrollTimer) clearTimeout(this.scrollTimer);
				this.scrollTimer = setTimeout(() => {
					this.container.classList.remove(styles["scrolling"]);
					this.scrollTimer = null;
				}, 150);
				this.currentTop -= e.deltaY / 2;
				this.container.style.top = `${this.currentTop}px`;
			},
			{ passive: false },
		);

		document.addEventListener("mousedown", (e: MouseEvent) => {
			if (e.button === 1 && this.shown && !this.pinned) {
				e.preventDefault();
				this.pin();
				return;
			}
			if (this.pinned) {
				const rect = this.contentDiv.getBoundingClientRect();
				const inside =
					e.clientX >= rect.left &&
					e.clientX <= rect.right &&
					e.clientY >= rect.top &&
					e.clientY <= rect.bottom;
				if (!inside) this.unpin();
			}
		});

		document.addEventListener("keydown", (e: KeyboardEvent) => {
			if (this.pinned && e.key === "Escape") {
				this.unpin();
			}
		});
	}

	public movePosition = (top: number, left: number): void => {
		if (this.pinned) return;
		const x =
			left + GAP + TOOLTIP_WIDTH <= window.innerWidth
				? left + GAP
				: left - TOOLTIP_WIDTH - GAP;

		this.currentTop = top;
		this.container.style.left = `${Math.max(0, x)}px`;
		this.container.style.top = `${this.currentTop}px`;
	};

	public show = (): void => {
		this.shown = true;
		this.container.style.opacity = "1";
		this.container.style.visibility = "visible";
	};

	public hide = (): void => {
		if (this.showTimer) {
			clearTimeout(this.showTimer);
			this.showTimer = null;
		}
		if (this.pinned) return;
		this.shown = false;
		this.container.style.opacity = "0";
		this.container.style.visibility = "hidden";
	};

	public setContent = (item: AbstractItem): void => {
		if (!this.root) {
			this.root = createRoot(this.contentDiv);
		}
		this.root.render(createElement(ItemDisplay, { item }));
	};

	public showNextTo = (e: MouseEvent, item: AbstractItem): void => {
		if (this.showTimer) clearTimeout(this.showTimer);
		this.showTimer = setTimeout(() => {
			this.setContent(item);
			const height = this.contentDiv.getBoundingClientRect().height;
			this.movePosition(e.clientY - height / 2, e.clientX);
			this.show();
			this.showTimer = null;
		}, 500);
	};

	public pin = (): void => {
		if (!this.shown) return;
		this.pinned = true;
		this.contentDiv.style.pointerEvents = "auto";
		this.contentDiv.style.outline = "1px solid rgba(212,166,74,.5)";
	};

	public unpin = (): void => {
		this.pinned = false;
		this.shown = false;
		this.contentDiv.style.pointerEvents = "none";
		this.contentDiv.style.outline = "none";
		this.container.style.opacity = "0";
		this.container.style.visibility = "hidden";
	};
}
