# Design Principles

A reference for creating modifiers in The Magic Emporium — covering design rules, naming conventions, and structural guidelines.

---

## Mental Load Belongs to the Player, Not the DM

The Mental Load of modifiers should be on the **player's own character**. The player is responsible for tracking what their item does, the DM should never need to remember that a modifier or effect exists.

---

## Prefer Quick Rulings Over Precise Rules

Descriptions and disclaimers should be short and evocative, enough for a player to understand what the modifier does at a glance. Do not try to cover every edge case in the text.

Use quick GM ruling, play as intended and not as a rule lawyer.

---

## Slot Restrictions

Restrictions control which slot a modifier can occupy.

- `PRIMARY` — Weakest modifiers, mostly UNIQUE, LINEAR, and INDEPENDENT types
- `SECONDARY` — Stronger modifiers, mostly TIERED, LINEAR and powerful others, consumable effects
- `TERTIARY` — Incredibly strong, legendary-tier modifiers

---

## Weights

Weight determine how often a modifier appears in the loot pool. The default weight is **1024**. Setting it to `0` removes the modifier from the pool entirely. Stronger or weaker modifiers should be given a specific slot restriction and not a specific weight.

When multiple modifiers cover the same conceptual space, make them mutually exclusive via `blacklistedBy` tags and split their weights so they together equal one normal modifier's probability.

---

## Breakpoints

Breakpoints determine how strong a single modifier is depending on their float. They are top-heavy meaning that stronger effects are less likely. The JSON schema provides sane defaults.

