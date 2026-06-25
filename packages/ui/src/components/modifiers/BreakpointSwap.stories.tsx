import type { Meta, StoryObj } from "@storybook/react-vite";
import { tieredFuryFixture } from "../../fixtures/modifiers/tiered/tieredFury";
import { uniqueBloodthirstyFixture } from "../../fixtures/modifiers/unique/uniqueBloodthirsty";
import { uniqueVenomousFixture } from "../../fixtures/modifiers/unique/uniqueVenomous";
import { TieredModifierDisplay } from "./tiered/TieredModifierDisplay";
import { UniqueModifierDisplay } from "./unique/UniqueModifierDisplay";

/**
 * Demonstrates how a modifier display swaps its flavor and changes as the
 * `float` crosses breakpoints.
 */
const meta: Meta = {
	title: "Components/Modifiers/BreakpointSwap",
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
};

export default meta;

type Story = StoryObj;

const venomousBreakpoints = (
	uniqueVenomousFixture.schema as unknown as { breakpoints: { min: number }[] }
).breakpoints;
const furyBreakpoints = (
	tieredFuryFixture.schema as unknown as { breakpoints: { min: number }[] }
).breakpoints;

/** A unique modifier at its lowest breakpoint (float 0). */
export const Default: Story = {
	render: () => (
		<div style={{ background: "#040510", width: "460px" }}>
			<UniqueModifierDisplay modifier={uniqueBloodthirstyFixture} float={0} />
		</div>
	),
};

/** Venomous unique at a mid-range float, showing a middle breakpoint. */
export const UniqueVenomousMiddle: Story = {
	render: () => (
		<div style={{ background: "#040510", width: "460px" }}>
			<UniqueModifierDisplay modifier={uniqueVenomousFixture} float={0.4} />
		</div>
	),
};

/** Venomous unique at its highest breakpoint. */
export const UniqueVenomousHighest: Story = {
	render: () => (
		<div style={{ background: "#040510", width: "460px" }}>
			<UniqueModifierDisplay
				modifier={uniqueVenomousFixture}
				float={venomousBreakpoints[5].min}
			/>
		</div>
	),
};

/** Tiered Fury at its second tier. */
export const TieredFuryMiddle: Story = {
	render: () => (
		<div style={{ background: "#040510", width: "460px" }}>
			<TieredModifierDisplay
				modifier={tieredFuryFixture}
				float={furyBreakpoints[1].min}
			/>
		</div>
	),
};
