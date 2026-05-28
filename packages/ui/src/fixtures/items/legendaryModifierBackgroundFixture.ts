import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueBloodthirstyFixture } from "../modifiers/unique/uniqueBloodthirsty";

export const legendaryModifierBackgroundFixture = new AbstractItem();
legendaryModifierBackgroundFixture.name = "Legendary Skulltaker";
legendaryModifierBackgroundFixture.rarity = Rarity.Legendary;
legendaryModifierBackgroundFixture.base = Equipment.Handaxe;
legendaryModifierBackgroundFixture.currency = 3200;
legendaryModifierBackgroundFixture.backgroundEligible = true;
legendaryModifierBackgroundFixture.primary = [
	{ modifier: uniqueBloodthirstyFixture, data: { float: 0.5 } },
	{ modifier: tieredFuryFixture, data: { float: 0.7 } },
];
legendaryModifierBackgroundFixture.secondary = [
	{ modifier: tieredStealthFixture, data: { float: 0.4 } },
];
legendaryModifierBackgroundFixture.tertiary = [
	{ modifier: linearFortitudeFixture, data: { float: 0.6 } },
];
