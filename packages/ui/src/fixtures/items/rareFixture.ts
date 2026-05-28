import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";

export const rareFixture = new AbstractItem();
rareFixture.name = "Rare Emberbrand";
rareFixture.rarity = Rarity.Rare;
rareFixture.base = Equipment.Longsword;
rareFixture.currency = 500;
rareFixture.primary = [
	{ modifier: uniqueVenomousFixture, data: { float: 0.4 } },
	{ modifier: tieredFuryFixture, data: { float: 0.3 } },
];
rareFixture.secondary = [
	{ modifier: tieredStealthFixture, data: { float: 0.3 } },
];
