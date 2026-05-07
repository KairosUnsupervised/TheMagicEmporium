# Unique Modifier

A **Unique modifier** applies a fixed set of effects to a character whenever the item is equipped and attuned. The
effects are always the same, they do not change based on the character's stats or any other data. Multiple copies of
the same Unique modifier on the same character do not stack; only one instance is ever active at a time.

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
  "flavor": {
    "title": "Blessed Strikes",
    "description": "Your weapon attacks are blessed by the gods.",
    "disclaimer": null
  },
  "effects": []
}
```

| Field         | Required | Description                                                           |
|---------------|----------|-----------------------------------------------------------------------|
| `identifier`  | Yes      | Unique name for this modifier. Convention: `SOURCE.SCREAMING_SNAKE`. |
| `type`        | Yes      | Must be `"UNIQUE"`.                                                   |
| `application` | Yes      | Controls when and how often this modifier appears (see below).        |
| `flavor`      | Yes      | The title and description shown to the player (see below).            |
| `effects`     | No       | List of effects applied while this modifier is active.                |

---

## Application

The `application` block controls how the modifier enters the loot pool and which items it can appear on.

```json
"application": {
  "weight": 10,
  "whitelistedBy": ["SWORD"],
  "blacklistedBy": ["CURSED"],
  "applies": ["BLESSED"]
}
```

| Field           | Required | Defaults to | Description                                                                                   |
|-----------------|----------|-------------|-----------------------------------------------------------------------------------------------|
| `weight`        | Yes      | —           | How likely this modifier is to appear. `0` removes it from the loot pool entirely.            |
| `whitelistedBy` | No       | `[]`        | If set, the item must have at least one of these tags for this modifier to be applicable.     |
| `blacklistedBy` | No       | `[]`        | If set, the modifier cannot be applied if the item has any of these tags.                     |
| `applies`       | No       | `[]`        | Tags added to the item once this modifier is applied (can affect other modifiers' whitelist). |

---

## Flavor

The `flavor` block is the human-readable presentation of the modifier shown on the item card.

```json
"flavor": {
  "title": "Blessed Strikes",
  "description": "Your weapon attacks are blessed by the gods.",
  "disclaimer": "Only active while equipped and attuned."
}
```

| Field         | Required | Defaults to | Description                                        |
|---------------|----------|-------------|----------------------------------------------------|
| `title`       | Yes      | —           | Name shown on the modifier entry.                  |
| `description` | Yes      | —           | Short description of what the modifier does.       |
| `disclaimer`  | No       | `null`      | Small explanatory text shown below the description.|

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
```
