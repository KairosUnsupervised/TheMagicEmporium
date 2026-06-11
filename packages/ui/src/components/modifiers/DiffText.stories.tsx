import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiffText } from "./DiffText";

const meta = {
	title: "Components/Modifiers/DiffText",
	component: DiffText,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (args) => {
		return (
			<div
				style={{
					background: "#040510",
					width: "460px",
					padding: "24px",
					fontSize: "12.5px",
					lineHeight: 1.55,
					color: "#a89e84",
					fontWeight: 300,
				}}
			>
				<DiffText text={args.text} previousText={args.previousText} />
			</div>
		);
	},
} satisfies Meta<typeof DiffText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: "You can reroll 1-3's on your weapon induced damage dice, up to 3 rerolls",
		previousText:
			"You can reroll 1's on your weapon induced damage dice, up to 2 rerolls",
	},
};

export const NoPreviousText: Story = {
	args: {
		text: "On direct creature kill, you gain advantage on your next attack",
		previousText: null,
	},
};

export const EntirelyNew: Story = {
	args: {
		text: "Critical hits with this weapon deal an additional 2d6 damage",
		previousText: "",
	},
};
