# Modifiers

**Pity** Number // Full Integer, each pity stack increased rarity luck by n amount.
**Equipment Pool Whitelist** Array // Available Equipment
**Equipment Pool Blacklist** Array // Blocked Equipment
**Rarity Luck** Float // Changes the chance to draw rarity => Luck for Rarity
**Float Luck** Float // Changes the luck generation on items => Luck for Modifiers
**Reveal** Number // How many items to reveal to the player => Reveals
**Pick** Number // How many items the user can pick in total => Pulls

This is now a number, 0 | 1 | 2 | 3 | 4 => Blind | Low | Moderate | High | Perfect Visibility
**Nothing Visible**
**Shown Image** User can see the image of the item before picking
**Shown Name + Type** User can see the name of the item before picking
**Shown Rarity** User can see the rarity of the item before picking
**Shown Modifiers**

Wording for locked: locked in, locked, forced

// TODO envelope of potential, 6 pulls, 1 reveal
`force` writes the value and locks the field — any subsequent operation targeting that field fails the entire gacha config build.
