import type { Meta, StoryObj } from "@storybook/preact-vite";
import { veilpiercerFixture } from "../../../fixtures/items/veilpiercerFixture";
import { Section, type SectionProps } from "./Section";

const meta = {
	title: "Components/Item/Section",
	component: Section,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: SectionProps) => (
		<div style="background:#040510;width:460px;padding:16px;">
			<Section title={props.title} modifiers={props.modifiers} />
		</div>
	),
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { title: "PRIMARY", modifiers: veilpiercerFixture.primary },
};

export const Secondary: Story = {
	args: { title: "SECONDARY", modifiers: veilpiercerFixture.secondary },
};

export const Tertiary: Story = {
	args: { title: "TERTIARY", modifiers: veilpiercerFixture.tertiary },
};
