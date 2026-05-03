# Crafting

## Pitch
PoE-like crafting system that operates on existing randomized magic items by manipulating their modifier slots. Results are always random, but the risk model is configurable.

## Risk models
The system supports multiple risk models. Which one is active is a design/campaign choice (not yet decided whether this is a world setting, per-item, or per-craft-action).

| Model | Failure behavior |
|---|---|
| **No Risk** | Every craft succeeds. Results are still random. |
| **Durability** | Each failed craft removes a durability point. Item is destroyed at 0. |
| **Instant Destroy** | A failed craft immediately destroys the item. |
| **Potential** | Item has a set potential value. Each craft (success or fail) removes one potential. Item cannot be crafted on at 0 potential. |
| **Potential Chance** | Item has a set potential value. Each craft has a *chance* to remove one potential. Item cannot be crafted on at 0 potential. |

### Open: Potential loss + craft success interaction
When potential is lost due to chance, does the craft itself succeed or fail? Three options on the table:

| Option | Outcome | Feel |
|---|---|---|
| **Succeed + lose** | Craft succeeds, potential is removed. | "Lucky tax" — you got what you wanted but paid extra for it. |
| **Fail + lose** | Craft fails, potential is removed. | Double punishment — harsh, may discourage crafting entirely. |
| **Independent rolls** | Potential loss and craft success are separate rolls (four possible outcomes). | Most granular, hardest to explain to players. |

The choice shapes whether potential loss is "a cost of doing business" or "a catastrophe."

## Current state
Crafting actions (what you actually *do* to an item — reroll a slot, lock a modifier, upgrade rarity, etc.) are not yet defined. See `ideas.md` → Crafting section for concepts under consideration.
