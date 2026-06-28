# Design Principles

A reference for creating modifiers in The Magic Emporium. Design rules, naming conventions, and structural guidelines.

---

## Mental Load Belongs to the Player, Not the DM

The mental load of a modifier should sit on the **player's own character**. The player tracks what their item does and when it triggers. The DM should never have to roll dice for it, or even remember that a specific modifier exists.

### No Backtracking
If the player forgets to use an effect, it's lost. Backtracking is fiddly and eats table time for changes that rarely matter.

---

## Prefer Quick Rulings Over Precise Rules

Keep descriptions and disclaimers short and evocative, just enough for a player to grasp the modifier at a glance. Don't try to cover every edge case in the text.

When something is unclear, make a quick ruling and play it as intended. Don't lawyer the rules.

---

## Slot Restrictions

Restrictions control which slot a modifier can occupy.

- `PRIMARY` - Weaker modifiers, mostly UNIQUE, LINEAR, and INDEPENDENT types
- `SECONDARY` - Stronger modifiers, mostly TIERED and LINEAR, plus consumable effects
- `TERTIARY` - Legendary-tier modifiers, the strongest in the pool

---

## Weights

Weight decides how often a modifier shows up in the loot pool. The default is **1024**, and setting it to `0` removes the modifier entirely. To make a modifier stronger or weaker, change its slot restriction rather than its weight.

When several modifiers cover the same conceptual space, make them mutually exclusive with `blacklistedBy` tags and split their weights so they add up to one normal modifier's chance of appearing.

---

## Breakpoints

Breakpoints set how strong a modifier is at a given float. They're top-heavy: the stronger an effect, the less likely it is to roll. The JSON schema ships with sane defaults.

---

## Wordings

Shared definitions for keywords that are easy to misread.

- `creature` - Any creature in D&D. Modifiers using this word shouldn't be stackable, so low-tier mobs can't be farmed for insane effects
- `hostile` - A hostile creature the DM considers "opponent-worthy"; simply starting combat with low-tier mobs doesn't qualify
- `direct kill` - Landing the final hit on a creature. For an effect, the player responsible for it counts as having landed the last hit
- `tagged (hostile / creature) dies` - A creature you've tagged with a successful attack or effect; the effect doesn't need to deal damage to count. After a DM-judged stretch of inactivity, the creature is no longer tagged (a creature that successfully flees combat is not tagged anymore)
- `temporary HP` - Temporary HP doesn't stack; only the highest value applies
- `attacks` - Includes every type of attack
- `weapon / melee / ranged & spell attacks` - The specific attack types
