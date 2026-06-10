import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rarity } from "@tme/library/src/item/item.types";
import type { JSX } from "react";
import { useState } from "react";
import { PullSummon } from "./PullSummon";

interface SummonLoopProps {
	rarity: Rarity;
	revealRarity: boolean;
	forceCat?: boolean;
}

const SummonLoop = (props: SummonLoopProps): JSX.Element => {
	const [iteration, setIteration] = useState(0);

	const handleComplete = (): void => {
		setTimeout(() => setIteration((i) => i + 1), 900);
	};

	return (
		<PullSummon
			key={iteration}
			rarity={props.rarity}
			revealRarity={props.revealRarity}
			forceCat={props.forceCat}
			onComplete={handleComplete}
		/>
	);
};

const meta = {
	title: "Components/Gacha/Pull/PullSummon",
	component: PullSummon,
	parameters: {
		layout: "centered",
		backgrounds: { default: "dark" },
	},
	argTypes: {
		rarity: {
			control: { type: "select" },
			options: Object.values(Rarity),
		},
		revealRarity: {
			control: { type: "boolean" },
		},
		forceCat: {
			control: { type: "boolean" },
		},
		onComplete: { table: { disable: true } },
	},
	render: (args: {
		rarity: Rarity;
		revealRarity: boolean;
		forceCat?: boolean;
	}) => {
		return (
			<div className="dark" style={{ padding: "48px", background: "#07091a" }}>
				<SummonLoop
					rarity={args.rarity}
					revealRarity={args.revealRarity}
					forceCat={args.forceCat}
				/>
			</div>
		);
	},
} satisfies Meta<typeof PullSummon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		rarity: Rarity.Legendary,
		revealRarity: true,
		onComplete: () => console.log("complete"),
	},
};

export const UnknownRarity: Story = {
	args: {
		rarity: Rarity.Common,
		revealRarity: false,
		onComplete: () => console.log("complete"),
	},
};

export const RareTease: Story = {
	args: {
		rarity: Rarity.Rare,
		revealRarity: true,
		onComplete: () => console.log("complete"),
	},
};

export const CatBlessing: Story = {
	args: {
		rarity: Rarity.Legendary,
		revealRarity: true,
		forceCat: true,
		onComplete: () => console.log("complete"),
	},
};
