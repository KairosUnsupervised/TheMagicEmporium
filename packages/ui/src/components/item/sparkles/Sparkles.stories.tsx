import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkles } from "./Sparkles";

/**
 * Decorative animated sparkle overlay for item cards; `amount` controls the
 * number of particles.
 */
const meta = {
	title: "Components/Item/Sparkles",
	component: Sparkles,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
	render: (args) => (
		<div
			style={{
				position: "relative",
				width: "460px",
				height: "300px",
				background: "linear-gradient(180deg, #0e1124 0%, #07091a 100%)",
				borderRadius: "4px",
				boxShadow: "inset 0 0 0 1px rgba(212, 166, 74, 0.35)",
			}}
		>
			<Sparkles amount={args.amount} />
		</div>
	),
} satisfies Meta<typeof Sparkles>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default density of 30 particles. */
export const Default: Story = {
	args: {
		amount: 30,
	},
};

/** Sparse — only a handful of particles. */
export const Few: Story = {
	args: {
		amount: 10,
	},
};

/** Dense — a heavy shower of particles. */
export const Many: Story = {
	args: {
		amount: 60,
	},
};
