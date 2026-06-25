import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pip } from "./Pip";

/**
 * A single modifier pip. Renders one chevron per breakpoint above zero, driven
 * by the `breakpoints` count.
 */
const meta = {
	title: "Components/Gacha/Pull/Pips/Pip",
	component: Pip,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark" },
	},
	argTypes: {
		breakpoints: {
			control: { type: "number" },
		},
	},
	render: (args: { breakpoints?: number }) => {
		return (
			<div className="dark" style={{ padding: "40px", background: "#07091a" }}>
				<Pip breakpoints={args.breakpoints} />
			</div>
		);
	},
} satisfies Meta<typeof Pip>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Base pip with no breakpoint chevrons. */
export const Default: Story = {
	args: { breakpoints: 0 },
};

/** Pip with two breakpoint chevrons. */
export const WithBreakpoints: Story = {
	args: { breakpoints: 2 },
};
