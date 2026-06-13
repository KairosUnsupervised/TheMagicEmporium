# Rarity Balancing

Why the forge rarity weights in `packages/library/src/forge/forge.templates.ts`
are set the way they are.

## Base Distribution

Per-item base rate weigh:

| Tier      | Weight | Rate |
|-----------|--------|------|
| Common    | 58000  | 58%  |
| Uncommon  | 27000  | 27%  |
| Rare      | 10000  | 10%  |
| Very Rare | 4000   | 4%   |
| Legendary | 1000   | 1%   |

Within each tier, the weight is split across different sub-templates to have a larger range of unique feeling variants. Differences between these templates include:
- **Slot Layouts** Secondary slots are stronger than primary slots, templates have a trade of between the amount of slots available.
- **Base Modifier Luck / Total Amount of Slots** Trade of between the strength of modifiers and the total amount of modifiers.
- **Background Eligibility** Higher rarities have a higher chance to have a background

# The Pull - Levers
A base 1% chance seems quite low. However, unlike normal gacha a one to one pull system is not used.
The player can substantially increase their chances to higher rarity items by effectively using envelopes and wishes.
If players have a feeling that they are not getting the desired rarity, try being more generous with wishes and encourage the use of them.

- **Reveals** Increase the total number of items the player can choose from
- **Rarity To Luck** Increases the chance of higher rarities, works like D&D advantage
- **Visibility** Allows the player to effectively select items and rarities they want
- **Whitelist** Allows the player to effectively get more useful items for their class
- **Pulls** Doesn't directly affect rarity. However, it is a good means to an end by being able to sell those items for profit
- **Economy** Being able to sell items and buy envelopes and wishes (I recommend a randomized fashion) increased the amount they can gamble substantially.
It also adds a direct sink for unwanted items and high value items with non useful modifiers.
