import type { Meta, StoryObj } from "@storybook/react-vite";
import { commonFixture } from "../../fixtures/items/commonFixture";
import { legendaryOverrideBackgroundFixture } from "../../fixtures/items/legendaryOverrideBackgroundFixture";
import { rareFixture } from "../../fixtures/items/rareFixture";
import { uncommonFixture } from "../../fixtures/items/uncommonFixture";
import { veryRareFixture } from "../../fixtures/items/veryRareFixture";
import { GachaDisplay, type GachaDisplayProps } from "./GachaDisplay";

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
	render: (props: GachaDisplayProps) => (
		<div style={{ width: "1920px", height: "1080px", background: "#040510" }}>
			<GachaDisplay
				envelope={props.envelope}
				wishes={props.wishes}
				hiddenRarity={props.hiddenRarity}
				hiddenName={props.hiddenName}
				hiddenType={props.hiddenType}
				hiddenImage={props.hiddenImage}
			/>
		</div>
	),
} satisfies Meta<typeof GachaDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		envelope: legendaryOverrideBackgroundFixture,
		wishes: [veryRareFixture, rareFixture, uncommonFixture, commonFixture],
	},
};
