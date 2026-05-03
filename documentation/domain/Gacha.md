# Gacha

This topic covers two related but distinct concerns:

1. **Item Generation** — given a template, produce one randomized magic item with rolled modifiers. The engine that gacha pulls, monster drops, and crafting all call into.
2. **Gacha** — the player-facing mechanic: pull currency, banners, pity, pull UX, diegetic framing.

---

# Item Generation

## Pitch
Generate a single randomized magic item from a **template**. The template controls rarity, item value, slot caps, total roll budget, and luck — but not which specific modifiers roll.

## Item type
Mostly random, slightly weighted (sword, ring, cloak, etc.).

## Naming
Composed as: `Rarity + Random Prefix + (weapon type | random name for that type)`.

## Templates
Each template defines a generation profile:

| Field | Purpose |
|---|---|
| **Rarity** | The rarity stamped on items produced from this template. |
| **Weight** | How often this template is selected when something draws against a template pool. |
| **Value range** | Gold-value range for items produced from this template (e.g. 20–50G). |
| **Total float budget** | A target sum of float values. Each rolled Float modifier deducts its float from the budget; generation of new modifiers stops when the budget reaches 0. |
| **Max primaries** | Cap on Primary slot fills (0–3). |
| **Max secondaries** | Cap on Secondary slot fills (0–3). |
| **Max tertiaries** | Cap on Tertiary slot fills (0–1). |
| **Luck** | Modifier on the float distribution. Positive luck biases floats high; negative luck biases them low. |

### Example template
> **Common** | 20–50G | 0.8 total float budget | max 2 primaries | max 2 secondaries | 0 tertiaries | negative luck

## Tag system
Generation maintains a **tag array** that grows as the item is built. Tags constrain which modifiers are eligible to roll and let modifiers exclude each other.

### Sources of tags
- **Base item type** seeds the array with type-defining tags. E.g. armor adds `Armor` and `ArmorWithAC`; a weapon adds `Weapon`, `Melee`, `Sword`, etc.
- **Modifiers** add their own tags via their `Applies` field when they roll onto the item.

### Modifier tag fields
Every modifier definition carries three tag arrays:

| Field | Behavior |
|---|---|
| **Whitelist** | At least one of these tags must be present in the current tag array for the modifier to be eligible. (Empty whitelist = no whitelist requirement.) |
| **Blacklist** | If any of these tags is present in the current tag array, the modifier is blocked from rolling. |
| **Applies** | When this modifier is selected, these tags are added to the tag array. |

### What this enables
- **Equipment-specific modifiers.** AC modifiers whitelist `ArmorWithAC` so they only roll on armor; crit modifiers whitelist `Weapon` so they only roll on weapons.
- **Soft mutual exclusion through applied tags.** Similar modifiers can block each other by applying a shared tag and blacklisting it. Example: every Saving Throw modifier applies the `SavingThrow` tag and blacklists `SavingThrow` — the first one through prevents siblings from rolling.

## Generation flow (current)
1. Pick base item type (mostly random, slightly weighted). Seed the tag array with the type's tags.
2. Select template (drives rarity, value, slot caps, float budget, luck).
3. Fill slots in fixed order — **primary, then secondary, then tertiary** — up to the per-tier caps. For each slot, candidate modifiers are eligible only if their whitelist passes and their blacklist doesn't trigger against the current tag array. When a modifier is chosen, its `Applies` tags are added to the array before the next pick.
4. Each Float modifier consumes its float from the float budget; generation stops when the budget reaches 0 even if slot caps aren't filled.
5. Roll item value within the template's value range.
6. Generate name from `Rarity + Prefix + (weapon type | random name)`.

---

# Gacha

> **Status:** Brainstorm. Not implemented. Subject to change.

## Pitch
A pull is parameterized by a set of **draw modifiers** that shape what's generated, what the player sees, and what they get to keep. A pull's draw modifiers come from a base **voucher** plus zero or more **wishes** that adjust the voucher's values.

## Draw modifiers
A pull is fully described by these values:

| Modifier | Purpose |
|---|---|
| **Pity** | Gacha pity counter (carried across pulls). |
| **Weapon Pool** | Restricts which item types can be drawn (armor / weapons / etc.). |
| **Luck Float** | Bias on float generation for items produced by this pull. Positive = better floats, negative = worse. |
| **Luck Rarity** | Bias on rarity selection for items produced by this pull. |
| **Reveal** | How many items are generated for this pull. |
| **Hidden** | What information about each generated item is visible before the player chooses. Options include: nothing, image only, name only, type only, rarity only, etc. |
| **Pick** | How many of the revealed items the player can actually keep. |
| **Guaranteed** | Guarantees that at least one generated item meets a specific condition (e.g. "one legendary"). |

## Design philosophy
There is no easy path to overpowered items. The system is built around tradeoffs:

- **Vouchers and wishes are single-use.** Consumed on pull. Acquired through gameplay.
- **Wishes carry tradeoffs.** A wish that boosts one draw modifier often comes with a penalty to another. There's no pure upside — stacking toward a great outcome requires investing many expensive wishes *or* accepting a voucher/wish combination that has both positive and negative effects.
- **Stacking is expensive, not impossible.** A player *can* build a pull that guarantees a high-rarity item with good floats, but it costs a lot of accumulated wishes. That's the reward for long-term play, not a shortcut.

## Vouchers
A voucher defines the base values for a pull's draw modifiers. It's the "what kind of pull is this" object.

Example: a voucher with `reveal: 5, pick: 1` generates 5 items, of which the player picks 1.

## Wishes
Wishes are modifiers applied on top of a voucher to tweak its draw modifiers. They can increase or decrease individual values.

Example: applying a `pick +2` wish to a `reveal: 5, pick: 1` voucher results in `reveal: 5, pick: 3` — the player now picks 3 of the 5 revealed items.

## Pull resolution (sketch)
1. Start with a voucher's base draw modifiers.
2. Apply any active wishes to adjust the values.
3. Generate `reveal` items via Item Generation, applying Luck Float / Luck Rarity / Weapon Pool as constraints.
4. Show the items to the player according to the `Hidden` setting.
5. Player chooses up to `Pick` items to keep; the rest are discarded.
6. Update pity counter.

## Technical implementation
- **Vouchers and wishes are standard FoundryVTT items** with their draw modifier values stored as item metadata (flags). GMs can create, edit, and distribute them using Foundry's normal item workflows. 100% customizable — no hardcoded voucher or wish types.
- **Max wishes per pull** — configurable via FoundryVTT world settings (not hardcoded).
- **Soft pity threshold** — configurable via FoundryVTT world settings.
