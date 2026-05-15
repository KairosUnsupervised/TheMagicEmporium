# Item-Bound Activities

The `activities` array on an `INDEPENDENT` modifier breakpoint attaches usable abilities directly to the item. They appear in the item's action panel rather than on the character sheet as a feat.

Only add an activity when it performs a real mechanical action in Foundry (rolls dice, applies an effect, tracks uses). If the behaviour is manually tracked or not yet automated, leave `activities` as `[]` and describe the mechanic in the flavor text instead.

---

## Structure

```json
"activities": [
  {
    "type": "damage",
    "name": "Ignite Weapon",
    "activation": {
      "type": "bonus",
      "override": false,
      "condition": ""
    },
    "uses": {
      "max": 1,
      "recovery": [
        { "period": "sr", "type": "recoverAll" }
      ]
    }
  }
]
```

| Field        | Required | Description                                                             |
|--------------|----------|-------------------------------------------------------------------------|
| `type`       | Yes      | `save`, `damage`, `heal`, `utility`, `attack`, `enchant`, or `summon`. |
| `name`       | Yes      | Label shown in the item's action panel.                                 |
| `activation` | Yes      | Action type required to use this activity (see below).                  |
| `uses`       | No       | Use limit and recovery (see below).                                     |

---

## Activation

Every activity must have an `activation` block. Always include `override: false`.

```json
"activation": {
  "type": "action",
  "override": false,
  "condition": ""
}
```

| Field       | Description                                                                                            |
|-------------|--------------------------------------------------------------------------------------------------------|
| `type`      | `action`, `bonus`, `reaction`, `special`, `legendary`, `mythic`, `lair`, `crew`, or `""` for passive. |
| `override`  | Always `false` unless intentionally overriding parent activation.                                      |
| `condition` | Optional trigger condition (e.g. `"on tagged creature kill"`).                                         |

---

## Uses

```json
"uses": {
  "max": 1,
  "recovery": [
    { "period": "sr", "type": "recoverAll" }
  ]
}
```

| Field      | Description                                                                    |
|------------|--------------------------------------------------------------------------------|
| `max`      | Maximum uses. Omit or set to `""` for unlimited.                               |
| `recovery` | Array of recovery rules. `period`: `lr`, `sr`, `day`, `dawn`, `dusk`. `type`: `recoverAll`. |

---

## Consumption

When a feat tracks uses via `system.uses`, every activity that should deduct a charge **must** include a `consumption` block linking it to the feat's use pool. Without it, activating the ability will not consume a charge.

```json
"consumption": {
  "scaling": { "allowed": false },
  "spellSlot": true,
  "targets": [
    {
      "type": "itemUses",
      "value": "1",
      "target": "",
      "scaling": {}
    }
  ]
}
```

This applies to all activity types (`utility`, `damage`, `heal`, `save`, etc.) whenever the parent feat has a `uses` block.

---

## Heal Activity

The `heal` type uses a flat `healing` object — **not** a `parts` array.

```json
{
  "type": "heal",
  "name": "My Heal",
  "activation": {
    "type": "special",
    "override": false,
    "condition": "on creature kill"
  },
  "healing": {
    "types": ["healing"],
    "custom": { "enabled": false },
    "scaling": { "number": 1 },
    "number": 2,
    "denomination": 8,
    "bonus": ""
  }
}
```

| Field               | Description                                                 |
|---------------------|-------------------------------------------------------------|
| `healing.types`     | `["healing"]` for normal healing, `["temphp"]` for temp HP. |
| `healing.number`    | Number of dice. Supports `{amount}` for LINEAR modifiers.   |
| `healing.denomination` | Die size (e.g. `8` for d8).                              |
| `healing.bonus`     | Flat bonus formula. Use `""` if none.                       |
| `healing.custom`    | Always `{ "enabled": false }` unless using custom formulas. |
| `healing.scaling`   | Always `{ "number": 1 }`.                                   |

### Area of Effect

Add a `target` block for healing that affects an area:

```json
"target": {
  "template": { "type": "circle", "size": 15, "units": "ft", "contiguous": false, "stationary": false },
  "affects": { "choice": false, "type": "" },
  "override": false,
  "prompt": true
}
```

Template types: `circle`, `sphere`, `cylinder`, `cone`, `square`, `cube`, `line`, `wall`.

---

## Damage Activity

The `damage` type uses a flat `damage` object — **not** a `parts` array. The structure mirrors the `heal` activity.

```json
{
  "type": "damage",
  "name": "Ignite Weapon",
  "activation": {
    "type": "bonus",
    "override": false,
    "condition": ""
  },
  "damage": {
    "types": ["fire"],
    "custom": { "enabled": false },
    "scaling": { "number": 1 },
    "number": 1,
    "denomination": 6,
    "bonus": ""
  }
}
```

| Field                | Description                                                               |
|----------------------|---------------------------------------------------------------------------|
| `damage.types`       | Damage types (e.g. `["fire"]`, `["piercing"]`, `["healing"]`).           |
| `damage.number`      | Number of dice. Supports `{amount}` for LINEAR modifiers.                 |
| `damage.denomination`| Die size (e.g. `6` for d6).                                              |
| `damage.bonus`       | Flat bonus formula. Use `""` if none.                                     |
| `damage.custom`      | Always `{ "enabled": false }` unless using custom formulas.              |
| `damage.scaling`     | Always `{ "number": 1 }`.                                                |

---

## Utility Activity

Use `utility` for activities that trigger a mechanic without dealing damage or healing — toggling a state, applying a condition, or any custom trigger.

```json
{
  "type": "utility",
  "name": "Activate",
  "activation": {
    "type": "bonus",
    "override": false,
    "condition": ""
  }
}
```
