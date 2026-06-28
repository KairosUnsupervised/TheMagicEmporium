export enum Tag {
	/**
	 * 5E Equipment types <br/>
	 * Automatically get added on equipment roll
	 */
	Armor = "ARMOR",
	ArmorWithArmorClass = "ARMOR_WITH_ARMOR_CLASS",
	ArmorLight = "ARMOR_LIGHT",
	ArmorMedium = "ARMOR_MEDIUM",
	ArmorHeavy = "ARMOR_HEAVY",
	ArmorClothes = "ARMOR_CLOTHES",
	ArmorStealthDisadvantage = "ARMOR_STEALTH_DISADVANTAGE",

	Accessory = "ACCESSORY",

	Weapon = "WEAPON",
	WeaponSimple = "WEAPON_SIMPLE",
	WeaponMartial = "WEAPON_MARTIAL",
	WeaponMelee = "WEAPON_MELEE",
	WeaponRanged = "WEAPON_RANGED",

	/**
	 * Modifier Tags, used in the packs and are placed here for reference
	 */
	Score = "SCORE", // Indicates that a modifier on the item already grants score bonuses
	Consumable = "CONSUMABLE", // Indicates that this item already has a consumable modifier applied
	Economy = "ECONOMY", // Indicates that the gold value of the item is altered
	PropertyChange = "PROPERTY_CHANGE", // Indicates that properties of the FoundryVTT item are already altered
	Appearance = "APPEARANCE", // Indicates that this item already has an appearance-altering modifier applied

	SelfImmolation = "SELF_IMMOLATION", // So that the two SelfImmolation variants exclude each other

	// Indicates that a modifier gives bonuses to a respective score category of a skill
	StrengthSkill = "STRENGTH_SKILL",
	DexteritySkill = "DEXTERITY_SKILL",
	ConstitutionSkill = "CONSTITUTION_SKILL",
	IntelligenceSkill = "INTELLIGENCE_SKILL",
	WisdomSkill = "WISDOM_SKILL",
	CharismaSkill = "CHARISMA_SKILL",
}
