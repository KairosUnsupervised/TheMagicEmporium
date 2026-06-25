import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointDisplay } from "./BreakpointDisplay";

/**
 * The breakpoint indicator row for a modifier: shows the current active
 * breakpoint and an optional temporary/preview breakpoint, styled per modifier
 * type.
 */
const meta: Meta = {
	title: "Components/Modifiers/BreakpointDisplay",
	component: BreakpointDisplay,
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

/** Unique-styled rows (6 breakpoints) at various active/preview positions. */
export const Default: Story = {
	render: () => (
		<div
			style={{
				background: "#040510",
				padding: "32px",
				display: "flex",
				flexDirection: "column",
				gap: "24px",
				alignItems: "flex-start",
			}}
		>
			<BreakpointDisplay
				length={6}
				defaultActiveIndex={0}
				temporaryActiveIndex={3}
				type={ModifierType.Unique}
			/>
			<BreakpointDisplay
				length={6}
				defaultActiveIndex={2}
				temporaryActiveIndex={5}
				type={ModifierType.Unique}
			/>
			<BreakpointDisplay
				length={6}
				defaultActiveIndex={5}
				temporaryActiveIndex={null}
				type={ModifierType.Unique}
			/>
		</div>
	),
};

/** Independent-styled rows with 3 breakpoints. */
export const Independent: Story = {
	render: () => (
		<div
			style={{
				background: "#040510",
				padding: "32px",
				display: "flex",
				flexDirection: "column",
				gap: "24px",
				alignItems: "flex-start",
			}}
		>
			<BreakpointDisplay
				length={3}
				defaultActiveIndex={0}
				temporaryActiveIndex={2}
				type={ModifierType.Independent}
			/>
			<BreakpointDisplay
				length={3}
				defaultActiveIndex={1}
				temporaryActiveIndex={null}
				type={ModifierType.Independent}
			/>
			<BreakpointDisplay
				length={3}
				defaultActiveIndex={2}
				temporaryActiveIndex={0}
				type={ModifierType.Independent}
			/>
		</div>
	),
};

/** Tiered-styled rows with 5 breakpoints. */
export const Tiered: Story = {
	render: () => (
		<div
			style={{
				background: "#040510",
				padding: "32px",
				display: "flex",
				flexDirection: "column",
				gap: "24px",
				alignItems: "flex-start",
			}}
		>
			<BreakpointDisplay
				length={5}
				defaultActiveIndex={0}
				temporaryActiveIndex={2}
				type={ModifierType.Tiered}
			/>
			<BreakpointDisplay
				length={5}
				defaultActiveIndex={2}
				temporaryActiveIndex={4}
				type={ModifierType.Tiered}
			/>
			<BreakpointDisplay
				length={5}
				defaultActiveIndex={4}
				temporaryActiveIndex={1}
				type={ModifierType.Tiered}
			/>
		</div>
	),
};
