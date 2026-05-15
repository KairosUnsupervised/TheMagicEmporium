# Feats

A Feat is a non-passive ability that appears as its own entry on the character sheet. Used by `UNIQUE`, `LINEAR`, and `TIERED` modifiers.

Feat definitions are passed almost directly to Foundry. The `system` block follows the dnd5e item schema — anything Foundry accepts there is valid here.

---

## Structure

```json
{
  "type": "FEAT",
  "title": "My Feat",
  "description": "A short description shown on the character sheet.",
  "disclaimer": "Optional small print.",
  "img": "path/to/icon.png",
  "system": {}
}
```

| Field         | Required | Defaults to            | Description                                                                    |
|---------------|----------|------------------------|--------------------------------------------------------------------------------|
| `type`        | Yes      | —                      | Must be `"FEAT"`.                                                              |
| `title`       | No       | Modifier's title       | Name shown on the feat entry.                                                  |
| `description` | No       | Modifier's description | Description shown on the feat entry (wrapped in `<p><strong>…</strong></p>`).  |
| `disclaimer`  | No       | Modifier's disclaimer  | Appended below the description in italics.                                     |
| `img`         | No       | `PassiveIcon.png`      | Icon path. If `system.activation` is set, defaults to `ActiveIcon.png`.        |
| `system`      | No       | —                      | Raw Foundry system block (see sections below).                                 |

> `title`, `description`, and `disclaimer` are ignored if `system.description.value` is provided directly.

### Multiple feats per tier

When a tier grants more than one feat, each feat must have its own `title` and `description` scoped to only that feat's ability. Do not repeat the full tier description across feats.

```json
{ "type": "FEAT", "title": "My Modifier - First Ability", "description": "Does the first thing", ... }
{ "type": "FEAT", "title": "My Modifier - Second Ability", "description": "Does the second thing", ... }
```

Use the format `"Tier Title - Ability Name"` for the title so the parent modifier is always clear.

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

| Field       | Description                                                                                             |
|-------------|---------------------------------------------------------------------------------------------------------|
| `type`      | `action`, `bonus`, `reaction`, `special`, `legendary`, `mythic`, `lair`, `crew`, or `""` for passive.  |
| `cost`      | Number of actions required (usually `1`). Use `null` for no cost.                                       |
| `condition` | Optional text condition (e.g. `"when you take damage"`).                                                |

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
| `per`   | Recovery period: `lr`, `sr`, `day`, `dawn`, `dusk`, or `charges`.       |

---

## Activities

Activities define the mechanics of the feat when used. See [Activities.md](Activities.md) for the full field reference.

```json
"system": {
  "activities": [
    {
      "type": "save",
      "name": "Use My Feat"
    }
  ]
}
```

| Field  | Description                                                             |
|--------|-------------------------------------------------------------------------|
| `type` | `save`, `damage`, `heal`, `utility`, `attack`, `enchant`, or `summon`. |
| `name` | Label shown in the chat card and character sheet.                       |

---

## Full Example

A feat that deals 4d10 force damage in a 30ft circle, DEX save (half on success), usable 4 times per long rest:

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
        "activation": {
          "type": "action",
          "override": false,
          "condition": ""
        },
        "consumption": {
          "targets": [{ "type": "itemUses", "value": "1" }]
        },
        "target": {
          "template": { "type": "circle", "size": 30, "units": "ft", "contiguous": false, "stationary": false },
          "affects": { "choice": false, "type": "" },
          "override": false,
          "prompt": true
        },
        "damage": {
          "onSave": "half",
          "types": ["force"],
          "custom": { "enabled": false },
          "scaling": { "number": 1 },
          "number": 4,
          "denomination": 10,
          "bonus": ""
        },
        "save": {
          "ability": ["dex"],
          "dc": { "calculation": "spellcasting", "formula": "" }
        }
      }
    ]
  }
}
```
