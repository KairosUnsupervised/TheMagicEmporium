import type { Meta, StoryObj } from "@storybook/react-vite";
import { commonFixture } from "../../fixtures/items/commonFixture";
import { legendaryModifierBackgroundFixture } from "../../fixtures/items/legendaryModifierBackgroundFixture";
import { legendaryNoBackgroundFixture } from "../../fixtures/items/legendaryNoBackgroundFixture";
import { legendaryOverrideBackgroundFixture } from "../../fixtures/items/legendaryOverrideBackgroundFixture";
import { rareFixture } from "../../fixtures/items/rareFixture";
import { uncommonFixture } from "../../fixtures/items/uncommonFixture";
import { veryRareFixture } from "../../fixtures/items/veryRareFixture";
import { veryRarePerfectFixture } from "../../fixtures/items/veryRarePerfectFixture";
import { ItemDisplay, type ItemDisplayProps } from "./ItemDisplay";

const meta = {
	title: "Components/Item",
	component: ItemDisplay,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: ItemDisplayProps) => (
		<div style={{ background: "#040510", padding: "40px" }}>
			<ItemDisplay item={props.item} />
		</div>
	),
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { item: legendaryOverrideBackgroundFixture },
};

export const LegendaryNoBackground: Story = {
	args: { item: legendaryNoBackgroundFixture },
};

export const LegendaryOverrideBackground: Story = {
	args: { item: legendaryOverrideBackgroundFixture },
};

export const LegendaryModifierBackground: Story = {
	args: { item: legendaryModifierBackgroundFixture },
};

export const VeryRare: Story = {
	args: { item: veryRareFixture },
};

export const VeryRarePerfect: Story = {
	args: { item: veryRarePerfectFixture },
};

export const Rare: Story = {
	args: { item: rareFixture },
};

export const Uncommon: Story = {
	args: { item: uncommonFixture },
};

export const Common: Story = {
	args: { item: commonFixture },
};
