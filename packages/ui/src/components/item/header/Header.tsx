import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import type { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { useMemo } from "react";
import styles from "./Header.module.css";

export interface HeaderProps {
	name: string;
	rarity: Rarity;
	base: Equipment;
	currency: number;
}

const RARITY_COLOR: Record<Rarity, string> = {
	[Rarity.Common]: "#9d9d9d",
	[Rarity.Uncommon]: "#4fc978",
	[Rarity.Rare]: "#5b9de8",
	[Rarity.VeryRare]: "#b88ce8",
	[Rarity.Legendary]: "#ee7e3e",
};

const RARITY_SHADOW: Record<Rarity, string> = {
	[Rarity.Common]: "rgba(157,157,157,.4)",
	[Rarity.Uncommon]: "rgba(79,201,120,.4)",
	[Rarity.Rare]: "rgba(91,157,232,.4)",
	[Rarity.VeryRare]: "rgba(184,140,232,.4)",
	[Rarity.Legendary]: "rgba(238,126,62,.4)",
};

const RARITY_LABEL: Record<Rarity, string> = {
	[Rarity.Common]: "Common",
	[Rarity.Uncommon]: "Uncommon",
	[Rarity.Rare]: "Rare",
	[Rarity.VeryRare]: "Very Rare",
	[Rarity.Legendary]: "Legendary",
};

const formatCurrency = (gp: number) => `${gp.toLocaleString("en-US")} gp`;

export const Header = (props: HeaderProps) => {
	const color = RARITY_COLOR[props.rarity];
	const shadow = RARITY_SHADOW[props.rarity];

	const strippedName = useMemo(() => {
		const prefix = RARITY_LABEL[props.rarity];
		return props.name.replace(prefix, "").trim();
	}, [props.name, props.rarity]);

	return (
		<div
			className={styles.root}
			style={{ "--rarity-color": color, "--rarity-shadow": shadow } as never}
		>
			<div className={styles.rarity}>{RARITY_LABEL[props.rarity]}</div>
			<div className={styles.name}>{strippedName}</div>
			<div className={styles.meta}>
				<span className={styles.metaText}>
					{equipmentDetails[props.base].title}
				</span>
				<svg aria-hidden="true" width="4" height="4" viewBox="0 0 4 4">
					<circle cx="2" cy="2" r="2" fill="#5a4e32" />
				</svg>
				<span className={styles.metaText}>
					{formatCurrency(props.currency)}
				</span>
			</div>
		</div>
	);
};
