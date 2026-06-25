import type { Meta, StoryObj } from "@storybook/react-vite";
import { PipRow } from "./PipRow";

/**
 * A row of modifier pips grouped by slot (primary, secondary, tertiary). Each
 * number is a pip's breakpoint index; empty groups are skipped.
 */
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

/** Three slots with plain pips and no breakpoints. */
export const Default: Story = {
	args: { groups: [[0, 0], [0], [0]] },
};

/** Mixed breakpoint indices across the three slots. */
export const WithBreakpoints: Story = {
	args: { groups: [[2, 0], [1], [3]] },
};

/** A single slot containing three pips. */
export const SingleGroup: Story = {
	args: { groups: [[0, 1, 2]] },
};

/** No groups — the component renders nothing. */
export const Empty: Story = {
	args: { groups: [] },
};
