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

## Flavor Text

Never end a `description` or `disclaimer` with a period. The UI does not use sentence-ending punctuation.

```
✓ "Gain {amount}d4 temporary HP on direct creature kill"
✗ "Gain {amount}d4 temporary HP on direct creature kill."
```

---

## Flavor Naming

Use the modifier name alone for all types — no suffixes, roman numerals, or `{amount}` appended to the title.

The UI displays tier, amount, and stacking information separately.

### Shared Denominator Across Tiers and Breakpoints

All tiers or breakpoints of a modifier must share a common name. Use the base modifier name for the first tier, then prefix higher tiers with an adjective.

```
Tier I   → "Embracement"
Tier II  → "Vital Embracement"
Tier III → "Soulful Embracement"
Tier IV  → "Transcendent Embracement"
```

The adjective should escalate in weight or intensity alongside the tier's power. Activity names within a tier must match the tier title.

---

## Weights

The `weight` field controls how likely a modifier is to appear in the loot pool. Higher means more common, lower means less common. A weight of `0` removes the modifier from the pool entirely.

Every modifier should default to **1024** unless there is a specific reason to deviate.

### Splitting Weight Across Similar Modifiers

When multiple modifiers cover the same conceptual space, make them mutually exclusive via `blacklistedBy` tags and split their weights so they together equal one normal modifier's probability.

**Two-way split:**

| Modifier   | Weight | Combined |
|------------|--------|----------|
| `TME.FOO`  | 512    | 1024     |
| `TME.BAR`  | 512    | 1024     |

Each applies its own tag and blacklists the other's:

```json
{ "identifier": "TME.FOO", "application": { "weight": 512, "applies": ["FOO"], "blacklistedBy": ["BAR"] } }
{ "identifier": "TME.BAR", "application": { "weight": 512, "applies": ["BAR"], "blacklistedBy": ["FOO"] } }
```

**Three-way split:** use `341 / 341 / 342` (rounding the remainder onto one entry).

### When to Deviate

| Situation | Suggested weight |
|-----------|-----------------|
| Deliberately rare (e.g. very powerful tertiary modifier) | 256–512 |
| Intentionally common (e.g. a flavour-only modifier) | 2048+ |
| Disabled but kept for reference | 0 |

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
