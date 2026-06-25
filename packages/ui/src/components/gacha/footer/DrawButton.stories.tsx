import type { Meta, StoryObj } from "@storybook/react-vite";
import { DrawButton } from "./DrawButton";

/** The primary call-to-action in the gacha footer that starts a draw. */
const meta = {
	title: "Components/Gacha/Footer/DrawButton",
	component: DrawButton,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
	render: () => (
		<div className="dark" style={{ padding: "60px", background: "#07091a" }}>
			<DrawButton />
		</div>
	),
} satisfies Meta<typeof DrawButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
