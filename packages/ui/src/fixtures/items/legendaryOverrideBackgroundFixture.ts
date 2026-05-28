import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { independentShadowwalkerFixture } from "../modifiers/independent/independentShadowwalker";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";
import { uniqueWrathfulFixture } from "../modifiers/unique/uniqueWrathful";
import boundlessSpirit from "./BoundlessSpirit.jpg";

export const legendaryOverrideBackgroundFixture = new AbstractItem();
legendaryOverrideBackgroundFixture.name = "Legendary Veilpiercer";
legendaryOverrideBackgroundFixture.rarity = Rarity.Legendary;
legendaryOverrideBackgroundFixture.base = Equipment.Longsword;
legendaryOverrideBackgroundFixture.currency = 2500;
legendaryOverrideBackgroundFixture.backgroundOverride = boundlessSpirit;
legendaryOverrideBackgroundFixture.primary = [
	{ modifier: uniqueVenomousFixture, data: { float: 0.6 } },
	{ modifier: tieredFuryFixture, data: { float: 0.6 } },
	{ modifier: uniqueWrathfulFixture, data: { float: 0 } },
];
legendaryOverrideBackgroundFixture.secondary = [
	{ modifier: tieredStealthFixture, data: { float: 0.5 } },
	{ modifier: independentShadowwalkerFixture, data: { float: 0.5 } },
];
legendaryOverrideBackgroundFixture.tertiary = [
	{ modifier: linearFortitudeFixture, data: { float: 0.7 } },
];
