import type { Meta, StoryObj } from "@storybook/react-vite";
import { WishInput } from "./WishInput";

/**
 * Slot for selecting a wish to apply to a draw. `index` identifies which of the
 * four wish slots this input represents.
 */
const meta = {
	title: "Components/Gacha/Input/WishInput",
	component: WishInput,
	parameters: {
		layout: "centered",
	},
	render: (args) => {
		return (
			<div className="dark" style={{ padding: "220px 240px" }}>
				<div style={{ display: "flex", gap: "16px" }}>
					<WishInput index={args.index} />
				</div>
			</div>
		);
	},
} satisfies Meta<typeof WishInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { index: 0 },
};
