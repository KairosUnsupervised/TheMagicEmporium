import type { Meta, StoryObj } from "@storybook/react-vite";
import { linearFortitudeFixture } from "../../../fixtures/modifiers/linear/linearFortitude";
import { linearStealthFixture } from "../../../fixtures/modifiers/linear/linearStealth";
import {
	LinearModifierDisplay,
	type LinearModifierDisplayProps,
} from "./LinearModifierDisplay";

/**
 * Displays a linear modifier, whose effect scales continuously with the rolled
 * `float`.
 */
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
		<div style={{ background: "#040510", width: "460px" }}>
			<LinearModifierDisplay modifier={props.modifier} float={props.float} />
		</div>
	),
} satisfies Meta<typeof LinearModifierDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The stealth modifier at the bottom of its range. */
export const Default: Story = {
	args: { modifier: linearStealthFixture, float: 0 },
};

/** A higher float that surfaces a disclaimer line. */
export const WithDisclaimer: Story = {
	args: { modifier: linearFortitudeFixture, float: 0.7 },
};
