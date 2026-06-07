# Modifiers

**Pity** Number // Full Integer, each pity stack increased rarity luck by n amount.
**Equipment Pool Whitelist** Array // Available Equipment
**Equipment Pool Blacklist** Array // Blocked Equipment
**Rarity Luck** Float // Changes the chance to draw rarity
**Float Luck** Float // Changes the luck generation on items
**Reveal** Number // How many items to reveal to the player
**Pick** Number // How many items the user can pick in total

This is now a number, 0 | 1 | 2 | 3 | 4
**Nothing Visible**
**Shown Image** User can see the image of the item before picking
**Shown Name** User can see the name of the item before picking
**Shown Type** User can see the type of the item before picking
**Shown Rarity** User can see the rarity of the item before picking

# Operations

Each modifier carries an array of `operation` descriptors — plain JSON objects applied in order to build the final GachaConfig before rolling.

```json
{ "op": "set",      "field": "floatLuck",  "value": 2        }
{ "op": "increase", "field": "rarityLuck", "amount": 1       }
{ "op": "multiply", "field": "floatLuck",  "factor": 0.5     }
{ "op": "clamp",    "field": "rarityLuck", "min": -2, "max": 3 }
{ "op": "force",    "field": "reveal",     "value": 3        }
{ "op": "push",     "field": "equipmentWhitelist", "value": "sword" }
{ "op": "remove",   "field": "equipmentBlacklist", "value": "sword" }
{ "op": "set",      "field": "hidden.rarity", "value": true  }
{ "op": "setMinRarity", "value": "Rare"                      }
```

`force` writes the value and locks the field — any subsequent operation targeting that field fails the entire gacha config build.

## Pity — first-class field, not a condition

Pity (incrementing rarity luck per roll) is a procedural concern of the runner, not a user-authored condition. The runner owns the pity counter and applies it to `rarityLuck` directly before each roll. Conditions (`if pity > N, then ...`) are explicitly out of scope for v1.

---

# UI Layout

The primary surface consists of one **Envelope** (the sealed main pull) and up to **4 Wishes** (individual pick cards) fanned in a half-circle below it.

```
          [ ENVELOPE ]

    [ W ]    [ W ]    [ W ]    [ W ]
        \      |      |      /
         `----arc-arc----'
```

The arc radius and card spacing adapt to the active wish count — a single wish sits at the bottom center, two wishes mirror symmetrically, and so on up to four.

---

# UI Design

## Theme

**Chinese gacha · Art Deco · space / stars**

The existing item card establishes the base vocabulary: deep navy (`#0e1124` → `#07091a`), gold (`#d4a64a`, `#f3dca0`), Cinzel for labels, Cormorant Garamond for names, geometric SVG corners, hex lattice. The gacha layer extends this with three overlaid idioms:

- **Chinese** — ruyi cloud silhouettes, radial symmetry, lacquer-red accent for high-pity / forced states (`#c93030`)
- **Art Deco** — fan / sunburst line bursts, stepped concentric borders, strict bilateral symmetry on every panel
- **Space / Stars** — a faint procedural star field behind all gacha surfaces, constellation dot-lines connecting card positions in the grid, comet streak on high-rarity reveals

---

## Components

### GachaCard

Face-down card shown in the picker grid before the player selects. Size matches `ItemDisplay` width (460 px wide).

**Structure (back face)**
- Same stepped border + corner SVG as `ItemDisplay`
- Center: a large Art Deco sunburst (18 radiating lines, alternating long / short) in `#d4a64a` at 15 % opacity — the "sealed" state
- Overlaid ruyi cloud pair (top-left / bottom-right mirror) as a thin SVG path at 20 % opacity
- Scattered micro-stars (8–12 px `<circle>` dots, random positions, 30–60 % opacity, `#f3dca0`) — static, not animated

