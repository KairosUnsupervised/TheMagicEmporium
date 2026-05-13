import type { Meta, StoryObj } from "@storybook/preact-vite";
import { TieredModifierDisplay, type TieredModifierDisplayProps } from "./TieredModifierDisplay";
import { tieredStealthFixture } from "../../../fixtures/modifiers/tiered/tieredStealth";
import { tieredFuryFixture } from "../../../fixtures/modifiers/tiered/tieredFury";

const meta = {
	title: "Components/Modifiers/Tiered",
	component: TieredModifierDisplay,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark", values: [{ name: "dark", value: "#040510" }] },
	},
	render: (props: TieredModifierDisplayProps) => (
		<div style="background:#040510;width:460px;">
			<TieredModifierDisplay modifier={props.modifier} data={props.data} />
		</div>
	),
} satisfies Meta<typeof TieredModifierDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { modifier: tieredStealthFixture, data: { float: 0 } },
};

export const TwoTiersSecondActive: Story = {
	args: { modifier: tieredStealthFixture, data: { float: 0.5 } },
};

export const FourTiersWithDisclaimer: Story = {
	args: { modifier: tieredFuryFixture, data: { float: 0.6 } },
};

export const FourTiersMaxTier: Story = {
	args: { modifier: tieredFuryFixture, data: { float: 0.8 } },
};
