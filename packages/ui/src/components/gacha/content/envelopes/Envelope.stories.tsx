import type { Meta, StoryObj } from "@storybook/react-vite";
import { Envelope } from "./Envelope";

/** The decorative envelope artwork shown in gacha content. */
const meta = {
	title: "Components/Gacha/Content/Envelope",
	component: Envelope,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
	render: () => (
		<div style={{ background: "#07091a", padding: "60px" }}>
			<Envelope />
		</div>
	),
} satisfies Meta<typeof Envelope>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