**Revealed state (front face)**
When `hidden.*` flags lift, the card flips (CSS 3-D `rotateY`, 600 ms, `ease-out-quart`) to show a condensed summary:
- Rarity label (Cinzel, 9 px, letter-spacing 0.38 em) — omitted when `hiddenRarity = true`, replaced with `— — —`
- Item name — omitted when `hiddenName = true`, replaced with a row of three dashes
- Equipment type icon — omitted when `hiddenType = true`
- Background image thumbnail (blurred, 40 % brightness) — omitted when `hiddenImage = true`

**Highlighted / selected state**
- `box-shadow` outer glow in the rarity color at 60 % opacity
- Corner SVGs gain a second inner-bracket path that pulses (animejs `alternate`, 1.4 s, opacity 0.4 → 1)

---

### PickerGrid

The parent surface the player interacts with. Displays `reveal` cards and lets the player pick up to `pick` of them.

**Layout**
- Centered column, max-width 1 200 px
- Cards wrap into rows of up to 3; gap 24 px
- A `constellation` SVG layer sits behind the grid: thin lines (`stroke: #d4a64a`, opacity 0.08) connect card center-points, with a `<circle r="3">` dot at each vertex

**HUD strip (bottom of grid)**
Three readouts in Cinzel 9 px / letter-spacing 0.3 em, separated by the same `●` dot used in `Header`:

```
PICKS REMAINING  ●  3 / 5  ●  PITY ✦ 4
```

- `PITY` count is decorative display only — the runner owns the real value
- When `pick` is exhausted the HUD strip changes color to `#c93030` (lacquer red) and all unselected cards desaturate to grayscale

**Star field (background)**
A `<canvas>` or `<svg>` layer behind the grid surface: ~120 dots randomly placed, three size tiers (r 0.5 / 1 / 1.5 px), opacity 0.15–0.5. Static; no twinkle animation in v1.

---

### RevealScreen

Full-viewport overlay that fires after the player confirms picks. Shows each chosen item one at a time (or all at once if `pick = 1` and `reveal = 1`).

**Choreography (per item, sequential)**
1. **Comet streak** — diagonal SVG line sweeps across the viewport in 300 ms (`ease-in-quad`). Only plays for Rare+.
2. **Iris open** — same `clipPath circle(0% → 150%)` + `scale(0.94 → 1)` already on `ItemDisplay`, 1 100 ms `outQuart`
3. **Rarity flash** — full-viewport radial burst in the rarity color at 8 % opacity, fades out over 600 ms
4. **Item card settles** — `ItemDisplay` drops in from `translateY(-12px)`, opacity 0 → 1, 400 ms

For Legendary: before step 1 the screen holds black for 800 ms with a slow star-drift effect (the star field layer scrolls at 0.3 px/frame) — a "breath" beat before the reveal.

**Navigation**
- `NEXT` button (Cinzel, 9 px, letter-spacing 0.3 em, gold border) advances to the next item
- On the final item the button reads `CLOSE`
- No skip in v1

---

## Color Tokens (gacha-specific additions)

| Token | Value | Use |
|---|---|---|
| `--gacha-star` | `#f3dca0` | Micro-star dots, constellation vertices |
| `--gacha-cloud` | `#d4a64a` | Ruyi cloud SVG paths |
| `--gacha-lacquer` | `#c93030` | Exhausted-pick state, pity highlight |
| `--gacha-burst` | `rgba(212,166,74,0.15)` | Sunburst fill on card back |
| `--gacha-constellation` | `rgba(212,166,74,0.08)` | Grid connector lines |

All other tokens (`--rarity-color`, `--rarity-shadow`) are inherited from `Header`.

---

## Animation Budget

| Animation | Duration | Easing | Library |
|---|---|---|---|
| Card flip (back → front) | 600 ms | ease-out-quart | CSS |
| Corner pulse (selected) | 1 400 ms alternate | ease-in-out | animejs |
| Iris open (reveal) | 1 100 ms | outQuart | animejs |
| Rarity flash fade | 600 ms | ease-out | CSS |
| Comet streak | 300 ms | ease-in-quad | animejs |
| Legendary black-hold | 800 ms | — | setTimeout |
| Card settle (translateY) | 400 ms | easeOut | framer-motion |
