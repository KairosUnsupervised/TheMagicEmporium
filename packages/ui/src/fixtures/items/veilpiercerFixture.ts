import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";
import { uniqueWrathfulFixture } from "../modifiers/unique/uniqueWrathful";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { independentShadowwalkerFixture } from "../modifiers/independent/independentShadowwalker";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";

export const veilpiercerFixture = new AbstractItem();
veilpiercerFixture.name = "Legendary Veilpiercer";
veilpiercerFixture.rarity = Rarity.Legendary;
veilpiercerFixture.base = Equipment.Longsword;
veilpiercerFixture.currency = 2500;

veilpiercerFixture.primary = [
    { modifier: uniqueVenomousFixture, data: { float: 0.6 } },
    { modifier: tieredFuryFixture, data: { float: 0.6 } },
    { modifier: uniqueWrathfulFixture, data: { float: 0 } },
];

veilpiercerFixture.secondary = [
    { modifier: tieredStealthFixture, data: { float: 0.5 } },
    { modifier: independentShadowwalkerFixture, data: { float: 0.5 } },
];

veilpiercerFixture.tertiary = [
    { modifier: linearFortitudeFixture, data: { float: 0.7 } },
];
