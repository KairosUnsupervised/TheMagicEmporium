# Item Changes

The `changes` array on an `INDEPENDENT` modifier breakpoint patches fields on the item document directly using dot-notation paths.

---

## Structure

```json
"changes": [
  {
    "key": "system.magicalBonus",
    "operation": "SET",
    "value": 1
  }
]
```

| Field       | Required | Description                                   |
|-------------|----------|-----------------------------------------------|
| `key`       | Yes      | Dot-notation path to the field on the item.   |
| `operation` | Yes      | The operation to apply (see table below).     |
| `value`     | Yes      | A string, number, or boolean to use as input. |

---

## Operations

| Operation  | Effect                                                                       |
|------------|------------------------------------------------------------------------------|
| `SET`      | Replaces the field with the given value.                                     |
| `ADD`      | Adds the value to the current number (supports negative values to subtract). |
| `MULTIPLY` | Multiplies the current number by the value.                                  |
| `APPEND`   | Appends the value to an array field.                                         |
| `MIN`      | Keeps whichever is smaller: the current value or the given value.            |
| `MAX`      | Keeps whichever is larger: the current value or the given value.             |

Multiple changes in the same breakpoint are applied in order. Later entries can overwrite earlier ones if they target the same field.

---

## Common Keys

| Goal                         | Key                    |
|------------------------------|------------------------|
| Set the magical attack bonus | `system.magicalBonus`  |
| Set the item's rarity        | `system.rarity`        |
| Add to the armor class value | `system.armor.value`   |
| Append a property tag        | `system.properties`    |

---

## Example

```json
{
  "identifier": "TME.KEEN_EDGE",
  "type": "INDEPENDENT",
  "breakpoints": [
    {
      "min": 0,
      "flavor": {
        "title": "Keen Edge",
        "description": "This weapon's edge has been magically sharpened, granting a +2 bonus to attack and damage rolls"
      },
      "changes": [
        {
          "key": "system.magicalBonus",
          "operation": "SET",
          "value": 2
        }
      ],
      "activities": []
    }
  ]
}
```
