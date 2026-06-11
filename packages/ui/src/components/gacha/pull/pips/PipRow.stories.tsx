import type { Meta, StoryObj } from "@storybook/react-vite";
import { PipRow } from "./PipRow";

const meta = {
	title: "Components/Gacha/Pull/Pips/PipRow",
	component: PipRow,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark" },
	},
	render: (args: { groups: number[][] }) => {
		return (
			<div className="dark" style={{ padding: "40px", background: "#07091a" }}>
				<PipRow groups={args.groups} />
			</div>
		);
	},
} satisfies Meta<typeof PipRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { groups: [[0, 0], [0], [0]] },
};

export const WithBreakpoints: Story = {
	args: { groups: [[2, 0], [1], [3]] },
};

export const SingleGroup: Story = {
	args: { groups: [[0, 1, 2]] },
};

export const Empty: Story = {
	args: { groups: [] },
};
