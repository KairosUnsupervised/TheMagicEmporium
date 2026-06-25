import type { Meta, StoryObj } from "@storybook/react-vite";
import { EnvelopeInput } from "./EnvelopeInput";

const meta = {
	title: "Components/Gacha/Input/EnvelopeInput",
	component: EnvelopeInput,
	parameters: {
		layout: "centered",
	},
	render: () => {
		return (
			<div className="dark" style={{ padding: "220px 240px" }}>
				<EnvelopeInput />
			</div>
		);
	},
} satisfies Meta<typeof EnvelopeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
