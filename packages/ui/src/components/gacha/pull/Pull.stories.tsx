import type { Meta, StoryObj } from "@storybook/react-vite";
import { commonFixture } from "../../../fixtures/items/commonFixture";
import { legendaryModifierBackgroundFixture } from "../../../fixtures/items/legendaryModifierBackgroundFixture";
import { rareFixture } from "../../../fixtures/items/rareFixture";
import { uncommonFixture } from "../../../fixtures/items/uncommonFixture";
import { veryRareFixture } from "../../../fixtures/items/veryRareFixture";
import type { VignetteStage } from "../content/Vignette";
import { Pull } from "./Pull";

const fiveItems = [
	commonFixture,
	uncommonFixture,
	rareFixture,
	veryRareFixture,
	legendaryModifierBackgroundFixture,
];

const meta = {
	title: "Components/Gacha/Pull/Pull",
	component: Pull,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark" },
	},
	argTypes: {
		picks: {
			control: { type: "number", min: 1, max: 5 },
		},
		visibility: {
			control: { type: "select" },
			options: [0, 1, 2, 3, 4] as VignetteStage[],
		},
	},
	render: (args: { picks: number; visibility: VignetteStage }) => {
		return (
			<div className="dark" style={{ padding: "48px", background: "#07091a" }}>
				<Pull
					items={fiveItems}
					picks={args.picks}
					visibility={args.visibility}
					onConfirm={(selected) => console.log("confirmed", selected)}
				/>
			</div>
		);
	},
} satisfies Meta<typeof Pull>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { picks: 2, visibility: 3 },
};

export const Blind: Story = {
	render: () => (
		<div className="dark" style={{ padding: "48px", background: "#07091a" }}>
			<Pull
				items={fiveItems}
				picks={2}
				visibility={0}
				onConfirm={(selected) => console.log("confirmed", selected)}
			/>
		</div>
	),
};

export const SinglePick: Story = {
	render: () => (
		<div className="dark" style={{ padding: "48px", background: "#07091a" }}>
			<Pull
				items={fiveItems}
				picks={1}
				visibility={2}
				onConfirm={(selected) => console.log("confirmed", selected)}
			/>
		</div>
	),
};

export const PickAll: Story = {
	render: () => (
		<div className="dark" style={{ padding: "48px", background: "#07091a" }}>
			<Pull
				items={fiveItems}
				picks={5}
				visibility={4}
				onConfirm={(selected) => console.log("confirmed", selected)}
			/>
		</div>
	),
};
