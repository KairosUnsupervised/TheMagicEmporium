# Conventions

Shared rules for naming, values, and structure that keep modifiers consistent across packs.

---

## Identifier Naming

Every modifier identifier must be globally unique. The format is:

```
SOURCE.SCREAMING_SNAKE_CASE
```

`SOURCE` is a short prefix that identifies who owns the modifier. This prevents collisions between the
system's built-in modifiers and custom ones added by a world or third party.

| Prefix | Use for                                            |
|--------|----------------------------------------------------|
| `TME`  | Built-in modifiers shipped with The Magic Emporium |
| `CORE` | Core world modifiers managed by the GM             |

Third-party packs should choose a short, unique prefix that does not conflict with the above.

**Examples**

```
TME.IRON_PLATING
TME.ARCANE_ATTUNEMENT
CORE.BLESSED_STRIKES
```

---

## Flavor Naming

### Independent

| Case | Convention |
|------|------------|
| Non-stacking | No suffix — use the modifier name alone: `"Radiant"` |
| Stacking (multiple breakpoints) | Append a roman numeral matching the breakpoint strength: `"Radiant I"`, `"Radiant II"` |

### Unique

| Case | Convention |
|------|------------|
| Non-stacking | No suffix — use the modifier name alone: `"Radiant"` |
| Stacking (multiple breakpoints) | Append a roman numeral matching the breakpoint strength: `"Radiant I"`, `"Radiant II"` |

Multiple breakpoints on a Unique modifier are unusual. Prefer a single breakpoint at `min: 0` unless a
tiered presentation is specifically intended.

### Linear

Always append a bracketed `{amount}` suffix to the title so the resolved value is visible to the player:

```
"Alarming [ +{amount} ]"
```

`{amount}` is replaced automatically with the resolved breakpoint value at runtime.

### Tiered

Append the current tier and the maximum tier count in roman numerals inside brackets:

```
"Radiant [ I / IV ]"   ← item is at tier 1 of 4
"Radiant [ IV / IV ]"  ← item is at tier 4 of 4
```

---

## Breakpoint Values

### Unique

Multi-breakpoint Unique modifiers are rare. When used, a two-breakpoint setup is the standard:

| Float | Value |
|-------|-------|
| 0.0   | 1     |
| 0.75  | 2     |

### Linear

The appropriate values depend on how powerful the modifier is overall:

**Very strong modifier**

| Float | Value |
|-------|-------|
| 0.0   | 1     |
| 0.7   | 2     |

**Medium modifier**

| Float | Value |
|-------|-------|
| 0.0   | 1     |
| 0.5   | 2     |
| 0.8   | 3     |
| 0.95  | 4     |

### Tiered

Tiered modifiers follow the powers-of-two convention. The recommended breakpoints are the same regardless
of tier count:

| Float | Points |
|-------|--------|
| 0.0   | 1      |
| 0.5   | 2      |
| 0.8   | 4      |

The maximum points a single item can contribute is **4**. The total tier count then determines whether the
top tier is reachable solo or requires cooperation between items.

**4 tiers** — tier IV requires at least two items

| Tier | Min points | Reachable solo? |
|------|------------|-----------------|
| I    | 1          | Yes             |
| II   | 2          | Yes             |
| III  | 4          | Yes             |
| IV   | 8          | No — minimum two items needed |

**3 or fewer tiers** — all tiers reachable solo

| Tier | Min points | Reachable solo? |
|------|------------|-----------------|
| I    | 1          | Yes             |
| II   | 2          | Yes             |
| III  | 4          | Yes             |

With 4 tiers, tier IV is intentionally locked behind cooperation — no single item can provide the 8 points
needed, making it especially powerful when reached. With 3 or fewer tiers, the ceiling is always reachable
by a single high-float item.
