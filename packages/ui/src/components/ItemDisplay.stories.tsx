import type { Meta, StoryObj } from "@storybook/preact-vite";
import { ItemDisplay, type ItemDisplayProps } from "./ItemDisplay";
import { veilpiercerFixture } from "../fixtures/items/veilpiercerFixture";

const meta = {
	title: "Components/Item",
	component: ItemDisplay,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark", values: [{ name: "dark", value: "#040510" }] },
	},
	render: (props: ItemDisplayProps) => (
		<div style="background:#040510;padding:40px;">
			<ItemDisplay item={props.item} />
		</div>
	),
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { item: veilpiercerFixture },
};
