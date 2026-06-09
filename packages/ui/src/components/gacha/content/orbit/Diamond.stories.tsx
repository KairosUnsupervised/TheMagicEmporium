import type { Meta, StoryObj } from "@storybook/react-vite";
import { Diamond, type DiamondProps, DiamondType } from "./Diamond";

const meta = {
	title: "Components/Gacha/Content/Orbit/Diamond",
	component: Diamond,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
	render: (props: DiamondProps) => (
		<div
			style={{
				background: "#07091a",
				padding: "60px",
				display: "flex",
				gap: "40px",
				alignItems: "center",
			}}
		>
			<Diamond {...props} />
		</div>
	),
} satisfies Meta<typeof Diamond>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { type: DiamondType.Bright },
};

export const Bright: Story = {
	args: { type: DiamondType.Bright },
};

export const Dim: Story = {
	args: { type: DiamondType.Dim },
};
