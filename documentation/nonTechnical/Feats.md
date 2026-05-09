# Feats

A Feat is a non-passive ability that appears as its own entry on the character sheet. Unlike Active Effects, feats
can have activations, limited uses, areas of effect, saving throws, damage rolls, and more.

Feat definitions are passed almost directly to Foundry. The `system` block follows the
[dnd5e item system](https://foundryvtt.com/packages/dnd5e) schema — anything Foundry accepts there is valid here.
The system will warn about unrecognised fields but will still import the feat.

## Structure

```json
{
  "type": "FEAT",
  "title": "My Feat",
  "description": "A short description shown on the character sheet.",
  "disclaimer": "Optional small print.",
  "img": "path/to/icon.png",
  "system": { }
}
```

| Field         | Required | Defaults to            | Description                                                                   |
|---------------|----------|------------------------|-------------------------------------------------------------------------------|
| `type`        | Yes      | —                      | Must be `"FEAT"`.                                                             |
| `title`       | No       | Modifier's title       | Name shown on the feat entry.                                                 |
| `description` | No       | Modifier's description | Description shown on the feat entry (wrapped in `<p><strong>…</strong></p>`). |
| `disclaimer`  | No       | Modifier's disclaimer  | Appended below the description in italics.                                    |
| `img`         | No       | `PassiveIcon.png`      | Icon path. If `system.activation` is set, defaults to `ActiveIcon.png`.       |
| `system`      | No       | —                      | Raw Foundry system block (see sections below).                                |

> `title`, `description`, and `disclaimer` are ignored if `system.description.value` is provided directly.

---

## Activation

Defines what action type is required to use the feat.

```json
"system": {
  "activation": {
    "type": "action",
    "cost": 1,
    "condition": ""
  }
}
```

| Field       | Description                                                                                              |
|-------------|----------------------------------------------------------------------------------------------------------|
| `type`      | `action`, `bonus`, `reaction`, `special`, `legendary`, `mythic`, `lair`, `crew`, or `""` for passive.   |
| `cost`      | Number of actions required (usually `1`). Use `null` for no cost.                                        |
| `condition` | Optional text condition (e.g. `"when you take damage"`).                                                 |

---

## Uses

Limits how often the feat can be used before a rest.

```json
"system": {
  "uses": {
    "value": 0,
    "max": 3,
    "per": "lr"
  }
}
```

| Field   | Description                                                              |
|---------|--------------------------------------------------------------------------|
| `value` | Current uses spent. Set to `0` for a fresh item.                         |
| `max`   | Maximum uses. Can be a number or a roll formula string (e.g. `"@prof"`). |
| `per`   | Recovery period: `lr` (long rest), `sr` (short rest), `day`, `dawn`, `dusk`, `charges`. |

---

## Activities

Activities define the mechanics of the feat when used — the area, damage, saving throw, etc.
`activities` is an **array**; each entry gets a random ID assigned automatically on import.

```json
"system": {
  "activities": [
    {
      "type": "save",
      "name": "Use My Feat",
      ...
    }
  ]
}
```

| Field  | Description                                                                    |
|--------|--------------------------------------------------------------------------------|
| `type` | `save`, `damage`, `heal`, `utility`, `attack`, `enchant`, or `summon`.         |
| `name` | Label shown in the chat card and character sheet.                              |

### Template (area of effect)

```json
"target": {
  "template": {
    "type": "circle",
    "size": 30,
    "units": "ft"
  }
}
```

| Field  | Description                                                                          |
|--------|--------------------------------------------------------------------------------------|
| `type` | `circle`, `sphere`, `cylinder`, `cone`, `square`, `cube`, `line`, or `wall`.         |
| `size` | Radius or length in the given units.                                                 |
| `units`| Usually `"ft"`.                                                                      |
| `count`| Number of templates (default `1`).                                                   |

### Saving throw

```json
"save": {
  "ability": ["dex"],
  "dc": {
    "calculation": "spellcasting",
    "formula": "8 + @prof + @abilities.int.mod"
  }
}
```

| Field              | Description                                                              |
|--------------------|--------------------------------------------------------------------------|
| `ability`          | Array of ability keys: `str`, `dex`, `con`, `int`, `wis`, `cha`.        |
| `dc.calculation`   | `spellcasting`, `proficiency`, `flat`, or `""` to use the formula field. |
| `dc.formula`       | Roll formula for the DC (used when `calculation` is `""` or `flat`).    |

### Damage

```json
"damage": {
  "onSave": "half",
  "parts": [
    {
      "number": 4,
      "denomination": 10,
      "types": ["fire"]
    }
  ]
}
```

| Field        | Description                                                                    |
|--------------|--------------------------------------------------------------------------------|
| `onSave`     | `none` (full damage on fail, none on save), `half`, or `full` (save negates).  |
| `parts`      | Array of damage dice entries.                                                  |
| `number`     | Number of dice (e.g. `4` for 4d10).                                            |
| `denomination`| Die size (e.g. `10` for d10).                                                 |
| `bonus`      | Flat bonus added to the roll (e.g. `"@abilities.int.mod"`).                    |
| `types`      | Damage types (e.g. `["fire"]`, `["force"]`, `["piercing", "magical"]`).        |

### Consumption (linking to the feat's uses)

To make an activity deduct from the feat's use count on activation:

```json
"consumption": {
  "targets": [
    {
      "type": "itemUses",
      "value": "1"
    }
  ]
}
```

---

## Full Example

A feat that deals 4d10 force damage in a 30 ft circle, DEX save (half on success), usable 4 times per long rest:

```json
{
  "type": "FEAT",
  "system": {
    "activation": {
      "type": "action",
      "cost": 1,
      "condition": ""
    },
    "uses": {
      "value": 0,
      "max": 4,
      "per": "lr"
    },
    "activities": [
      {
        "type": "save",
        "name": "Use Arcane Eruption",
        "consumption": {
          "targets": [{ "type": "itemUses", "value": "1" }]
        },
        "target": {
          "template": {
            "type": "circle",
            "size": 30,
            "units": "ft"
          }
        },
        "damage": {
          "onSave": "half",
          "parts": [
            {
              "number": 4,
              "denomination": 10,
              "types": ["force"]
            }
          ]
        },
        "save": {
          "ability": ["dex"],
          "dc": {
            "calculation": "spellcasting",
            "formula": "8 + @prof + @abilities.int.mod"
          }
        }
      }
    ]
  }
}
```
