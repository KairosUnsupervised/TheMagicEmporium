import type { Meta, StoryObj } from "@storybook/preact-vite";
import { BreakpointDisplay } from "./BreakpointDisplay";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";

const meta: Meta = {
	title: "Components/Modifiers/BreakpointDisplay",
	component: BreakpointDisplay,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark", values: [{ name: "dark", value: "#040510" }] },
	},
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<div style="background:#040510;padding:32px;display:flex;flex-direction:column;gap:24px;align-items:flex-start;">
			<BreakpointDisplay length={6} defaultActiveIndex={0} temporaryActiveIndex={3} type={ModifierType.Unique} />
			<BreakpointDisplay length={6} defaultActiveIndex={2} temporaryActiveIndex={5} type={ModifierType.Unique} />
			<BreakpointDisplay length={6} defaultActiveIndex={5} temporaryActiveIndex={null} type={ModifierType.Unique} />
		</div>
	),
};

export const Independent: Story = {
	render: () => (
		<div style="background:#040510;padding:32px;display:flex;flex-direction:column;gap:24px;align-items:flex-start;">
			<BreakpointDisplay length={3} defaultActiveIndex={0} temporaryActiveIndex={2} type={ModifierType.Independent} />
			<BreakpointDisplay length={3} defaultActiveIndex={1} temporaryActiveIndex={null} type={ModifierType.Independent} />
			<BreakpointDisplay length={3} defaultActiveIndex={2} temporaryActiveIndex={0} type={ModifierType.Independent} />
		</div>
	),
};

export const Tiered: Story = {
	render: () => (
		<div style="background:#040510;padding:32px;display:flex;flex-direction:column;gap:24px;align-items:flex-start;">
			<BreakpointDisplay length={5} defaultActiveIndex={0} temporaryActiveIndex={2} type={ModifierType.Tiered} />
			<BreakpointDisplay length={5} defaultActiveIndex={2} temporaryActiveIndex={4} type={ModifierType.Tiered} />
			<BreakpointDisplay length={5} defaultActiveIndex={4} temporaryActiveIndex={1} type={ModifierType.Tiered} />
		</div>
	),
};
