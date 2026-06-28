import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import { Rarity } from "@tme/library/src/item/item.types";
import { generateIconUrl } from "@tme/library/src/misc/generateIconUrl";
import type { CSSProperties, JSX } from "react";

interface FoundryIconProps {
	item: AbstractItem;
	size?: number;
}

/**
 * Approximates how a magic item icon appears in a FoundryVTT dnd5e actor
 * sheet's inventory: a small square icon framed by a rarity-colored border.
 * The border colors mirror apps/core/src/hooks/registerRarityBorderColors.ts.
 */
const rarityBorderColor: Record<Rarity, string> = {
	[Rarity.Common]: "#9d9d9d",
	[Rarity.Uncommon]: "#4fc978",
	[Rarity.Rare]: "#5b9de8",
	[Rarity.VeryRare]: "#b88ce8",
	[Rarity.Legendary]: "#ee7e3e",
};

export const FoundryIcon = (props: FoundryIconProps): JSX.Element => {
	const size = props.size ?? 32;

	const style: CSSProperties = {
		width: `${size}px`,
		height: `${size}px`,
		objectFit: "cover",
		border: `2px solid ${rarityBorderColor[props.item.rarity]}`,
		borderRadius: "2px",
	};

	return (
		<img
			src={generateIconUrl(equipmentDetails[props.item.base].icon)}
			alt={props.item.name}
			style={style}
		/>
	);
};
