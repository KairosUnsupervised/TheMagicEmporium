import type { Meta, StoryObj } from "@storybook/preact-vite";
import { IndependentModifierDisplay, type IndependentModifierDisplayProps } from "./IndependentModifierDisplay";
import { independentEdibleFixture } from "../../../fixtures/modifiers/independent/independentEdible";
import { independentShadowwalkerFixture } from "../../../fixtures/modifiers/independent/independentShadowwalker";

const meta = {
	title: "Components/Modifiers/Independent",
	component: IndependentModifierDisplay,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark", values: [{ name: "dark", value: "#040510" }] },
	},
	render: (props: IndependentModifierDisplayProps) => (
		<div style="background:#040510;width:460px;">
			<IndependentModifierDisplay modifier={props.modifier} data={props.data} />
		</div>
	),
} satisfies Meta<typeof IndependentModifierDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { modifier: independentEdibleFixture, data: { float: 0 } },
};

export const WithDisclaimer: Story = {
	args: { modifier: independentShadowwalkerFixture, data: { float: 0.8 } },
};

export const ThreeBreakpoints: Story = {
	args: { modifier: independentShadowwalkerFixture, data: { float: 0.5 } },
};
