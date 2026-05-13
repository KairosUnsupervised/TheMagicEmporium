import type { Meta, StoryObj } from "@storybook/preact-vite";
import { BreakpointStack } from "./BreakpointStack";
import { UniqueModifierDisplay } from "./unique/UniqueModifierDisplay";
import { TieredModifierDisplay } from "./tiered/TieredModifierDisplay";
import { uniqueBloodthirstyFixture } from "../../fixtures/modifiers/unique/uniqueBloodthirsty";
import { uniqueVenomousFixture } from "../../fixtures/modifiers/unique/uniqueVenomous";
import { tieredFuryFixture } from "../../fixtures/modifiers/tiered/tieredFury";

const meta: Meta = {
	title: "Components/Modifiers/BreakpointStack",
	component: BreakpointStack,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark", values: [{ name: "dark", value: "#040510" }] },
	},
};

export default meta;

type Story = StoryObj;

const venomousBreakpoints = (uniqueVenomousFixture.schema as unknown as { breakpoints: { min: number }[] }).breakpoints;
const furyBreakpoints = (tieredFuryFixture.schema as unknown as { breakpoints: { min: number }[] }).breakpoints;

export const Default: Story = {
	render: () => (
		<div style="background:#040510;width:460px;">
			<BreakpointStack
				items={[<UniqueModifierDisplay modifier={uniqueBloodthirstyFixture} data={{ float: 0 }} />]}
				activeIndex={0}
			/>
		</div>
	),
};

export const UniqueVenomousMiddle: Story = {
	render: () => {
		const items = venomousBreakpoints.map((bp) => (
			<UniqueModifierDisplay modifier={uniqueVenomousFixture} data={{ float: bp.min }} />
		));
		return (
			<div style="background:#040510;width:460px;padding:120px 0;">
				<BreakpointStack items={items} activeIndex={2} />
			</div>
		);
	},
};

export const UniqueVenomousHighest: Story = {
	render: () => {
		const items = venomousBreakpoints.map((bp) => (
			<UniqueModifierDisplay modifier={uniqueVenomousFixture} data={{ float: bp.min }} />
		));
		return (
			<div style="background:#040510;width:460px;padding:120px 0;">
				<BreakpointStack items={items} activeIndex={5} />
			</div>
		);
	},
};

export const TieredFuryMiddle: Story = {
	render: () => {
		const items = furyBreakpoints.map((bp) => (
			<TieredModifierDisplay modifier={tieredFuryFixture} data={{ float: bp.min }} />
		));
		return (
			<div style="background:#040510;width:460px;padding:120px 0;">
				<BreakpointStack items={items} activeIndex={1} />
			</div>
		);
	},
};
