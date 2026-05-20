import type { Meta, StoryObj } from "@storybook/preact-vite";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { veilpiercerFixture } from "../../../fixtures/items/veilpiercerFixture";
import { Header, type HeaderProps } from "./Header";

const meta = {
	title: "Components/Item/Header",
	component: Header,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: HeaderProps) => (
		<div style="background:#040510;width:460px;padding:28px;">
			<Header
				name={props.name}
				rarity={props.rarity}
				base={props.base}
				currency={props.currency}
			/>
		</div>
	),
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: veilpiercerFixture.name,
		rarity: veilpiercerFixture.rarity,
		base: veilpiercerFixture.base,
		currency: veilpiercerFixture.currency,
	},
};

export const Common: Story = {
	args: {
		name: "Iron Dagger",
		rarity: Rarity.Common,
		base: Equipment.Dagger,
		currency: 2,
	},
};

export const Rare: Story = {
	args: {
		name: "Stormcaller Bow",
		rarity: Rarity.Rare,
		base: Equipment.Longbow,
		currency: 500,
	},
};

export const Legendary: Story = {
	args: {
		name: "Dawnbreaker",
		rarity: Rarity.Legendary,
		base: Equipment.Greatsword,
		currency: 50000,
	},
};
