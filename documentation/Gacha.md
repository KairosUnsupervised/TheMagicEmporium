# Gacha Configuration

## Modifiers

| Field | Type | Description                                       | Naming Scheme |
|-------|------|---------------------------------------------------|---------------|
| Equipment Pool Whitelist | `Array` | Available Equipment                               | Equipment |
| Rarity Luck | `Float` | Changes the chance to draw rarity                 | Luck to Rarity |
| Float Luck | `Float` | Changes the luck generation on items              | Luck to Modifiers |
| Reveal | `Number` | How many items to reveal to the player            | Reveals |
| Pick | `Number` | How many items the user can pick in total | Pulls |

Example: +2 Reveals, +1 Pull

## Visibility

A numeric value (`0`–`4`) controlling how much information is shown to the player before picking.

| Value | Level | Revealed to player |
|-------|-------|--------------------|
| `0` | Blind | Nothing |
| `1` | Low | Image |
| `2` | Moderate | Name and type |
| `3` | High | Rarity |
| `4` | Perfect | Modifiers |

## Locking

`force` writes a value and locks the field. It's important to use force only for low values, and unlock before setting the value and locking again.

Accepted terms: *locked in*, *locked*, *forced*.

Example: +2 Reveals, Forces you to be blind
