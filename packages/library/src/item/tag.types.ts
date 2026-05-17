export enum Tag {
	/**
	 * 5E Equipment types <br/>
	 * Automatically get added on equipment roll
	 */
	Armor = 'ARMOR',
	ArmorWithArmorClass = 'ARMOR_WITH_ARMOR_CLASS',
	ArmorLight = 'ARMOR_LIGHT',
	ArmorMedium = 'ARMOR_MEDIUM',
	ArmorHeavy = 'ARMOR_HEAVY',
	ArmorClothes = 'ARMOR_CLOTHES',
	ArmorStealthDisadvantage = 'ARMOR_STEALTH_DISADVANTAGE',

	Accessory = 'ACCESSORY',

	Weapon = 'WEAPON',
	WeaponSimple = 'WEAPON_SIMPLE',
	WeaponMartial = 'WEAPON_MARTIAL',
	WeaponMelee = 'WEAPON_MELEE',
	WeaponRanged = 'WEAPON_RANGED',

	/**
	 * Modifier Tags
	 */
	Score = 'SCORE', // Indicates that a modifier on the item already grants score bonuses
	Consumable = 'CONSUMABLE', // Indicates that this item already has a consumable modifier applied
	SelfImmolation = 'SELF_IMMOLATION',
	Economy = "ECONOMY",
	PropertyChange = "PROPERTY_CHANGE",

	/**
	 * Skill Modifier Tags
	 */
	StrengthSkill = 'STRENGTH_SKILL',
	DexteritySkill = 'DEXTERITY_SKILL',
	ConstitutionSkill = 'CONSTITUTION_SKILL',
	IntelligenceSkill = 'INTELLIGENCE_SKILL',
	WisdomSkill = 'WISDOM_SKILL',
	CharismaSkill = 'CHARISMA_SKILL',

	/**
	 * 5E Cursed stats <br/>
	 * Negative modifiers apply them so positive modifiers affecting the same stat can blacklist them
	 */
	StatStrengthCursed = 'STAT_STRENGTH_CURSED',
	StatDexterityCursed = 'STAT_DEXTERITY_CURSED',
	StatConstitutionCursed = 'STAT_CONSTITUTION_CURSED',
	StatIntelligenceCursed = 'STAT_INTELLIGENCE_CURSED',
	StatWisdomCursed = 'STAT_WISDOM_CURSED',
	StatCharismaCursed = 'STAT_CHARISMA_CURSED',

	/**
	 * @DEPRECATED Passive got removed with v2
	 */
	StatPassivesCursed = 'STAT_PASSIVES_CURSED',

	/**
	 * 5E Cursed combat effects <br/>
	 * Negative modifiers apply them so positive modifiers affecting the same stat can blacklist them
	 * @DEPRECATED Curses got removed with v2
	 */
	CombatReactionCursed = 'COMBAT_REACTION_CURSED',
	CombatArmorClassCursed = 'COMBAT_ARMOR_CLASS_CURSED',
	CombatMovementCursed = 'COMBAT_MOVEMENT_CURSED',
	CombatInitiativeCursed = 'COMBAT_INITIATIVE_CURSED',
	CombatDamageTypeChanged = 'COMBAT_DAMAGE_TYPE_CHANGED',

	/**
	 * Tags for artifact generation
	 * @DEPRECATED Power level and scaling got removed with v2
	 */
	ScalingModifier = 'SCALING_MODIFIER',

	/**
	 * Modifier tags
	 */
	ModArmorClass = 'MOD_ARMOR_CLASS',
	ModCharismaSkill = 'MOD_CHARISMA_SKILL',
	ModConstitutionSkill = 'MOD_CONSTITUTION_SKILL',
	ModDexteritySkill = 'MOD_DEXTERITY_SKILL',
	ModIntelligenceSkill = 'MOD_INTELLIGENCE_SKILL',
	ModStrengthSkill = 'MOD_STRENGTH_SKILL',
	ModWisdomSkill = 'MOD_WISDOM_SKILL',
}
