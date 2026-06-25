import type { Meta, StoryObj } from "@storybook/react-vite";
import { EnvelopeInput } from "./EnvelopeInput";

/**
 * Slot for selecting the envelope to use in a draw. Opens the envelope picker
 * when clicked.
 */
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
