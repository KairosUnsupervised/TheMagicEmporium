# Tiered Modifier

A **Tiered modifier** has two independent systems working in sequence: **breakpoints** that translate the
item's internal float into a numeric value, and **tiers** that map that value to a specific flavor and set
of effects. Because each tier defines its own effects entirely, different tiers can apply qualitatively
different things — not just bigger numbers.

The float is always a number between `0` and `1`. A higher float means a stronger modifier.

When a character has the modifier active on multiple items, the resolved values from all instances are
**summed**, and that sum is matched against the tier thresholds. Two items each resolving to value `2`
combine to `4`, which may unlock a higher tier than either item would reach alone.

Effects are applied to the character, not the item. For item-bound changes use an
[Independent modifier](IndependentModifier.md) instead.

---

## Structure

```json
{
  "identifier": "SOURCE.MY_MODIFIER",
  "type": "TIERED",
  "application": {
    "weight": 10,
    "whitelistedBy": [],
    "blacklistedBy": [],
    "applies": []
  },
  "breakpoints": [
    {"min": 0,   "value": 1},
    {"min": 0.4, "value": 2},
    {"min": 0.7, "value": 4},
    {"min": 0.9, "value": 8}
  ],
  "tiers": [
    {
      "min": 1,
      "flavor": {
        "title": "My Modifier I",
        "description": "A modest effect.",
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
| `type`        | Yes      | Must be `"TIERED"`.                                                   |
| `application` | Yes      | Controls when and how often this modifier appears (see below).        |
| `breakpoints` | Yes      | Maps the item's float to a numeric value (see below).                 |
| `tiers`       | Yes      | Maps that value to a flavor and effects (see below).                  |

---

## Application

Works identically to the Unique modifier — see [UniqueModifier.md](UniqueModifier.md) for the full field reference.

---

## Breakpoints

Breakpoints translate the item's float (0–1) into a discrete numeric value. The highest threshold still
at or below the float is the one that activates.

```json
"breakpoints": [
  {"min": 0,   "value": 1},
  {"min": 0.4, "value": 2},
  {"min": 0.7, "value": 4},
  {"min": 0.9, "value": 8}
]
```

| Field   | Required | Description                                                        |
|---------|----------|--------------------------------------------------------------------|
| `min`   | Yes      | The minimum float value needed to activate this breakpoint.        |
| `value` | Yes      | The numeric value produced when this breakpoint is active.         |

The values chosen here are completely independent of the tier thresholds. You can have three breakpoints
producing four distinct values, or ten breakpoints all mapping to the same two values.

### Powers-of-two values (1 · 2 · 4 · 8)

Using powers of two for the breakpoint values creates a clean n² stacking pattern: exactly **two items at
tier N always combine to reach tier N+1**, and never overshoot it.

| Two items each resolving to | Sum | Tier reached  |
|-----------------------------|-----|---------------|
| 1 + 1                       | 2   | tier `min: 2` |
| 2 + 2                       | 4   | tier `min: 4` |
| 4 + 4                       | 8   | tier `min: 8` |

This means a player can never skip a tier by combining two identical items — they always land on precisely
the next threshold. It also means a single item at a high float can match the combined output of two weaker
items at the tier below, giving the system a predictable feel without allowing runaway stacking.

Any other value set breaks this guarantee. Use powers of two when you want this exact doubling behaviour;
use arbitrary values when you want finer or coarser control over how stacking plays out.

---

## Tiers

Tiers map the resolved numeric value (after summing across all active instances) to a specific flavor and
set of effects. The highest threshold still at or below the sum is the active tier.

```json
"tiers": [
  {
    "min": 1,
    "flavor": {
      "title": "My Modifier I",
      "description": "A modest effect.",
      "disclaimer": null
    },
    "effects": []
  },
  {
    "min": 4,
    "flavor": {
      "title": "My Modifier II",
      "description": "A powerful effect.",
      "disclaimer": null
    },
    "effects": []
  }
]
```

| Field     | Required | Defaults to | Description                                                  |
|-----------|----------|-------------|--------------------------------------------------------------|
| `min`     | Yes      | —           | The minimum summed value needed to activate this tier.       |
| `flavor`  | Yes      | —           | The title and description shown to the player for this tier. |
| `effects` | No       | `[]`        | List of effects applied while this tier is active.           |

### Flavor

| Field         | Required | Defaults to | Description                                         |
|---------------|----------|-------------|-----------------------------------------------------|
| `title`       | Yes      | —           | Name shown on the modifier entry.                   |
| `description` | Yes      | —           | Short description of what the modifier does.        |
| `disclaimer`  | No       | `null`      | Small explanatory text shown below the description. |

### Effects

Effects work the same as in the Unique modifier — see [UniqueModifier.md](UniqueModifier.md) and
[Effects.md](Effects.md) for the full reference on `ACTIVE_EFFECT` and `FEAT` entries.

---

## Breakpoints vs Tiers

The two systems are intentionally independent:

| System       | Input      | Output             | Stacks across items? |
|--------------|------------|--------------------|----------------------|
| `breakpoints`| Float (0–1)| Numeric value      | Yes — values are summed |
| `tiers`      | Summed value | Flavor + effects | N/A — only one tier is ever active |

This separation means you can tune how quickly the modifier escalates (breakpoints) without touching what
each power level actually does (tiers), and vice versa.

---

## Choosing between Tiered and Linear

Use **Tiered** when each power level should apply different effects — a resistance at tier 1, an immunity
at tier 3, and an active ability at tier 4. Use **Linear** when the effects are identical and only a number
changes, such as a flat bonus that grows from +1 to +3.

---

## Full Example

```json
{
  "identifier": "CORE.EMBER_AEGIS",
  "type": "TIERED",
  "application": {
    "weight": 5,
    "whitelistedBy": ["ARMOR"],
    "blacklistedBy": [],
    "applies": []
  },
  "breakpoints": [
    {"min": 0,   "value": 1},
    {"min": 0.4, "value": 2},
    {"min": 0.7, "value": 4},
    {"min": 0.9, "value": 8}
  ],
  "tiers": [
    {
      "min": 1,
      "flavor": {
        "title": "Ember Ward",
        "description": "This armor smolders with a protective heat, granting resistance to fire damage."
      },
      "effects": [
        {
          "type": "ACTIVE_EFFECT",
          "changes": [
            {"key": "system.traits.dr.value", "mode": "ADD", "value": "fire"}
          ]
        }
      ]
    },
    {
      "min": 2,
      "flavor": {
        "title": "Ember Aegis",
        "description": "The armor blazes with warding flames, granting fire resistance and bolstering your defenses."
      },
      "effects": [
        {
          "type": "ACTIVE_EFFECT",
          "changes": [
            {"key": "system.traits.dr.value",       "mode": "ADD", "value": "fire"},
            {"key": "system.attributes.ac.bonus",    "mode": "ADD", "value": "2"}
          ]
        }
      ]
    },
    {
      "min": 4,
      "flavor": {
        "title": "Ember Fortress",
        "description": "The armor burns with an undying inferno, granting immunity to fire damage and hardening your defenses."
      },
      "effects": [
        {
          "type": "ACTIVE_EFFECT",
          "changes": [
            {"key": "system.traits.di.value",        "mode": "ADD", "value": "fire"},
            {"key": "system.attributes.ac.bonus",    "mode": "ADD", "value": "2"}
          ]
        }
      ]
    },
    {
      "min": 8,
      "flavor": {
        "title": "Ember Apotheosis",
        "description": "The armor has become one with primordial fire. You are immune to fire, your defenses are ironclad, and you can unleash a devastating burst of flame.",
        "disclaimer": "Immolating Burst recharges on a short or long rest."
      },
      "effects": [
        {
          "type": "ACTIVE_EFFECT",
          "changes": [
            {"key": "system.traits.di.value",        "mode": "ADD", "value": "fire"},
            {"key": "system.attributes.ac.bonus",    "mode": "ADD", "value": "2"}
          ]
        },
        {
          "type": "FEAT",
          "system": {
            "activation": {"type": "action", "cost": 1, "condition": ""},
            "uses": {"value": 0, "max": 1, "per": "sr"},
            "activities": [
              {
                "type": "save",
                "name": "Immolating Burst",
                "target": {
                  "template": {"type": "sphere", "size": 20, "units": "ft"}
                },
                "damage": {
                  "onSave": "half",
                  "parts": [{"number": 6, "denomination": 6, "types": ["fire"]}]
                },
                "save": {
                  "ability": ["dex"],
                  "dc": {"calculation": "flat", "formula": "16"}
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```
