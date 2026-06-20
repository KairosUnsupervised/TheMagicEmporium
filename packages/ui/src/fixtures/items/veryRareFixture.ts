import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { independentShadowwalkerFixture } from "../modifiers/independent/independentShadowwalker";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";

export const veryRareFixture = new AbstractItem();
veryRareFixture.name = "Very Rare Wraithblade";
veryRareFixture.rarity = Rarity.VeryRare;
veryRareFixture.base = Equipment.Shortsword;
veryRareFixture.currency = 1200;
veryRareFixture.primary = [
	{ modifier: uniqueVenomousFixture, float: 0.5 },
	{ modifier: tieredFuryFixture, float: 0.5 },
];
veryRareFixture.secondary = [
	{ modifier: tieredStealthFixture, float: 0.4 },
	{ modifier: independentShadowwalkerFixture, float: 0.3 },
];
