import type { Meta, StoryObj } from "@storybook/react-vite";
import { GachaDisplay } from "./GachaDisplay";

/**
 * The full gacha pull screen: animated star-field background, header, draw
 * button, vignette, and pull overlay. This is the main interactive view a
 * player sees while drawing.
 */
const meta = {
	title: "Components/Gacha/Display",
	component: GachaDisplay,
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
			<GachaDisplay />
		</div>
	),
} satisfies Meta<typeof GachaDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
