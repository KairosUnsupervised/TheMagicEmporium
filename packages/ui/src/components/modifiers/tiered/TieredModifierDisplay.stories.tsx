import type { Meta, StoryObj } from "@storybook/react-vite";
import { tieredFuryFixture } from "../../../fixtures/modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../../../fixtures/modifiers/tiered/tieredStealth";
import {
	TieredModifierDisplay,
	type TieredModifierDisplayProps,
} from "./TieredModifierDisplay";

/**
 * Displays a tiered modifier, whose effect steps up through discrete tiers as
 * the `float` increases.
 */
const meta = {
	title: "Components/Modifiers/Tiered",
	component: TieredModifierDisplay,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: TieredModifierDisplayProps) => (
		<div style={{ background: "#040510", width: "460px" }}>
			<TieredModifierDisplay modifier={props.modifier} float={props.float} />
		</div>
	),
} satisfies Meta<typeof TieredModifierDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A two-tier modifier resting on its first tier. */
export const Default: Story = {
	args: { modifier: tieredStealthFixture, float: 0 },
};

/** A two-tier modifier stepped up to its second tier. */
export const TwoTiersSecondActive: Story = {
	args: { modifier: tieredStealthFixture, float: 0.5 },
};

/** A four-tier modifier on a tier that carries a disclaimer. */
export const FourTiersWithDisclaimer: Story = {
	args: { modifier: tieredFuryFixture, float: 0.6 },
};

/** A four-tier modifier pushed to its top tier. */
export const FourTiersMaxTier: Story = {
	args: { modifier: tieredFuryFixture, float: 0.8 },
};
