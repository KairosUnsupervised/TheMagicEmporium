import type { Meta, StoryObj } from "@storybook/preact-vite";
import { linearFortitudeFixture } from "../../../fixtures/modifiers/linear/linearFortitude";
import { linearStealthFixture } from "../../../fixtures/modifiers/linear/linearStealth";
import {
	LinearModifierDisplay,
	type LinearModifierDisplayProps,
} from "./LinearModifierDisplay";

const meta = {
	title: "Components/Modifiers/Linear",
	component: LinearModifierDisplay,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: LinearModifierDisplayProps) => (
		<div style="background:#040510;width:460px;">
			<LinearModifierDisplay modifier={props.modifier} data={props.data} />
		</div>
	),
} satisfies Meta<typeof LinearModifierDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { modifier: linearStealthFixture, data: { float: 0 } },
};

export const WithDisclaimer: Story = {
	args: { modifier: linearFortitudeFixture, data: { float: 0.7 } },
};
