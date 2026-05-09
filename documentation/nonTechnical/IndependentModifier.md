# Independent Modifier

An **Independent modifier** applies changes directly to the **item document** rather than to the character. It can
patch any numeric or text field on the item itself, and it can attach usable abilities directly to the item so they
show up in the item's own action list.

Because its effects are item-bound rather than actor-bound, an Independent modifier does not support the `effects`
array used by Unique and Linear modifiers. Instead it uses two optional fields: `changes` and `activities`.

---

## Structure

```json
{
  "identifier": "SOURCE.MY_MODIFIER",
  "type": "INDEPENDENT",
  "application": {
    "weight": 10,
    "whitelistedBy": [],
    "blacklistedBy": [],
    "applies": []
  },
  "flavor": {
    "title": "Balanced Hilt",
    "description": "This weapon has been expertly balanced, granting +1 to attack rolls.",
    "disclaimer": null
  },
  "changes": [],
  "activities": []
}
```

| Field         | Required | Description                                                           |
|---------------|----------|-----------------------------------------------------------------------|
| `identifier`  | Yes      | Unique name for this modifier. Convention: `SOURCE.SCREAMING_SNAKE`. |
| `type`        | Yes      | Must be `"INDEPENDENT"`.                                              |
| `application` | Yes      | Controls when and how often this modifier appears (see below).        |
| `flavor`      | Yes      | The title and description shown to the player.                        |
| `changes`     | No       | List of dot-notation patches applied to the item document.            |
| `activities`  | No       | List of usable abilities added directly to the item.                  |

---

## Application

Works identically to the Unique modifier — see [UniqueModifier.md](UniqueModifier.md) for the full field reference.

---

## Flavor

Works identically to the Unique modifier — see [UniqueModifier.md](UniqueModifier.md) for the full field reference.

---

## Item Changes (`changes`)

The `changes` array lets you patch any field on the item document using dot-notation paths. Each entry specifies a
`key` (the path to the field), an `operation` (what to do), and a `value` (what to do it with).

```json
"changes": [
  {
    "key": "system.magicalBonus",
    "operation": "SET",
    "value": 1
  }
]
```

| Field       | Required | Description                                      |
|-------------|----------|--------------------------------------------------|
| `key`       | Yes      | Dot-notation path to the field on the item.      |
| `operation` | Yes      | The operation to apply (see table below).        |
| `value`     | Yes      | A string, number, or boolean to use as input.    |

### Operations

| Operation  | Effect                                                                     |
|------------|----------------------------------------------------------------------------|
| `SET`      | Replaces the field with the given value.                                   |
| `ADD`      | Adds the value to the current number (supports negative values to subtract).|
| `MULTIPLY` | Multiplies the current number by the value.                                |
| `APPEND`   | Appends the value to an array field.                                       |
| `MIN`      | Keeps whichever is smaller: the current value or the given value.          |
| `MAX`      | Keeps whichever is larger: the current value or the given value.           |

Multiple changes in the same modifier are applied in order. Later changes in the array can overwrite earlier ones if
they target the same field.

### Finding the right key

Dot-notation mirrors the JSON structure of the item document. For example:

| Goal                           | Key                          |
|--------------------------------|------------------------------|
| Set the magical attack bonus   | `system.magicalBonus`        |
| Set the item's rarity          | `system.rarity`              |
| Add to the armor class value   | `system.armor.value`         |
| Append a property tag          | `system.properties`          |

---

## Item-Bound Activities (`activities`)

The `activities` array adds usable abilities to the item itself — they appear in the item's action panel rather than
on the character sheet as a feat. This is the right choice when the ability is tied to wielding or using that specific
item (e.g. *Ignite this sword as a bonus action*).

```json
"activities": [
  {
    "type": "damage",
    "name": "Ignite Weapon",
    "activation": {
      "type": "bonus",
      "cost": 1
    },
    "uses": {
      "max": 1,
      "recovery": [
        { "period": "sr", "type": "recoverAll" }
      ]
    },
    "damage": {
      "parts": [
        { "number": 1, "denomination": 6, "types": ["fire"] }
      ]
    }
  }
]
```

The activity definition is the same format used inside a `FEAT` effect's `system.activities` array — refer to
[Feats.md](Feats.md) for the complete field reference.

### Activities vs Feats

| Situation                                              | Use                   |
|--------------------------------------------------------|-----------------------|
| Ability is tied to this specific item                  | `INDEPENDENT` activities |
| Ability is a character trait that persists regardless  | `UNIQUE` / `LINEAR` with a `FEAT` effect |

---

## Full Example — Item Change

A modifier that sets a weapon's magical attack bonus to +2:

```json
{
  "identifier": "CORE.KEEN_EDGE",
  "type": "INDEPENDENT",
  "application": {
    "weight": 6,
    "whitelistedBy": ["WEAPON"],
    "blacklistedBy": [],
    "applies": []
  },
  "flavor": {
    "title": "Keen Edge",
    "description": "This weapon's edge has been magically sharpened, granting a +2 bonus to attack and damage rolls.",
    "disclaimer": null
  },
  "changes": [
    {
      "key": "system.magicalBonus",
      "operation": "SET",
      "value": 2
    }
  ]
}
```

---

## Full Example — Item Activity

A modifier that adds a once-per-short-rest bonus action to deal extra fire damage:

```json
{
  "identifier": "CORE.BLAZING_EDGE",
  "type": "INDEPENDENT",
  "application": {
    "weight": 4,
    "whitelistedBy": ["WEAPON"],
    "blacklistedBy": [],
    "applies": []
  },
  "flavor": {
    "title": "Blazing Edge",
    "description": "Once per short rest as a bonus action, ignite this weapon to deal an extra 1d6 fire damage on your next hit.",
    "disclaimer": null
  },
  "activities": [
    {
      "type": "damage",
      "name": "Ignite Weapon",
      "activation": {
        "type": "bonus",
        "cost": 1
      },
      "uses": {
        "max": 1,
        "recovery": [
          { "period": "sr", "type": "recoverAll" }
        ]
      },
      "damage": {
        "parts": [
          { "number": 1, "denomination": 6, "types": ["fire"] }
        ]
      }
    }
  ]
}
```
