---
name: project-gacha-ui
description: Current state of the gacha UI system — what's built, component inventory, and pending work
metadata:
  type: project
---

Gacha UI pull flow is substantially built. Components live in `packages/ui/src/components/gacha/pull/`.

**Why:** Building a D&D 5e gacha item picker with Art Deco / Chinese / space theme.

**What exists:**
- `PullItem` — card for a single AbstractItem with 5 visibility stages (0=blind→4=perfect), rarity glow (drop-shadow + top stripe + bloom), selection border trace SVG (framer-motion pathLength), selection strip diamond (◆/◇), juicy spring appear animation with brightness flash and 70ms stagger
- `Pull` — grid of N PullItem cards, picks X, HUD strip with hollow/filled diamonds, "Seal Your Fate" button styled after DrawButton (diagonal clip-path, outer rings, kanji, corner brackets, shimmer)
- `Orbiter` — total = available, bright = revealed, dim = available - revealed
- `Inventory` — stores full GachaItem5e<WishFlag> objects (not IDs)
- `Vignette` — 5-stage opacity overlay (z-index 5)
- `Sunburst` — rarity luck display (-8 to +8 range), ray opacity doubled

**How to apply:** When adding to this flow, keep the Cinzel font, deep navy palette (#0e1124→#07091a), gold (#d4a64a), clip-path chamfer patterns, and framer-motion spring conventions already established.
