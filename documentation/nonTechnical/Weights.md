# Modifier Weights

The `weight` field controls how likely a modifier is to appear in the loot pool. Higher means more common, lower means less common. A weight of `0` removes the modifier from the pool entirely.

---

## Default Weight

Every modifier should default to **1024** unless there is a specific reason to deviate.

```json
"application": {
  "weight": 1024
}
```

---

## Splitting Weight Across Similar Modifiers

When multiple modifiers cover the same conceptual space (e.g. two different on-kill effects), they should be mutually exclusive via `blacklistedBy` tags and their weights split so that together they match the probability of a single normal modifier.

**Example — two modifiers that should share one slot:**

| Modifier | Weight | Combined |
|----------|--------|----------|
| `TME.FOO` | 512 | 1024 |
| `TME.BAR` | 512 | 1024 |

Each modifier applies a tag via `applies`, and each blacklists the other's tag:

```json
{
  "identifier": "TME.FOO",
  "application": {
    "weight": 512,
    "applies": ["FOO"],
    "blacklistedBy": ["BAR"]
  }
}
```

```json
{
  "identifier": "TME.BAR",
  "application": {
    "weight": 512,
    "applies": ["BAR"],
    "blacklistedBy": ["FOO"]
  }
}
```

This way an item can only ever have one of the two, and their combined presence in the pool equals one full-weight modifier.

**Three-way split:**

| Modifier | Weight |
|----------|--------|
| `TME.A`  | 341    |
| `TME.B`  | 341    |
| `TME.C`  | 342    |

Use `342` on one to round up to the nearest integer when dividing `1024` unevenly.

---

## When to Deviate

| Situation | Suggested weight |
|-----------|-----------------|
| Deliberately rare (e.g. very powerful tertiary modifier) | 256–512 |
| Intentionally common (e.g. a flavour-only modifier) | 2048+ |
| Disabled but kept for reference | 0 |
