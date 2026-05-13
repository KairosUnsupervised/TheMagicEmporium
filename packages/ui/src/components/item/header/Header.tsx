import { Rarity } from "@tme/library/src/item/item.types";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";

export interface HeaderProps {
	name: string;
	rarity: Rarity;
	base: Equipment;
	currency: number;
}

const RARITY_COLOR: Record<Rarity, string> = {
	[Rarity.Common]:    "#9d9d9d",
	[Rarity.Uncommon]:  "#4fc978",
	[Rarity.Rare]:      "#5b9de8",
	[Rarity.VeryRare]:  "#b88ce8",
	[Rarity.Legendary]: "#ee7e3e",
};

const RARITY_SHADOW: Record<Rarity, string> = {
	[Rarity.Common]:    "rgba(157,157,157,.4)",
	[Rarity.Uncommon]:  "rgba(79,201,120,.4)",
	[Rarity.Rare]:      "rgba(91,157,232,.4)",
	[Rarity.VeryRare]:  "rgba(184,140,232,.4)",
	[Rarity.Legendary]: "rgba(238,126,62,.4)",
};

const toDisplayName = (value: string) =>
	value.split("_").map(w => w[0] + w.slice(1).toLowerCase()).join(" ");

const formatCurrency = (gp: number) =>
	gp.toLocaleString("en-US") + " gp";

export const Header = (props: HeaderProps) => {
	const color = RARITY_COLOR[props.rarity];
	const shadow = RARITY_SHADOW[props.rarity];

	return (
		<div style="text-align:center;padding:4px 0 8px;">
			<div style={`font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.38em;color:${color};text-shadow:0 0 10px ${shadow};margin-bottom:8px;`}>
				{toDisplayName(props.rarity)}
			</div>
			<div style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:30px;line-height:1.05;color:#ece4cf;margin:0 0 10px;text-shadow:0 0 18px rgba(243,220,160,.22);">
				{props.name}
			</div>
			<div style="display:inline-flex;align-items:center;gap:10px;">
				<span style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.3em;color:#8a7a5a;">
					{toDisplayName(props.base)}
				</span>
				<svg width="4" height="4" viewBox="0 0 4 4">
					<circle cx="2" cy="2" r="2" fill="#5a4e32" />
				</svg>
				<span style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.3em;color:#8a7a5a;">
					{formatCurrency(props.currency)}
				</span>
			</div>
		</div>
	);
};
