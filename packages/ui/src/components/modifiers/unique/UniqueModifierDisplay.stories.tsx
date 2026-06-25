import type { Meta, StoryObj } from "@storybook/react-vite";
import { uniqueBloodthirstyFixture } from "../../../fixtures/modifiers/unique/uniqueBloodthirsty";
import { uniqueSoulboundFixture } from "../../../fixtures/modifiers/unique/uniqueSoulbound";
import { uniqueVenomousFixture } from "../../../fixtures/modifiers/unique/uniqueVenomous";
import { uniqueWrathfulFixture } from "../../../fixtures/modifiers/unique/uniqueWrathful";
import {
	UniqueModifierDisplay,
	type UniqueModifierDisplayProps,
} from "./UniqueModifierDisplay";

/**
 * Displays a unique modifier — a one-off effect with its own breakpoints and an
 * optional disclaimer.
 */
const meta = {
	title: "Components/Modifiers/Unique",
	component: UniqueModifierDisplay,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: UniqueModifierDisplayProps) => (
		<div style={{ background: "#040510", width: "460px" }}>
			<UniqueModifierDisplay modifier={props.modifier} float={props.float} />
		</div>
	),
} satisfies Meta<typeof UniqueModifierDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The bloodthirsty unique at its base breakpoint. */
export const Default: Story = {
	args: { modifier: uniqueBloodthirstyFixture, float: 0 },
};

/** A unique that carries a disclaimer line. */
export const WithDisclaimer: Story = {
	args: { modifier: uniqueSoulboundFixture, float: 0 },
};

/** A unique with two breakpoints, shown at its top. */
export const TwoBreakpoints: Story = {
	args: { modifier: uniqueWrathfulFixture, float: 1 },
};

/** A unique with six breakpoints, shown near the top of its range. */
export const SixBreakpoints: Story = {
	args: { modifier: uniqueVenomousFixture, float: 0.8 },
};
