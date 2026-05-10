# Linear Modifier

A **Linear modifier** has an internal float value and a set of **breakpoints** that translate it into a concrete bonus.
The resolved bonus is then injected into the effects and flavor text via the `{amount}` placeholder.

The float is always a number between `0` and `1`. A higher float means a stronger modifier, the breakpoints are
designed so that higher input values unlock higher bonus tiers.

When a character has the modifier active on multiple items, the bonus resolved from each instance is **summed** at the
character level before the effects are applied.

---

## Structure

```json
{
  "identifier": "SOURCE.MY_MODIFIER",
  "type": "LINEAR",
  "application": {
    "weight": 10,
    "whitelistedBy": [],
    "blacklistedBy": [],
    "applies": []
  },
  "flavor": {
    "title": "Flowing Power",
    "description": "Grants a +{amount} bonus to your spell attack rolls.",
    "disclaimer": null
  },
  "breakpoints": [
    {"min": 0, "value": 1},
    {"min": 0.5, "value": 2},
    {"min": 0.8, "value": 3}
  ],
  "effects": []
}
```

| Field         | Required | Description                                                           |
|---------------|----------|-----------------------------------------------------------------------|
| `identifier`  | Yes      | Unique name for this modifier. Convention: `SOURCE.SCREAMING_SNAKE`. |
| `type`        | Yes      | Must be `"LINEAR"`.                                                   |
| `application` | Yes      | Controls when and how often this modifier appears (see below).        |
| `flavor`      | Yes      | The title and description shown to the player. Supports `{amount}`.  |
| `breakpoints` | Yes      | Maps the input value to a bonus amount (see below).                   |
| `effects`     | No       | List of effects applied while this modifier is active. Supports `{amount}`. |

---

## Application

The `application` block controls how the modifier enters the loot pool and which items it can appear on. It works
identically to the Unique modifier.

```json
"application": {
  "weight": 10,
  "restriction": "PRIMARY",
  "whitelistedBy": ["RING"],
  "blacklistedBy": [],
  "applies": []
}
```

| Field           | Required | Defaults to | Description                                                                                   |
|-----------------|----------|-------------|-----------------------------------------------------------------------------------------------|
| `weight`        | Yes      | —           | How likely this modifier is to appear. `0` removes it from the loot pool entirely.            |
| `restriction`   | No       | none        | If set, the modifier can only roll on this slot type: `"PRIMARY"`, `"SECONDARY"`, or `"TERTIARY"`. Omit to allow any slot. |
| `whitelistedBy` | No       | `[]`        | If set, the item must have at least one of these tags for this modifier to be applicable.     |
| `blacklistedBy` | No       | `[]`        | If set, the modifier cannot be applied if the item has any of these tags.                     |
| `applies`       | No       | `[]`        | Tags added to the item once this modifier is applied.                                         |

---

## Breakpoints

Breakpoints define how the character's input value translates into a bonus. Each breakpoint has a `min` threshold and
a `value` that becomes the bonus when that threshold is met.

```json
"breakpoints": [
  {"min": 0,   "value": 1},
  {"min": 0.5, "value": 2},
  {"min": 0.8, "value": 3}
]
```

The **highest threshold that is still at or below the input value** is the one that applies. Using the example above:

| Input value | Matching breakpoint | Resolved `{amount}` |
|-------------|---------------------|----------------------|
| 0.2         | `min: 0`            | 1                    |
| 0.5         | `min: 0.5`          | 2                    |
| 0.7         | `min: 0.5`          | 2                    |
| 0.9         | `min: 0.8`          | 3                    |

At least one breakpoint starting at `min: 0` is recommended so every character gets a baseline value.

| Field   | Required | Description                                              |
|---------|----------|----------------------------------------------------------|
| `min`   | Yes      | The minimum input value needed to activate this tier.    |
| `value` | Yes      | The bonus amount granted when this breakpoint is active. |

---

## The `{amount}` Placeholder

Any field in `flavor` or inside `effects` that contains the text `{amount}` will have it replaced with the resolved
bonus before it is shown to the player or applied to the character sheet.

```json
"flavor": {
  "title": "Arcane Attunement",
  "description": "Your spell attack rolls gain a +{amount} bonus."
}
```

A modifier with a float of `0.7` and the breakpoints above would show: *"Your spell attack rolls gain a +2 bonus."*

The same placeholder works inside effect `changes` values:

```json
"changes": [
  {
    "key": "system.bonuses.msak.attack",
    "mode": "ADD",
    "value": "{amount}"
  }
]
```

---

## Full Example

```json
{
  "identifier": "CORE.ARCANE_ATTUNEMENT",
  "type": "LINEAR",
  "application": {
    "weight": 6,
    "whitelistedBy": ["RING", "AMULET"],
    "blacklistedBy": [],
    "applies": []
  },
  "flavor": {
    "title": "Arcane Attunement",
    "description": "Your spell attack rolls gain a +{amount} bonus based on your Intelligence.",
    "disclaimer": null
  },
  "breakpoints": [
    {"min": 0,   "value": 1},
    {"min": 0.5, "value": 2},
    {"min": 0.8, "value": 3}
  ],
  "effects": [
    {
      "type": "ACTIVE_EFFECT",
      "title": "Arcane Attunement",
      "description": "Spell attack rolls gain +{amount}.",
      "changes": [
        {
          "key": "system.bonuses.msak.attack",
          "mode": "ADD",
          "value": "{amount}"
        },
        {
          "key": "system.bonuses.rsak.attack",
          "mode": "ADD",
          "value": "{amount}"
        }
      ]
    }
  ]
}
```
