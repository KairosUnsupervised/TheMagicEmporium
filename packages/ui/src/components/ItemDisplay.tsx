import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Header } from "./item/header/Header";
import { Section } from "./item/section/Section";

export interface ItemDisplayProps {
	item: AbstractItem;
}

const Defs = () => (
	<svg width="0" height="0" style="position:absolute;overflow:hidden;">
		<defs>
			<linearGradient id="tme-gold-diag" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stopColor="#f3dca0" />
				<stop offset="45%" stopColor="#d4a64a" />
				<stop offset="100%" stopColor="#7a5a20" />
			</linearGradient>
			<pattern id="tme-hex-lat" width="36" height="32" patternUnits="userSpaceOnUse">
				<polygon points="18,2 34,16 18,30 2,16" fill="none" stroke="#d4a64a" strokeWidth="0.5" />
			</pattern>
		</defs>
	</svg>
);

interface CornerProps {
	rotation: number;
}

const Corner = (props: CornerProps) => (
	<svg
		width="72"
		height="72"
		viewBox="0 0 64 64"
		style={`display:block;overflow:visible;transform:rotate(${props.rotation}deg);`}
	>
		<path d="M2 26 L2 2 L26 2" stroke="url(#tme-gold-diag)" fill="none" strokeWidth="1.3" strokeLinecap="round" />
		<path d="M7 19 L7 7 L19 7" stroke="url(#tme-gold-diag)" fill="none" strokeWidth="0.7" opacity="0.6" />
		<path d="M2 38 Q 8 36 12 30 Q 14 26 20 24 L 28 22" stroke="url(#tme-gold-diag)" fill="none" strokeWidth="0.9" opacity="0.7" />
		<path d="M38 2 Q 36 8 30 12 Q 26 14 24 20 L 22 28" stroke="url(#tme-gold-diag)" fill="none" strokeWidth="0.9" opacity="0.7" />
		<circle cx="2" cy="2" r="2" fill="none" stroke="#f3dca0" strokeWidth="0.7" />
		<circle cx="2" cy="2" r="0.8" fill="#f3dca0" />
		<circle cx="13" cy="13" r="1.6" fill="none" stroke="#d4a64a" strokeWidth="0.6" />
		<polygon points="22,2 24,4 22,6 20,4" fill="#d4a64a" opacity="0.9" />
		<polygon points="2,22 4,20 6,22 4,24" fill="#d4a64a" opacity="0.9" />
	</svg>
);

export const ItemDisplay = (props: ItemDisplayProps) => (
	<div>
		<Defs />
		<div style="position:relative;width:516px;padding:32px 28px;box-sizing:border-box;background:radial-gradient(120% 60% at 50% -10%,rgba(212,166,74,.10) 0%,transparent 60%),radial-gradient(80% 50% at 50% 120%,rgba(93,140,232,.06) 0%,transparent 65%),linear-gradient(180deg,#0e1124 0%,#07091a 100%);overflow:hidden;">
			<svg
				style="position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;opacity:0.06;pointer-events:none;"
				preserveAspectRatio="xMidYMid slice"
			>
				<rect width="100%" height="100%" fill="url(#tme-hex-lat)" />
			</svg>
			<div style="position:relative;width:460px;box-sizing:border-box;padding:28px;background:linear-gradient(180deg,#0e1124 0%,#07091a 100%);border-radius:4px;box-shadow:inset 0 0 0 1px rgba(212,166,74,.35),inset 0 0 60px rgba(212,166,74,.06),0 30px 80px rgba(0,0,0,.55),0 0 0 1px rgba(0,0,0,.5);">
				<div style="position:absolute;top:-4px;left:-4px;"><Corner rotation={0} /></div>
				<div style="position:absolute;top:-4px;right:-4px;"><Corner rotation={90} /></div>
				<div style="position:absolute;bottom:-4px;right:-4px;"><Corner rotation={180} /></div>
				<div style="position:absolute;bottom:-4px;left:-4px;"><Corner rotation={270} /></div>
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
