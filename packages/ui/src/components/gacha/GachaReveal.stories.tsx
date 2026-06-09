import type {Meta, StoryObj} from "@storybook/react-vite";
import {commonFixture} from "../../fixtures/items/commonFixture";
import {rareFixture} from "../../fixtures/items/rareFixture";
import {uncommonFixture} from "../../fixtures/items/uncommonFixture";
import {veryRareFixture} from "../../fixtures/items/veryRareFixture";
import {GachaReveal, type GachaRevealProps} from "./GachaReveal";

const meta = {
	title: "Components/Gacha/Reveal",
	component: GachaReveal,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "dark",
			values: [{name: "dark", value: "#040510"}],
		},
		viewport: {
			defaultViewport: "custom",
			viewports: {
				custom: {
					name: "1920x1080",
					styles: {width: "1920px", height: "1080px"},
				},
			},
		},
	},
	render: (props: GachaRevealProps) => (
		<div style={{width: "1920px", height: "1080px", background: "#040510"}}>
			<GachaReveal
				wishes={props.wishes}
				hiddenRarity={props.hiddenRarity}
				hiddenName={props.hiddenName}
				hiddenType={props.hiddenType}
				hiddenImage={props.hiddenImage}
			/>
		</div>
	),
} satisfies Meta<typeof GachaReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		wishes: [veryRareFixture, rareFixture, uncommonFixture, commonFixture],
	},
};
