import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloseButton } from "./CloseButton";

/** Header button for dismissing the gacha overlay. */
const meta = {
	title: "Components/Gacha/Header/CloseButton",
	component: CloseButton,
	parameters: {
		layout: "centered",
	},
	render: (args) => {
		return (
			<div
				className="dark"
				style={{ padding: "40px", background: "rgba(7, 9, 26, 1)" }}
			>
				<CloseButton {...args} />
			</div>
		);
	},
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

/** Non-interactive state while an action is in progress. */
export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
