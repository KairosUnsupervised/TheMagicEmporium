import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import styles from "./ItemDisplay.module.css";
import { Header } from "./item/header/Header";
import { Section } from "./item/section/Section";

export interface ItemDisplayProps {
	item: AbstractItem;
}

const Defs = () => (
	<svg width="0" height="0" style="position:absolute;overflow:hidden;">
		<defs>
			<pattern
				id="tme-hex-lat"
				width="36"
				height="32"
				patternUnits="userSpaceOnUse"
			>
				<polygon
					points="18,2 34,16 18,30 2,16"
					fill="none"
					stroke="#d4a64a"
					strokeWidth="0.5"
				/>
			</pattern>
		</defs>
	</svg>
);

interface CornerProps {
	rotation: number;
	class: string;
}

const Corner = (props: CornerProps) => (
	<svg
		width="72"
		height="72"
		viewBox="0 0 64 64"
		class={`${styles.corner} ${props.class}`}
		style={{ "--rotation": `${props.rotation}deg` } as never}
	>
		<path
			d="M2 26 L2 2 L26 2"
			stroke="#d4a64a"
			fill="none"
			strokeWidth="1.3"
			strokeLinecap="round"
		/>
		<path
			d="M7 19 L7 7 L19 7"
			stroke="#d4a64a"
			fill="none"
			strokeWidth="0.7"
			opacity="0.6"
		/>
		<path
			d="M2 38 Q 8 36 12 30 Q 14 26 20 24 L 28 22"
			stroke="#d4a64a"
			fill="none"
			strokeWidth="0.9"
			opacity="0.7"
		/>
		<path
			d="M38 2 Q 36 8 30 12 Q 26 14 24 20 L 22 28"
			stroke="#d4a64a"
			fill="none"
			strokeWidth="0.9"
			opacity="0.7"
		/>
		<circle
			cx="2"
			cy="2"
			r="2"
			fill="none"
			stroke="#f3dca0"
			strokeWidth="0.7"
		/>
		<circle cx="2" cy="2" r="0.8" fill="#f3dca0" />
		<circle
			cx="13"
			cy="13"
			r="1.6"
			fill="none"
			stroke="#d4a64a"
			strokeWidth="0.6"
		/>
		<polygon points="22,2 24,4 22,6 20,4" fill="#d4a64a" opacity="0.9" />
		<polygon points="2,22 4,20 6,22 4,24" fill="#d4a64a" opacity="0.9" />
	</svg>
);

export const ItemDisplay = (props: ItemDisplayProps) => (
	<div>
		<Defs />
		<div class={styles.frame}>
			<svg class={styles.lattice} preserveAspectRatio="xMidYMid slice">
				<rect width="100%" height="100%" fill="url(#tme-hex-lat)" />
			</svg>
			<div class={styles.card}>
				<Corner rotation={0} class={styles.cornerTL} />
				<Corner rotation={90} class={styles.cornerTR} />
				<Corner rotation={180} class={styles.cornerBR} />
				<Corner rotation={270} class={styles.cornerBL} />
				<Header
					name={props.item.name}
					rarity={props.item.rarity}
					base={props.item.base}
					currency={props.item.currency}
				/>
				<Section title="PRIMARY" modifiers={props.item.primary} />
				<Section title="SECONDARY" modifiers={props.item.secondary} />
				<Section title="TERTIARY" modifiers={props.item.tertiary} />
			</div>
		</div>
	</div>
);
