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
| `application`| Controls when and how this modifier can be applied to an item (weight, tag filters).         |
| `flavor`     | The `title`, `description`, and optional `disclaimer` shown in the UI.                       |
| `effects`    | The mechanical changes applied to a character when the modifier is active.                   |

---

## Modifier Types

There are currently two modifier types. Choose the one that matches how the bonus should behave:

| Type       | Use when…                                                                   | Reference                              |
|------------|-----------------------------------------------------------------------------|----------------------------------------|
| `UNIQUE`   | The bonus is fixed — the same regardless of how many items carry it.        | [UniqueModifier.md](UniqueModifier.md) |
| `LINEAR`   | The bonus scales based on a float value and a set of breakpoints.           | [LinearModifier.md](LinearModifier.md) |

---

## Effects

The `effects` array defines what actually happens to the character. An empty array produces a default passive feat
using the modifier's flavor text. Otherwise, list one or more effect definitions:

| Type            | Use when…                                                             | Reference                          |
|-----------------|-----------------------------------------------------------------------|------------------------------------|
| `ACTIVE_EFFECT` | You want a silent, always-on stat change (e.g. +2 Strength).         | [ActiveEffects.md](ActiveEffects.md) |
| `FEAT`          | You want a named ability on the character sheet with optional actions.| [Feats.md](Feats.md)               |

See [Effects.md](Effects.md) for an overview of both types.

---

## Minimal Example

A fixed +1 to Armor Class, available on any armor:

```json
{
  "identifier": "TME.IRON_PLATING",
  "type": "UNIQUE",
  "application": {
    "weight": 1,
    "whitelistedBy": ["ARMOR"]
  },
  "flavor": {
    "title": "Iron Plating",
    "description": "The item's reinforced construction grants a small bonus to your defenses."
  },
  "effects": [
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
```
