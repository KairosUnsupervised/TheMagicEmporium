import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { independentShadowwalkerFixture } from "../modifiers/independent/independentShadowwalker";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";
import { uniqueWrathfulFixture } from "../modifiers/unique/uniqueWrathful";

export const veilpiercerFixture = new AbstractItem();
veilpiercerFixture.name = "Legendary Veilpiercer";
veilpiercerFixture.rarity = Rarity.Legendary;
veilpiercerFixture.base = Equipment.Longsword;
veilpiercerFixture.currency = 2500;

veilpiercerFixture.primary = [
	{ modifier: uniqueVenomousFixture, float: 0.6 },
	{ modifier: tieredFuryFixture, float: 0.6 },
	{ modifier: uniqueWrathfulFixture, float: 0 },
];

veilpiercerFixture.secondary = [
	{ modifier: tieredStealthFixture, float: 0.5 },
	{ modifier: independentShadowwalkerFixture, float: 0.5 },
];

veilpiercerFixture.tertiary = [
	{ modifier: linearFortitudeFixture, float: 0.7 },
];
