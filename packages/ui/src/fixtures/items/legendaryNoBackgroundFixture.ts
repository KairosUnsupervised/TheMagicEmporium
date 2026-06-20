import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { independentShadowwalkerFixture } from "../modifiers/independent/independentShadowwalker";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";
import { uniqueWrathfulFixture } from "../modifiers/unique/uniqueWrathful";

export const legendaryNoBackgroundFixture = new AbstractItem();
legendaryNoBackgroundFixture.name = "Legendary Ashenfall";
legendaryNoBackgroundFixture.rarity = Rarity.Legendary;
legendaryNoBackgroundFixture.base = Equipment.Greatsword;
legendaryNoBackgroundFixture.currency = 5000;
legendaryNoBackgroundFixture.primary = [
	{ modifier: uniqueVenomousFixture, float: 0.8 },
	{ modifier: tieredFuryFixture, float: 0.7 },
	{ modifier: uniqueWrathfulFixture, float: 0.9 },
];
legendaryNoBackgroundFixture.secondary = [
	{ modifier: tieredStealthFixture, float: 0.6 },
	{ modifier: independentShadowwalkerFixture, float: 0.9 },
];
legendaryNoBackgroundFixture.tertiary = [
	{ modifier: linearFortitudeFixture, float: 0.9 },
];
