import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";

export const commonFixture = new AbstractItem();
commonFixture.name = "Common Iron Dagger";
commonFixture.rarity = Rarity.Common;
commonFixture.base = Equipment.Dagger;
commonFixture.currency = 5;
commonFixture.primary = [
	{ modifier: uniqueVenomousFixture, float: 0.1 },
];
