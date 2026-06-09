import type {Meta, StoryObj} from "@storybook/react-vite";
import {GachaIntroHeader} from "./GachaIntroHeader";
import background from "./background.png"

const meta = {
	title: "Components/Gacha/Header/GachaIntroHeader",
	component: GachaIntroHeader,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{name: "dark", value: "#040510"}],
		},
	},
	render: () => (
		<div className="dark" style={{padding: "80px 120px", backgroundImage: `url("${background}")`}}>
			<GachaIntroHeader/>
		</div>
	),
} satisfies Meta<typeof GachaIntroHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
