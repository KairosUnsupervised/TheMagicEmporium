import type { Meta, StoryObj } from "@storybook/react-vite";
import { uniqueBloodthirstyFixture } from "../../../fixtures/modifiers/unique/uniqueBloodthirsty";
import { uniqueSoulboundFixture } from "../../../fixtures/modifiers/unique/uniqueSoulbound";
import { uniqueVenomousFixture } from "../../../fixtures/modifiers/unique/uniqueVenomous";
import { uniqueWrathfulFixture } from "../../../fixtures/modifiers/unique/uniqueWrathful";
import {
	UniqueModifierDisplay,
	type UniqueModifierDisplayProps,
} from "./UniqueModifierDisplay";

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

export const Default: Story = {
	args: { modifier: uniqueBloodthirstyFixture, float: 0 },
};

export const WithDisclaimer: Story = {
	args: { modifier: uniqueSoulboundFixture, float: 0 },
};

export const TwoBreakpoints: Story = {
	args: { modifier: uniqueWrathfulFixture, float: 1 },
};

export const SixBreakpoints: Story = {
	args: { modifier: uniqueVenomousFixture, float: 0.8 },
};
