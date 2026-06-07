import type { Meta, StoryObj } from "@storybook/react-vite";
import { WishInput } from "./WishInput";

const meta = {
	title: "Components/Gacha/WishInput",
	component: WishInput,
	parameters: {
		layout: "centered",
	},
	render: () => {
		return (
			<div className="dark" style={{ padding: "220px 240px" }}>
				<div style={{ display: "flex", gap: "16px" }}>
					<WishInput index={0} />
					<WishInput index={1} />
					<WishInput index={2} />
					<WishInput index={3} />
				</div>
			</div>
		);
	},
} satisfies Meta<typeof WishInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
