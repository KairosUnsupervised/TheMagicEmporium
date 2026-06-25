import type { Meta, StoryObj } from "@storybook/react-vite";
import { independentEdibleFixture } from "../../../fixtures/modifiers/independent/independentEdible";
import { independentShadowwalkerFixture } from "../../../fixtures/modifiers/independent/independentShadowwalker";
import {
	IndependentModifierDisplay,
	type IndependentModifierDisplayProps,
} from "./IndependentModifierDisplay";

/**
 * Displays an independent modifier — each breakpoint owns its own flavor,
 * changes, and activities, with no interpolation between them.
 */
const meta = {
	title: "Components/Modifiers/Independent",
	component: IndependentModifierDisplay,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: IndependentModifierDisplayProps) => (
		<div style={{ background: "#040510", width: "460px" }}>
			<IndependentModifierDisplay
				modifier={props.modifier}
				float={props.float}
			/>
		</div>
	),
} satisfies Meta<typeof IndependentModifierDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The edible modifier at its lowest breakpoint. */
export const Default: Story = {
	args: { modifier: independentEdibleFixture, float: 0 },
};

/** A breakpoint that carries a disclaimer line. */
export const WithDisclaimer: Story = {
	args: { modifier: independentShadowwalkerFixture, float: 0.8 },
};

/** Mid-range float landing on the middle of three breakpoints. */
export const ThreeBreakpoints: Story = {
	args: { modifier: independentShadowwalkerFixture, float: 0.5 },
};
