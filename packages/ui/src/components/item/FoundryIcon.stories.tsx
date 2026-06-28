import type { Meta, StoryObj } from "@storybook/react-vite";
import { commonFixture } from "../../fixtures/items/commonFixture";
import { legendaryNoBackgroundFixture } from "../../fixtures/items/legendaryNoBackgroundFixture";
import { rareFixture } from "../../fixtures/items/rareFixture";
import { uncommonFixture } from "../../fixtures/items/uncommonFixture";
import { veryRareFixture } from "../../fixtures/items/veryRareFixture";
import { FoundryIcon } from "./FoundryIcon";

/**
 * A FoundryVTT-style inventory icon: a 32x32 square icon with a rarity-colored
 * border, mirroring the dnd5e actor sheet treatment.
 */
const meta = {
	title: "Components/Item/FoundryIcon",
	component: FoundryIcon,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	args: { item: commonFixture },
	render: (args) => {
		return (
			<div style={{ background: "#040510", padding: "40px" }}>
				<FoundryIcon item={args.item} size={args.size} />
			</div>
		);
	},
} satisfies Meta<typeof FoundryIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A common item — grey border. */
export const Default: Story = {
	args: { item: commonFixture },
};

/** Every rarity border color, side by side. */
export const AllRarities: Story = {
	render: () => {
		const items = [
			commonFixture,
			uncommonFixture,
			rareFixture,
			veryRareFixture,
			legendaryNoBackgroundFixture,
		];
		return (
			<div
				style={{
					background: "#040510",
					padding: "40px",
					display: "flex",
					gap: "16px",
				}}
			>
				{items.map((item) => (
					<FoundryIcon key={item.rarity} item={item} />
				))}
			</div>
		);
	},
};
