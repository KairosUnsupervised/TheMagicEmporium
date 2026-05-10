# Unique Modifier

A **Unique modifier** applies a fixed set of effects to a character whenever the item is equipped and attuned. Multiple copies of the same Unique modifier on the same character do not stack; only the highest tier across all copies is ever active at a time.

Each modifier supports one or more **breakpoints** — tiers that activate based on the item's internal float value. Most modifiers only need a single breakpoint at `min: 0`, which acts as the sole tier.

---

## Structure

```json
{
  "identifier": "SOURCE.MY_MODIFIER",
  "type": "UNIQUE",
  "application": {
    "weight": 10,
    "whitelistedBy": [],
    "blacklistedBy": [],
    "applies": []
  },
  "breakpoints": [
    {
      "min": 0,
      "flavor": {
        "title": "Blessed Strikes",
        "description": "Your weapon attacks are blessed by the gods.",
        "disclaimer": null
      },
      "effects": []
    }
  ]
}
```

| Field         | Required | Description                                                           |
|---------------|----------|-----------------------------------------------------------------------|
| `identifier`  | Yes      | Unique name for this modifier. Convention: `SOURCE.SCREAMING_SNAKE`. |
| `type`        | Yes      | Must be `"UNIQUE"`.                                                   |
| `application` | Yes      | Controls when and how often this modifier appears (see below).        |
| `breakpoints` | Yes      | One or more tiers, each with its own flavor and effects (see below).  |

---

## Application

The `application` block controls how the modifier enters the loot pool and which items it can appear on.

```json
"application": {
  "weight": 10,
  "restriction": "PRIMARY",
  "whitelistedBy": ["SWORD"],
  "blacklistedBy": ["CURSED"],
  "applies": ["BLESSED"]
}
```

| Field           | Required | Defaults to | Description                                                                                   |
|-----------------|----------|-------------|-----------------------------------------------------------------------------------------------|
| `weight`        | Yes      | —           | How likely this modifier is to appear. `0` removes it from the loot pool entirely.            |
| `restriction`   | No       | none        | If set, the modifier can only roll on this slot type: `"PRIMARY"`, `"SECONDARY"`, or `"TERTIARY"`. Omit to allow any slot. |
| `whitelistedBy` | No       | `[]`        | If set, the item must have at least one of these tags for this modifier to be applicable.     |
| `blacklistedBy` | No       | `[]`        | If set, the modifier cannot be applied if the item has any of these tags.                     |
| `applies`       | No       | `[]`        | Tags added to the item once this modifier is applied (can affect other modifiers' whitelist). |

### Slot types

Every item has one or more slots, each of a specific type. Modifiers with a `restriction` can only ever fill a slot of that type.

| Slot        | Availability                              |
|-------------|-------------------------------------------|
| `PRIMARY`   | Present on all items regardless of rarity |
| `SECONDARY` | Present on Uncommon items and above       |
| `TERTIARY`  | Present on Legendary items only           |

Use `restriction` to ensure a modifier always lands in a meaningful position — for example, a powerful ability that should only ever occupy a primary slot, or a tertiary-only modifier reserved for the rarest items.

---

## Breakpoints

The `breakpoints` array defines the tiers of this modifier. Each breakpoint activates when the item's internal value reaches its `min` threshold. When a character has multiple copies of this modifier, the tier with the highest `min` across all copies is the one whose effects are applied.

Most modifiers only need a single breakpoint at `min: 0`.

```json
"breakpoints": [
  {
    "min": 0,
    "flavor": {
      "title": "Blessed Strikes",
      "description": "Your weapon attacks are blessed by the gods.",
      "disclaimer": null
    },
    "effects": []
  }
]
```

| Field     | Required | Defaults to | Description                                                  |
|-----------|----------|-------------|--------------------------------------------------------------|
| `min`     | Yes      | —           | The minimum internal value needed to activate this tier.     |
| `flavor`  | Yes      | —           | The title and description shown to the player for this tier. |
| `effects` | No       | `[]`        | List of effects applied while this tier is active.           |

### Flavor

```json
"flavor": {
  "title": "Blessed Strikes",
  "description": "Your weapon attacks are blessed by the gods.",
  "disclaimer": "Only active while equipped and attuned."
}
```

| Field         | Required | Defaults to | Description                                         |
|---------------|----------|-------------|-----------------------------------------------------|
| `title`       | Yes      | —           | Name shown on the modifier entry.                   |
| `description` | Yes      | —           | Short description of what the modifier does.        |
| `disclaimer`  | No       | `null`      | Small explanatory text shown below the description. |

---

## Full Example

```json
{
  "identifier": "CORE.BLESSED_STRIKES",
  "type": "UNIQUE",
  "application": {
    "weight": 8,
    "whitelistedBy": ["WEAPON"],
    "blacklistedBy": [],
    "applies": ["BLESSED"]
  },
  "breakpoints": [
    {
      "min": 0,
      "flavor": {
        "title": "Blessed Strikes",
        "description": "Your weapon attacks are blessed by the gods.",
        "disclaimer": null
      },
      "effects": [
        {
          "type": "ACTIVE_EFFECT",
          "title": "Blessed Strikes",
          "description": "Your attack rolls gain a +2 bonus.",
          "changes": [
            {
              "key": "system.bonuses.mwak.attack",
              "mode": "ADD",
              "value": "2"
            }
          ]
        }
      ]
    }
  ]
}
```
