import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealButton } from "./SealButton";

const meta = {
	title: "Components/Gacha/Pull/SealButton",
	component: SealButton,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark" },
	},
	argTypes: {
		disabled: {
			control: { type: "boolean" },
		},
		title: {
			control: { type: "text" },
		},
		kanji: {
			control: { type: "text" },
		},
	},
	args: {
		disabled: false,
		title: "Seal Your Fate",
		kanji: "封印せよ",
		onClick: () => console.log("seal clicked"),
	},
	render: (args) => {
		return (
			<div
				className="dark"
				style={{ padding: "40px", background: "#07091a", width: "360px" }}
			>
				<SealButton
					disabled={args.disabled}
					title={args.title}
					kanji={args.kanji}
					onClick={args.onClick}
				/>
			</div>
		);
	},
} satisfies Meta<typeof SealButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
	args: { disabled: true, title: "Sealing…" },
};

export const Revealing: Story = {
	args: { title: "Continue", kanji: "封印完了" },
};
