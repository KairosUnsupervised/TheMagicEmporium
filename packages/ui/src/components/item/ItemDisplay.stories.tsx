import type { Meta, StoryObj } from "@storybook/react-vite";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import type { AppliedModifier } from "@tme/library/src/modifiers/Modifier";
import { veilpiercerFixture } from "../../fixtures/items/veilpiercerFixture";
import { independentShadowwalkerFixture } from "../../fixtures/modifiers/independent/independentShadowwalker";
import { linearFortitudeFixture } from "../../fixtures/modifiers/linear/linearFortitude";
import { tieredFuryFixture } from "../../fixtures/modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../../fixtures/modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../../fixtures/modifiers/unique/uniqueVenomous";
import { uniqueWrathfulFixture } from "../../fixtures/modifiers/unique/uniqueWrathful";
import { ItemDisplay, type ItemDisplayProps } from "./ItemDisplay";
import boundlessSpirit from "./img/BoundlessSpirit.jpg";

interface ItemConfig {
	primary?: AppliedModifier[];
	secondary?: AppliedModifier[];
	tertiary?: AppliedModifier[];
}

const makeItem = (
	name: string,
	rarity: Rarity,
	base: Equipment,
	currency: number,
	config: ItemConfig = {},
): AbstractItem => {
	const item = new AbstractItem();
	item.name = name;
	item.rarity = rarity;
	item.base = base;
	item.currency = currency;
	item.primary = config.primary ?? [];
	item.secondary = config.secondary ?? [];
	item.tertiary = config.tertiary ?? [];
	return item;
};

const p1 = [{ modifier: uniqueVenomousFixture, data: { float: 0.6 } }];
const p2 = [...p1, { modifier: tieredFuryFixture, data: { float: 0.6 } }];
const p3 = [...p2, { modifier: uniqueWrathfulFixture, data: { float: 0 } }];
const s1 = [{ modifier: tieredStealthFixture, data: { float: 0.5 } }];
const s2 = [
	...s1,
	{ modifier: independentShadowwalkerFixture, data: { float: 0.5 } },
];
const t1 = [{ modifier: linearFortitudeFixture, data: { float: 0.7 } }];

const meta = {
	title: "Components/Item",
	component: ItemDisplay,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: ItemDisplayProps) => (
		<div style={{ background: "#040510", padding: "40px" }}>
			<ItemDisplay item={props.item} image={props.image} />
		</div>
	),
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { item: veilpiercerFixture, image: boundlessSpirit },
};

export const NoBackground: Story = {
	args: { item: veilpiercerFixture },
};

export const Common: Story = {
	args: {
		item: makeItem("Common Iron Dagger", Rarity.Common, Equipment.Dagger, 5, {
			primary: p1,
		}),
	},
};

export const Uncommon: Story = {
	args: {
		item: makeItem(
			"Uncommon Thornwood Bow",
			Rarity.Uncommon,
			Equipment.Longbow,
			120,
			{
				primary: p2,
			},
		),
	},
};

export const Rare: Story = {
	args: {
		item: makeItem("Rare Stormcaller", Rarity.Rare, Equipment.Longsword, 800, {
			primary: p3,
			secondary: s1,
		}),
	},
};

export const VeryRare: Story = {
	args: {
		item: makeItem(
			"Very Rare Soulrender",
			Rarity.VeryRare,
			Equipment.Greatsword,
			4000,
			{
				primary: p3,
				secondary: s2,
			},
		),
	},
};

export const Legendary: Story = {
	args: {
		item: makeItem(
			"Legendary Veilpiercer",
			Rarity.Legendary,
			Equipment.Longsword,
			2500,
			{
				primary: p3,
				secondary: s2,
				tertiary: t1,
			},
		),
		image: boundlessSpirit,
	},
};
