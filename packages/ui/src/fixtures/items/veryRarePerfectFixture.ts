import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { uniqueBloodthirstyFixture } from "../modifiers/unique/uniqueBloodthirsty";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";

export const veryRarePerfectFixture = new AbstractItem();
veryRarePerfectFixture.name = "Crimson Fang";
veryRarePerfectFixture.rarity = Rarity.VeryRare;
veryRarePerfectFixture.base = Equipment.Rapier;
veryRarePerfectFixture.currency = 1800;
veryRarePerfectFixture.backgroundEligible = true;
veryRarePerfectFixture.primary = [
	{ modifier: uniqueVenomousFixture, data: { float: 0 } },
	{ modifier: tieredFuryFixture, data: { float: 0 } },
];
veryRarePerfectFixture.secondary = [
	{ modifier: linearFortitudeFixture, data: { float: 0 } },
];
// Last in array → first after .reverse() → provides the RedSkull background
veryRarePerfectFixture.tertiary = [
	{ modifier: uniqueBloodthirstyFixture, data: { float: 0 } },
];
