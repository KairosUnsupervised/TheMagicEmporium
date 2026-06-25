import type { Meta, StoryObj } from "@storybook/react-vite";
import { commonFixture } from "../../../fixtures/items/commonFixture";
import { legendaryModifierBackgroundFixture } from "../../../fixtures/items/legendaryModifierBackgroundFixture";
import { rareFixture } from "../../../fixtures/items/rareFixture";
import type { VignetteStage } from "../content/Vignette";
import { PullItem } from "./PullItem";

/**
 * A single drawn item card. Renders rarity, icon, and modifier pips, adapts to
 * the current `visibility` stage, and can play a reveal animation.
 */
const meta = {
	title: "Components/Gacha/Pull/PullItem",
	component: PullItem,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark" },
	},
	argTypes: {
		visibility: {
			control: { type: "select" },
			options: [0, 1, 2, 3, 4],
		},
		selected: {
			control: { type: "boolean" },
		},
	},
	render: (args: { visibility: VignetteStage; selected: boolean }) => {
		return (
			<div className="dark" style={{ padding: "40px", background: "#07091a" }}>
				<PullItem
					item={rareFixture}
					visibility={args.visibility}
					selected={args.selected}
				/>
			</div>
		);
	},
} satisfies Meta<typeof PullItem>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Blind stage, unselected. */
export const Default: Story = {
	args: { visibility: 0, selected: false },
};

/** The same item across all five visibility stages (Blind → Perfect). */
export const AllStages: Story = {
	render: () => {
		const stages: VignetteStage[] = [0, 1, 2, 3, 4];
		const labels = ["Blind", "Low", "Moderate", "High", "Perfect"];
		return (
			<div
				className="dark"
				style={{
					padding: "40px",
					background: "#07091a",
					display: "flex",
					gap: "20px",
					alignItems: "flex-start",
				}}
			>
				{stages.map((stage, i) => (
					<div
						key={stage}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<PullItem
							item={legendaryModifierBackgroundFixture}
							visibility={stage}
						/>
						<span
							style={{
								fontFamily: "Cinzel Decorative, serif",
								fontSize: "8px",
								letterSpacing: "1.5px",
								textTransform: "uppercase",
								color: "rgba(212,166,74,0.5)",
							}}
						>
							{labels[i]}
						</span>
					</div>
				))}
			</div>
		);
	},
};

/** A common item at perfect visibility. */
export const Common: Story = {
	render: () => (
		<div className="dark" style={{ padding: "40px", background: "#07091a" }}>
			<PullItem item={commonFixture} visibility={4} />
		</div>
	),
};

/** A legendary item at perfect visibility, showing its modifier background. */
export const Legendary: Story = {
	render: () => (
		<div className="dark" style={{ padding: "40px", background: "#07091a" }}>
			<PullItem item={legendaryModifierBackgroundFixture} visibility={4} />
		</div>
	),
};

/** Cards playing their staggered reveal animation. */
export const Revealed: Story = {
	render: () => (
		<div
			className="dark"
			style={{
				padding: "40px",
				background: "#07091a",
				display: "flex",
				gap: "20px",
			}}
		>
			<PullItem item={rareFixture} visibility={4} revealed={true} />
			<PullItem
				item={legendaryModifierBackgroundFixture}
				visibility={4}
				revealed={true}
				revealDelay={0.15}
			/>
		</div>
	),
};
