# Magic Items

## Pitch
Randomized magic items in the spirit of Path of Exile, brought into D&D 5e with a high level of automation. Items roll their properties from a modifier pool gated by rarity. Primarily used by players; GMs can use them but it gets unwieldy at scale.

## Generated properties
At generation time, the following are randomly rolled and then locked for the item's lifetime:
- **Rarity** — uses the standard D&D 5e scale (Common, Uncommon, Rare, Very Rare, Legendary).
- **Type** — the base item type (sword, ring, cloak, etc.).
- **Name** — procedurally generated.

## Slot structure
Every randomized item has a fixed slot layout:

| Tier | Count | Filled by |
|---|---|---|
| Primary | 3 | Stat-style modifiers (stat increases) |
| Secondary | 3 | Active abilities / enchantments |
| Tertiary | 1 | Legendary, powerful effects |

A modifier is locked to exactly one tier — a primary modifier can never roll into a secondary or tertiary slot, and vice versa. A given modifier can appear at most once per item; stacking the same modifier requires it to roll on multiple items.

## Attunement
A player can attune up to three items at once. Modifiers from attuned items aggregate at the **player level** — that is, the same modifier rolled across multiple attuned items combines according to its stacking type.

Attunement can only be changed during a short rest. No mid-combat or free swapping.

## Modifier data model
Every modifier instance carries two pieces of data:
- **Float** — a value in `[0, 1]`, rolled at generation and stored on the item. Only present on Float-variant modifiers.
- **Internal power** — a numeric power level, statically defined at the modifier definition level (not stored per-instance; derived from the modifier definition and, for Float variants, from the float).

Stacking on the player happens on **internal power**, not on float values. Each attuned modifier instance resolves to an internal power, those powers combine, and the combined power maps to a single effect for the character.

### Variants
| Variant | Power resolution |
|---|---|
| **No Float** | Internal power is fixed by the modifier definition. |
| **Float** | The modifier definition specifies breakpoints over `[0, 1]`. The rolled float is mapped through those breakpoints to an internal power level. |

The float is rolled once at generation and locked for the item's lifetime.

## Stacking types
Each modifier declares one of the following stacking behaviors. These describe how multiple instances on attuned items combine:

| Type | Stacking behavior |
|---|---|
| **Unique** | Does not stack. Only one instance is ever active, regardless of how many attuned items roll it. |
| **Item Bound** | Applies to the item, not the player. No player-level stacking. Multiple copies each affect their own item independently. |
| **Linear** | Internal powers sum at the player level (e.g. power 1 + power 1 = power 2). |
| **Tiered** | Internal powers sum at the player level on a doubling scale: T1 = 1, T2 = 2, T3 = 4, T4 = 8. Reaching the next tier requires combined power equal to that tier's threshold. See subtypes below. |

### Tiered subtypes
| Subtype | Generates up to | Maximum reachable |
|---|---|---|
| **Capped at T3** | T3 (power 4) | T3 — cannot exceed. |
| **Capped at T4** | T3 (power 4) | T4 (power 8) — only by combining two T3s. T4 unlocks special powers/effects. |

In neither case does a T4 modifier generate naturally — T4 is only reachable by stacking. Tiered Float modifiers can generate at T1/T2/T3 depending on the float, still subject to the no-T4-generation rule.

## Modifier management
- **Content packs.** Modifiers can be distributed as installable content packs. GMs can install multiple packs to expand the available modifier pool.
- **Per-modifier toggles.** Individual modifiers can be enabled or disabled by the GM, regardless of which pack they come from. This allows fine-tuning the active pool without uninstalling entire packs.
- **Custom modifiers.** GMs can author their own modifiers from scratch using the same format as pack-provided ones. Custom modifiers participate in the generation pool alongside pack modifiers.

## Scope
- **In scope:** randomized slot-based items, automated rolling, player-facing usage.
- **Out of scope:** replacing hand-authored named items (Vorpal Sword etc.); large-scale GM use.
