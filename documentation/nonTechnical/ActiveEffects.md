# Active Effects

An Active Effect modifies a character's stats silently in the background. The player sees the end result, not the
individual change.

## Structure

```json
{
  "type": "ACTIVE_EFFECT",
  "title": "My Effect",
  "description": "Your dexterity score increases by 2.",
  "disclaimer": "This effect is only active while the item is equipped and attuned.",
  "changes": [
    {
      "key": "system.abilities.dex.value",
      "mode": "ADD",
      "value": "2"
    }
  ]
}
```

| Field         | Required | Defaults to            | Description                                               |
|---------------|----------|------------------------|-----------------------------------------------------------|
| `type`        | Yes      | —                      | Must be `"ACTIVE_EFFECT"`.                                |
| `title`       | No       | Modifier's title       | Name shown on the effect entry.                           |
| `description` | No       | Modifier's description | Description shown on the effect entry.                    |
| `disclaimer`  | No       | Modifier's disclaimer  | Small print shown below the description.                  |
| `changes`     | Yes      | —                      | One or more stat changes this effect applies (see below). |

## Changes

Each entry in `changes` targets one specific stat on the character sheet.

| Field   | Required | Description                                     |
|---------|----------|-------------------------------------------------|
| `key`   | Yes      | The Foundry path to the stat being modified.    |
| `mode`  | Yes      | How the value is applied (see modes below).     |
| `value` | Yes      | The value to apply, always written as a string. |

### Modes

| Mode        | Description                                                            |
|-------------|------------------------------------------------------------------------|
| `ADD`       | Adds the value to the current stat. Use a negative number to subtract. |
| `MULTIPLY`  | Multiplies the current stat by the value.                              |
| `UPGRADE`   | Sets the stat to the value only if the current value is **lower**.     |
| `DOWNGRADE` | Sets the stat to the value only if the current value is **higher**.    |
| `OVERRIDE`  | Replaces the stat with the value unconditionally.                      |
| `CUSTOM`    | Applies custom logic defined by a game system or module.               |

### Common Stat Keys

| Stat               | Key                               |
|--------------------|-----------------------------------|
| Strength score     | `system.abilities.str.value`      |
| Dexterity score    | `system.abilities.dex.value`      |
| Constitution score | `system.abilities.con.value`      |
| Intelligence score | `system.abilities.int.value`      |
| Wisdom score       | `system.abilities.wis.value`      |
| Charisma score     | `system.abilities.cha.value`      |
| Armor Class        | `system.attributes.ac.bonus`      |
| Movement speed     | `system.attributes.movement.walk` |
| Initiative         | `system.attributes.init.bonus`    |

## Multiple Changes

A single Active Effect can apply several stat changes at once:

```json
{
  "type": "ACTIVE_EFFECT",
  "title": "Titan's Blessing",
  "description": "Your strength and constitution both increase by 2.",
  "changes": [
    {
      "key": "system.abilities.str.value",
      "mode": "ADD",
      "value": "2"
    },
    {
      "key": "system.abilities.con.value",
      "mode": "ADD",
      "value": "2"
    }
  ]
}
```

## Multiple Effects per Modifier

A modifier can produce more than one Active Effect. Each effect will appear as a separate entry on the character sheet:

```json
{
  "effects": [
    {
      "type": "ACTIVE_EFFECT",
      "title": "Quickened Step",
      "description": "Your movement speed increases by 10 ft.",
      "changes": [
        {
          "key": "system.attributes.movement.walk",
          "mode": "ADD",
          "value": "10"
        }
      ]
    },
    {
      "type": "ACTIVE_EFFECT",
      "title": "Sharpened Reflexes",
      "description": "Your initiative bonus increases by 2.",
      "changes": [
        {
          "key": "system.attributes.init.bonus",
          "mode": "ADD",
          "value": "2"
        }
      ]
    }
  ]
}
```
