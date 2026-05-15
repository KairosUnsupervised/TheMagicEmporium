# Creating New Modifiers

This guide walks through how to add new modifiers to The Magic Emporium.

---

## Packs

Modifiers are organised into **packs** — JSON files that group related modifiers together. Each pack has a unique `id`,
a display `name`, a `description`, and an `enabled` flag that controls whether its modifiers can be rolled onto items.

```json
{
  "id": "my-pack",
  "name": "My Pack",
  "description": "A collection of custom modifiers.",
  "enabled": true,
  "modifiers": [ ]
}
```

Each pack file lives in the world's data directory under `the-magic-emporium/packs/`. Adding a new file there is all
that is needed to register a new pack — no code changes required.

---

## Modifiers

A modifier is one entry inside the `modifiers` array of a pack. Every modifier needs:

| Field        | Description                                                                                  |
|--------------|----------------------------------------------------------------------------------------------|
| `identifier` | A unique ID for this modifier. Use `SOURCE.SCREAMING_SNAKE_CASE` (e.g. `TME.IRON_GRIP`).    |
| `type`       | The modifier type — controls how its value is calculated. See the type docs below.           |
| `application`| Controls when and how this modifier can be applied to an item (weight, slot restriction, tag filters). |
| `flavor`     | The `title`, `description`, and optional `disclaimer` shown in the UI.                       |

---

## Modifier Types

There are currently four modifier types. Choose the one that matches how the bonus should behave:

| Type          | Use when…                                                                             | Reference                                        |
|---------------|---------------------------------------------------------------------------------------|--------------------------------------------------|
| `UNIQUE`      | The bonus is fixed — the same regardless of how many items carry it.                  | [UniqueModifier.md](UniqueModifier.md)            |
| `LINEAR`      | The bonus scales by a float and a number changes via `{amount}`.                      | [LinearModifier.md](LinearModifier.md)            |
| `TIERED`      | Different power levels apply qualitatively different effects, and instances stack.    | [TieredModifier.md](TieredModifier.md)            |
| `INDEPENDENT` | The modifier patches the item document directly or adds abilities to the item itself. | [IndependentModifier.md](IndependentModifier.md)  |

---

## Effect Types

There are four kinds of effect a modifier can produce. They split cleanly by **where they land**:

### Player-level effects

These are applied to the **character** when the item is equipped and attuned. They are defined on
`UNIQUE`, `LINEAR`, and `TIERED` modifiers.

| Field           | Type            | Use when…                                                                             | Reference                              |
|-----------------|-----------------|---------------------------------------------------------------------------------------|----------------------------------------|
| `activeEffects` | `ACTIVE_EFFECT` | You want a silent, always-on stat change (e.g. +2 Strength).                         | [ActiveEffects.md](parts/ActiveEffects.md)   |
| `feats`         | `FEAT`          | You want a named ability on the character sheet with optional actions.                | [Feats.md](parts/Feats.md)                   |

Both arrays are independent — a single breakpoint or tier can contain any number of entries in either.
An empty `feats` array and an empty `activeEffects` array (the default) produces a passive feat using
the modifier's flavor text.

### Item-level effects

These are applied to the **item document** itself. They are used exclusively by `INDEPENDENT` modifiers.

| Field        | Use when…                                                                                  | Reference                                      |
|--------------|--------------------------------------------------------------------------------------------|------------------------------------------------|
| `changes`    | You want to patch a numeric, string, or boolean field on the item (e.g. magical bonus).    | [IndependentModifier.md](IndependentModifier.md) |
| `activities` | You want to attach an action, bonus action, or other ability directly to the item.         | [IndependentModifier.md](IndependentModifier.md) |

---

## Minimal Example

A fixed +1 to Armor Class, available on any armor:

```json
{
  "identifier": "TME.IRON_PLATING",
  "type": "UNIQUE",
  "application": {
    "weight": 1,
    "restriction": "PRIMARY",
    "whitelistedBy": ["ARMOR"]
  },
  "breakpoints": [
    {
      "min": 0,
      "flavor": {
        "title": "Iron Plating",
        "description": "The item's reinforced construction grants a small bonus to your defenses."
      },
      "activeEffects": [
        {
          "type": "ACTIVE_EFFECT",
          "changes": [
            {
              "key": "system.attributes.ac.bonus",
              "mode": "ADD",
              "value": "1"
            }
          ]
        }
      ]
    }
  ]
}
```
