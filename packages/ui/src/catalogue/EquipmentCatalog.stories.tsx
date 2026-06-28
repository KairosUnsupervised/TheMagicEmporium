import type { Meta, StoryObj } from "@storybook/react-vite";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import type { CSSProperties } from "react";
import { PullItem } from "../components/gacha/pull/PullItem";
import { FoundryIcon } from "../components/item/FoundryIcon";

/**
 * A full equipment catalog. Every equipment type is listed, with each rarity
 * as a column: a top row of FoundryVTT inventory-icon approximations and a
 * bottom row of the matching gacha PullItem cards.
 */
const meta = {
	title: "Catalog/Equipment",
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const allRarities: Rarity[] = [
	Rarity.Common,
	Rarity.Uncommon,
	Rarity.Rare,
	Rarity.VeryRare,
	Rarity.Legendary,
];

const cellStyle: CSSProperties = {
	flex: "0 0 auto",
	width: "130px",
	display: "flex",
	justifyContent: "center",
};

const catalogItem = (base: Equipment, rarity: Rarity): AbstractItem => {
	const item = new AbstractItem();
	item.base = base;
	item.rarity = rarity;
	item.name = equipmentDetails[base].title;
	return item;
};

export const Default: Story = {
	render: () => {
		return (
			<div
				className="dark"
				style={{
					padding: "40px",
					background: "#07091a",
					display: "flex",
					flexDirection: "column",
					gap: "40px",
				}}
			>
				<div style={{ display: "flex", gap: "20px" }}>
					{allRarities.map((rarity) => (
						<span
							key={rarity}
							style={{
								...cellStyle,
								fontFamily: "Cinzel Decorative, serif",
								fontSize: "9px",
								letterSpacing: "1.5px",
								textTransform: "uppercase",
								color: "rgba(212,166,74,0.6)",
							}}
						>
							{rarity}
						</span>
					))}
				</div>

				{Object.values(Equipment).map((base) => (
					<div
						key={base}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "12px",
						}}
					>
						<span
							style={{
								fontFamily: "Cinzel Decorative, serif",
								fontSize: "12px",
								letterSpacing: "0.5px",
								color: "rgba(255,255,255,0.8)",
							}}
						>
							{equipmentDetails[base].title}
						</span>

						<div style={{ display: "flex", gap: "20px" }}>
							{allRarities.map((rarity) => (
								<div key={rarity} style={cellStyle}>
									<FoundryIcon item={catalogItem(base, rarity)} />
								</div>
							))}
						</div>

						<div style={{ display: "flex", gap: "20px" }}>
							{allRarities.map((rarity) => (
								<div key={rarity} style={cellStyle}>
									<PullItem item={catalogItem(base, rarity)} visibility={4} />
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		);
	},
};
