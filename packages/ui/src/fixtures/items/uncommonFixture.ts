import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";

export const uncommonFixture = new AbstractItem();
uncommonFixture.name = "Uncommon Thornwood Bow";
uncommonFixture.rarity = Rarity.Uncommon;
uncommonFixture.base = Equipment.Longbow;
uncommonFixture.currency = 120;
uncommonFixture.primary = [
	{ modifier: uniqueVenomousFixture, float: 0.3 },
	{ modifier: tieredFuryFixture, float: 0.2 },
];
