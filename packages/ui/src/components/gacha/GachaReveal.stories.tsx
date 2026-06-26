import type { Meta, StoryObj } from "@storybook/react-vite";
import { GachaReveal } from "./GachaReveal";

/**
 * Wraps {@link GachaDisplay} with the cinematic intro / iris-open sequence and
 * closing transition. Use this as the entry point that animates the gacha
 * screen into and out of view.
 */
const meta = {
	title: "Components/Gacha/Reveal",
	component: GachaReveal,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
		viewport: {
			defaultViewport: "custom",
			viewports: {
				custom: {
					name: "1920x1080",
					styles: { width: "1920px", height: "1080px" },
				},
			},
		},
	},
	render: () => (
		<div style={{ width: "100vw", height: "100vh", background: "#040510" }}>
			<GachaReveal />
		</div>
	),
} satisfies Meta<typeof GachaReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
