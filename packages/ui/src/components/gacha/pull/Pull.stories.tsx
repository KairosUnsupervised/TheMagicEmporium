import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, NumberOperation } from "@tme/shared/src/types/GachaItem5e";
import type { JSX } from "react";
import { useMemo } from "react";
import { GachaContext } from "../../../context/gacha/GachaContextProvider";
import { Gacha } from "../../../context/gacha/library/Gacha";
import { envelopeOfGoldenBlessingFixture } from "../../../fixtures/gacha/envelopes/EnvelopeOfGoldenBlessing";
import { commonFixture } from "../../../fixtures/items/commonFixture";
import { legendaryModifierBackgroundFixture } from "../../../fixtures/items/legendaryModifierBackgroundFixture";
import { rareFixture } from "../../../fixtures/items/rareFixture";
import { uncommonFixture } from "../../../fixtures/items/uncommonFixture";
import { veryRareFixture } from "../../../fixtures/items/veryRareFixture";
import { Pull } from "./Pull";

const fiveItems = [
	commonFixture,
	uncommonFixture,
	rareFixture,
	veryRareFixture,
	legendaryModifierBackgroundFixture,
];

/**
 * Pull reads everything (drawn items, pick count, visibility) from the gacha
 * context, so each story seeds a standalone Gacha instance and supplies it
 * through a provider rather than passing props.
 */
const buildContext = (picks: number, visibility: number): Gacha => {
	const instance = new Gacha();
	instance.pullSelect.items = fiveItems;
	instance.pullSelect.phase = "selecting";
	instance.pullSelect.isOpen = true;
	instance.pullSelect.process.applyOperation({
		field: Field.PickAmount,
		op: NumberOperation.Set,
		value: picks,
	});
	// getVisibility() only honours the level when an envelope is selected
	instance.inventory.envelopeSelected = envelopeOfGoldenBlessingFixture;
	instance.pullProcess.applyOperation({
		field: Field.VisibilityLevel,
		op: NumberOperation.Set,
		value: visibility,
	});
	return instance;
};

interface PullStoryProps {
	picks: number;
	visibility: number;
}

const PullStory = (props: PullStoryProps): JSX.Element => {
	const context = useMemo(
		() => buildContext(props.picks, props.visibility),
		[props.picks, props.visibility],
	);
	return (
		<GachaContext.Provider value={context}>
			<div className="dark" style={{ padding: "48px", background: "#07091a" }}>
				<Pull />
			</div>
		</GachaContext.Provider>
	);
};

/**
 * The pull selection grid: shows the drawn items and lets the player pick up to
 * `picks` of them at the current `visibility`, then seal their choice.
 */
const meta = {
	title: "Components/Gacha/Pull/Pull",
	component: Pull,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark" },
	},
} satisfies Meta<typeof Pull>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Two picks at high visibility. */
export const Default: Story = {
	render: () => <PullStory picks={2} visibility={3} />,
};

/** Zero visibility — items are obscured until revealed. */
export const Blind: Story = {
	render: () => <PullStory picks={2} visibility={0} />,
};

/** One pick at moderate visibility. */
export const SinglePick: Story = {
	render: () => <PullStory picks={1} visibility={2} />,
};

/** Five picks at perfect visibility — every item is selectable. */
export const PickAll: Story = {
	render: () => <PullStory picks={5} visibility={4} />,
};
