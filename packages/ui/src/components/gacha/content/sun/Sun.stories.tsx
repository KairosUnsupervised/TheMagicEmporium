import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sun } from "./Sun";

const meta = {
	title: "Components/Gacha/Content/Sun",
	component: Sun,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
	render: () => (
		<div style={{ background: "#07091a", padding: "60px" }}>
			<Sun />
		</div>
	),
} satisfies Meta<typeof Sun>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
