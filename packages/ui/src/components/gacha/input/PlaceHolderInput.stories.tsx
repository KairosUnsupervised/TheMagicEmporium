import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import dummy from "./dummy.jpg";
import { PlaceHolderInput } from "./PlaceHolderInput";

const ITEMS = [
	{ id: "1", name: "Ember Ring", image: dummy },
	{ id: "2", name: "Frost Shard", image: dummy },
	{ id: "3", name: "Shadow Veil", image: dummy, disabled: true },
	{ id: "4", name: "Sun Crest", image: dummy },
	{ id: "5", name: "Void Stone", image: dummy },
];

const meta = {
	title: "Components/Gacha/PlaceHolderInput",
	component: PlaceHolderInput,
	parameters: {
		layout: "centered",
	},
	render: () => {
		const [selectedId, setSelectedId] = useState<string | null>(null);
		return (
			<div className="dark" style={{ padding: "220px 240px" }}>
				<PlaceHolderInput
					items={ITEMS}
					selectedId={selectedId}
					onSelect={setSelectedId}
					onClear={() => setSelectedId(null)}
				/>
			</div>
		);
	},
} satisfies Meta<typeof PlaceHolderInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
