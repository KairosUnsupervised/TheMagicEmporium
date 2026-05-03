# Ideas, Concepts & Pitfalls

Working scratchpad for the FoundryVTT D&D 5e addon. Each topic has three buckets:
- **Concepts** — design ideas worth exploring
- **Open questions** — decisions not yet made
- **Pitfalls** — risks and things to watch out for

When something is decided, move it to the corresponding topic doc and remove it from here.

---

## Magic Items

### Concepts

**Slot ↔ rarity relationship.** Two models on the table:
- *Slot count scales with rarity* — Common fills 1 primary; Legendary fills full 3/3/1.
- *Always 3/3/1 capacity, fill rate scales with rarity* — every item has all slots; lower rarities leave some empty. More interesting for crafting integration (craft into empty slots) but harder to balance.

**Modifier definition shape.** Each modifier likely needs: id, tier, display name, description with templated values, value range or roll formula, allowed base item types, tags (fire/cold/defensive/martial/caster/etc.), in-tier rarity weight, mechanical hook (Active Effect / item action / macro).

**Implementation split by tier.**
- Primary → Active Effects (numeric bumps, fits dnd5e cleanly)
- Secondary → item actions / macros (active abilities)
- Tertiary → hybrid (often both passive and triggered)

**Generation flow sketch.** Pick base item → pick rarity → determine slot fill count → for each slot, weighted random pick from eligible modifier pool (filtered by base item compatibility, exclude duplicates) → roll per-modifier values → write item with generation log.

**Identification.** Could reveal slot-by-slot (primaries first, tertiary last) rather than all-or-nothing.

**UI.** Visual 3/3/1 slot grid on the item card. Rarity color-coding (white/green/blue/purple/orange ARPG style).

**Naming.** Procedural generation only at the moment — no GM-authored or player-rename support decided yet.

**Hand-authored named items.** Could remain a parallel track that ignores the slot system entirely.

### Open questions
- Slot model (see above) — gates the data schema, decide first.
- **Linear power display.** Linear modifiers no longer have a built-in "tier" — does the character sheet show the raw summed power (e.g. "Dex bonus: power 5"), or does each Linear modifier define its own way to translate total power into an in-fiction effect?
- **T4 unlock effects** — what kinds of "special powers" justify the T4 reward? Need example modifiers to anchor the design.
- **Float breakpoint authoring** — how are breakpoints defined per modifier? Uniform across all Float modifiers, or fully custom per modifier?
- **Float distribution** — uniform `[0,1]`, or weighted to make high-strength rolls rarer?
- **Float visibility.** Show the raw float to the player (PoE-style, perfect info for crafting decisions) or hide it and only show the resulting power level (Diablo-style, "did I roll high or low?" stays a mystery)? Decide intentionally — the two approaches create very different play and crafting cultures.
- **Generation vs stacking-type interaction** — should the roller avoid placing a Unique modifier on an item if the player already has it on an attuned item? Or roll freely and let the player deal with the wasted slot?
- **Item Bound modifiers** — what kinds of effects make sense here? (e.g. "this weapon is indestructible", "this item's name glows when near treasure".) The category is currently defined mostly by what it isn't. If Item Bound effects compete for slots against stat boosts and active abilities, they need to be genuinely impactful or players will never pick them. Need examples to validate the category — or consider whether this is better as a tag on other modifier types.
- **Tertiary slot economy.** One tertiary per item × max 3 attuned = 3 tertiaries on the player at the high end. If tertiaries are "build-defining," most build decisions live there, which makes the tertiary modifier pool sensitive to design:
  - Too few options → players see the same tertiaries everywhere, decisions feel forced.
  - Too many options → low chance of rolling a tertiary you actually want.
  - Tertiaries that synergize with primaries can become "feels-bad-to-not-have" traps.
- Within-tier weighting — uniform, or some modifiers rarer than others within their tier?
- Can tertiary modifiers reference other slots ("doubles all primary stat bonuses")?
- How many modifiers at v0.1? Realistic minimum to feel random: ~20 primary, ~15 secondary, ~8 tertiary.
- Authoring format — compendium pack, JSON, in-app editor?
- Custom Item subtype vs flag-based extension of existing dnd5e Item document?
- Migration when a modifier definition changes after items have already rolled it?
- Localization plan for templated descriptions?
- **Procedural naming.** A one-line "procedural names" plan is doing more work than it looks. Cheap templates ([Adjective] [Item] of [Effect]) repeat fast and won't reflect what's actually rolled on the item, which feels sloppy in an otherwise mechanically precise system. Either accept that names are flavor-only and disconnected from modifiers, or invest more design effort here.

### Pitfalls
- **5e doesn't have ARPG numeric headroom.** Random affixes can produce broken combinations the system isn't tuned for.
- **Three attunement slots is tight for a stacking-focused build game.** The whole design rewards getting multiple copies of the same modifier across items, but the player can only attune three at a time. In practice, most attuned modifiers will be isolated singletons; only 1–2 will actually stack into something interesting. The build-crafting fantasy will feel closer to "find a good item and slot it in" than "assemble a stack of identical mods." This isn't necessarily wrong — D&D 5e attunement is supposed to be tight — but it shapes the core loop, and **playtesting is needed** to see whether the build-stacking fantasy actually lands within these constraints.
- **Stacking math has to be visible.** Players need to see *why* their +3 Dex is +3 (one Linear from each item, or one T2 from two T1s) or trust in the system breaks. The character sheet needs to show derivations, not just totals.
- **Cognitive load.** Party of 4 × 3 items × up to 7 modifiers = ~84 effects in play. Automation has to actually carry the weight or the table grinds.
- **Modifier authoring is the real bottleneck.** The system is only as fun as the pool is rich. Authoring tooling matters more than it seems.
- **Active Effect / dnd5e coupling.** Schema has shifted before; system updates can break a lot of items at once.
- **GM-side complexity is acknowledged, not solved.** Worth thinking about a "simplified mode" for NPCs (fewer slots, simpler modifiers).
- **Conflicts with other modules** that touch the Item document.

---

## Item Generation

The engine that turns a template into a finished item. Called by gacha pulls, monster drops, and crafting alike. See `gacha.md` for the current decided state.

### Concepts
- **Determinism / seeds.** Generation should accept a seed for reproducibility (debugging, replay, GM-rerolls of the same scenario).
- **Forced modifiers.** Crafting and quest rewards may need to inject specific modifiers into a template-driven generation, bypassing the random pick for those slots.

### Open questions
- **What rarity gates beyond stamping a label.** Templates already encode slot caps, value, and luck per rarity — so most of "what does rarity mean" is implicit in template authoring rather than a hard-coded rule. But still open: do Tiered subtype access (Capped-at-T4 modifiers) and tertiary-slot eligibility live on the template itself, on the modifier pool, or on rarity directly? Or are they enforced via tags (e.g. T4-eligible templates seed a `LegendaryEligible` tag)?
- **Float budget interaction with luck.** Negative luck biases floats low → each modifier consumes less budget → more modifiers roll before the budget hits 0 → common items may end up with *more* (but weaker) modifiers than expected. Is that the intent, or should luck and budget be balanced to keep slot count stable?
- **Float budget vs slot caps — which dominates?** With a 0.8 budget and max 2+2+0 slots, if the first two rolls eat the whole budget, slots 3 and 4 don't fill. Conversely, with low floats, all caps may fill and budget remain. Is partial-fill the desired outcome, or should the system retry to hit cap?
- **Templates for non-Float modifiers.** No-Float modifiers don't deduct from the budget. Do they still count toward slot caps for free? Are they limited by some other mechanism, or is this expected (No-Float as the "always safe to include" option)?
- **Template authoring surface.** Compendium documents, JSON, in-app editor? Templates are now a first-class authoring artifact alongside modifiers.
- **Tag taxonomy governance.** Tags are free-form strings under the current design (anyone can write `ArmorWithAC` or `SavingThrow`). Risks: typos creating dead branches (a modifier whitelisting `ArmourWithAC` never rolls), and inconsistent naming making the system hard to reason about. Options: free-form (current), fixed enum (rigid but safe), hybrid with a canonical list + free-form extensions.
- **Themed pools / external tag injection.** The current tag system grows the array from base item + rolled modifiers. Should callers (a fire-themed dungeon, a gacha banner) also be able to seed additional tags into the array at the start of generation, to bias which modifiers roll?
- **Tag-driven exclusion vs explicit exclusion groups.** Tags currently carry both purposes — typing (`Armor`) and exclusion (`SavingThrow`). Clean for now, but worth watching: if a modifier needs to apply a typing tag *without* it acting as an exclusion vector, the model has no way to express that. Consider whether typing tags and exclusion tags need to live in separate namespaces.
- **Within-tier weighting.** Uniform across modifiers of a tier, or per-modifier rarity weight? Affects how "common" rare modifiers feel. (Tag eligibility happens before weighting, so weighting is about distribution among the *eligible* pool.)
- **Failure modes.** What if no modifier passes the whitelist/blacklist check for a slot? Drop the slot, retry with relaxed constraints, or hard fail?
- **Item type weighting.** "Mostly random, slightly weighted" — what's the weight source? Per-template? Global? Tied to base-item rarity (rings rarer than swords)?
- **Naming pools.** "Random prefix" and "random name for that type" need actual pools. Per-rarity prefix pools (a Common item gets "Crude," a Legendary gets "Apocalyptic")? Authored alongside templates or separately? Could names also key off applied tags (a fire-tagged item gets a flame-themed prefix)?

### Pitfalls
- **Generation is the integration point** for magic items, gacha, and crafting. Schema decisions here ripple into all three. Worth getting right before building consumers.
- **Order-dependent rolls.** With `Applies` tags shaping later picks, the order in which slots are filled changes which modifiers can roll. Filling primaries before secondaries, or vice versa, can produce different items from the same template. Is the order specified, deterministic, or randomized? Worth pinning down explicitly.
- **Tag debugging is going to be painful.** "Why didn't this modifier roll?" will frequently come down to "a previously-rolled modifier applied a tag that blacklisted it." A generation log that records the tag-array state at each step is basically required for authoring sanity.
- **Template proliferation.** With per-rarity templates and likely per-context variants (boss-drop template, gacha-banner template, monster-pocket-change template), you can end up with dozens of nearly-identical templates that drift out of sync. Worth thinking about template inheritance or composition early.
- **Float budget is a hidden balance lever.** Two templates with identical slot caps but different budgets produce wildly different items. Easy to miscalibrate during authoring without a way to preview "what does an average roll from this template look like" — a template preview/test tool will save a lot of pain.

---

## Gacha

The player-facing mechanic. Calls into Item Generation to produce results. Currently brainstorm-stage; current direction in `gacha.md`.

### Concepts
- Diegetic framing (god's blessing, planar merchant, magic chest, class feature)
- Single-player / table-local context — gacha vocabulary applies but no real-money concerns
- Pulls don't store pre-rolled items. Each pull calls Item Generation fresh, so every result is unique.
- Voucher/wish split — vouchers define pull archetypes, wishes adjust them. Both single-use, consumed on pull.
- Core design tension: every pull involves tradeoffs. Wishes that help in one dimension hurt in another, or are expensive to accumulate. No free path to OP items.

### Open questions
- **How are vouchers and wishes acquired?** Quest rewards, in-world purchase, downtime, milestone rewards, drops from boss fights? Same source for both, or different (vouchers as the staple, wishes as the special reward)?
- **Wish design space for tradeoffs.** What do "double-edged" wishes actually look like? Examples:
  - `Luck Rarity +2, Reveal -2` — better rarity but fewer items to choose from.
  - `Guaranteed Legendary, Pick -1, Hidden: nothing` — you know one is legendary, but you see less and keep less.
  - `Luck Float +3, Weapon Pool: armor only` — amazing floats, but you can't draw weapons.
  - Are tradeoffs always on a single wish, or can they be implicit (a voucher with bad base values that you're expected to wish-stack into)?
- **Guaranteed conditions.** "Guaranteed one legendary" is clear, but what's the full condition space? Guaranteed rarity, guaranteed tag, guaranteed modifier, guaranteed base item type? Each one widens the design surface.
- **Guaranteed vs Luck Rarity interaction.** If you guarantee a Legendary, does Luck Rarity still affect the *other* revealed items? Or does the guarantee eat the budget/luck?
- **Pity scope.** Per-player, per-voucher, per-campaign? Carries across sessions?
- **Pity payout.** Does pity guarantee a specific rarity, a specific tag? Does it function like an invisible Guaranteed modifier, or something else?
- **The "Hidden" mechanic is interesting and underexplored.** Showing only rarity vs only type vs only image creates very different decision experiences. "Hidden: nothing" as a wish downside is compelling — you're picking blind.
- **Reveal > Pick is the core tension.** With reveal=5, pick=1, the player rejects 4 items. Does seeing rejected items create regret, or excitement?
- **Pulled items vs identification.** Are gacha-pulled items pre-identified, or does identification still apply?
- **GM-side gacha.** Does the GM ever need to pull on behalf of a player?
- **Diegetic framing.** Vouchers and wishes are mechanical terms — what do they look like in the fiction?

### Pitfalls
- Gacha vocabulary carries baggage. Be transparent about rates; avoid dark patterns.
- Players who don't want gacha in their D&D — must be fully opt-in.
- Social dynamics when one player rolls great and another doesn't.
- The word "gacha" itself may put off some users — consider neutral default name with gacha as a skin.
- **Wish complexity creep.** Tempting to add wishes that modify everything. Each new dimension is another interaction surface to balance. Worth deciding early which draw modifiers wishes can touch.
- **Voucher/wish UI is non-trivial.** Players need to see the resolved draw modifiers before pulling, with each wish's contribution visible.
- **Tradeoff legibility.** The "no free lunch" design only works if players can clearly see *what they're giving up* before committing. If the costs are hidden in modifier math, players will feel cheated rather than challenged. The UI has to make tradeoffs obvious.
- **Economy pacing.** Single-use consumables mean the GM controls the loot pipeline. Too many vouchers/wishes = inflation (players pull constantly, items lose value). Too few = frustration (the gacha system exists but never fires). Need GM-side guidance or default pacing recommendations.

---

## Crafting

PoE-like crafting on existing randomized items. Risk models are defined (see `crafting.md`). Crafting actions and material economy are still open.

### Concepts

**Crafting actions (candidate list — none decided yet):**
- Reroll a single slot
- Reroll all slots of one tier
- Add a modifier to an empty slot
- Lock a slot before rerolling others
- Upgrade rarity (expand slot count or available tier pools)
- Targeted reroll — guarantee a tag (e.g. fire) while still random within it
- Salvage — destroy item to recover materials, possibly tagged by what modifiers it had
- Reroll float values — keep modifier identities, reroll within their value ranges

**Material economy:**
- Mundane materials, monster parts, magical reagents, currency — or some subset
- Salvage as a material source (destroy items to feed the crafting loop)
- Gacha duplicate conversion into crafting materials

**Crafting as FoundryVTT items.** Following the voucher/wish pattern, crafting actions (orbs, scrolls, etc.) could also be FoundryVTT items with metadata defining what they do — fully GM-customizable, distributed as loot.

### Open questions
- **Which risk model when?** World setting (one model for the whole campaign), per-item property (some items are fragile, some aren't), or per-craft-action (rerolling a tertiary is riskier than rerolling a primary)?
- **Durability / potential as item properties.** Where do these values live on the item? Are they set at generation time, fixed by rarity, or assigned when an item first enters the crafting system?
- **Durability / potential values.** What's the range? A Legendary item with 3 durability vs 10 durability creates very different crafting experiences. Is this configurable per-template?
- **Failure rate.** For the risk models that involve failure chance (Durability, Instant Destroy, Potential Chance), what determines the failure rate? Flat per-action, scaled by action type, scaled by item rarity, scaled by how many times the item has been crafted on?
- **Craft-from-scratch, or only modify existing items?** PoE does both (base items drop, crafting modifies them). This system could do the same — or restrict crafting to modification only, with generation being the only way items enter the world.
- **Material cost per action.** Fixed per action type, scaled by item rarity, scaled by target slot tier?
- **Class/feat interaction.** Does an Artificer get reduced failure rate, cheaper costs, extra potential?
- **Crafting actions as items.** If crafting orbs/scrolls are FoundryVTT items (like vouchers/wishes), are they consumed on use? Can they carry metadata that modifies the craft (e.g. an orb that guarantees a fire-tagged reroll)?
- **Interaction with the tag system.** Do crafting actions respect the item's tag array? (Rerolling a primary slot should still enforce whitelist/blacklist from the existing tags on the item.)
- **Potential vs durability — can both exist on the same item?** Or are they mutually exclusive per risk model?
- **Potential Chance: does the craft succeed when potential is lost?** Three options:
  - Craft succeeds AND potential is removed (the "lucky tax" — you got what you wanted but paid extra for it).
  - Craft fails AND potential is removed (double punishment — harsh, may discourage crafting entirely).
  - Potential loss and craft success are independent rolls (two dice, four outcomes — most granular but hardest to communicate to players).

### Risk model analysis
**Recommendation: Potential Chance** as the default/primary model, for the following reasons:

**No Risk** undermines the gacha design philosophy. The whole system is built around "no free path to OP items" — if crafting has zero risk, it becomes the dominant strategy over pulling. Randomness of results alone isn't enough friction when attempts are unlimited.

**Instant Destroy** is a poor fit for D&D specifically. PoE players accept item destruction because items drop constantly in high volume. Here, items come from gacha pulls that cost single-use vouchers and wishes — losing a crafted-on item to a single bad roll will feel devastating. Players will stop crafting.

**Durability** has a perverse incentive: at low durability the rational move is to gamble harder ("might as well slam it, it's almost gone anyway") rather than craft carefully. It also doesn't interact with item quality — a perfect item and a mediocre item tick down identically.

**Potential** (guaranteed removal) is clean but *too* predictable. There's an objectively correct strategy (save your last potential for the most impactful craft), and once figured out, every decision is solved. No tension on the individual craft, just resource planning.

**Potential Chance** layers two kinds of randomness that create genuinely interesting decisions:
1. "Did my craft produce a good result?" (the modifier roll)
2. "Did I burn a potential doing it?" (the potential-chance roll)

This means each craft feels *consequential* without being *catastrophic*. You can't perfectly math out the optimal strategy because you don't know how many crafts you'll actually get. Two identical items will have different crafting histories, feeding into the item-identity fantasy. It also pairs naturally with extension points: wishes that reduce potential-loss chance, Artificer features that do the same, crafting actions that cost more materials but skip the potential roll.

**Tuning notes:** Potential-loss chance needs to be high enough to respect (~30–50%) but not so high it's effectively the Potential model with extra steps. Initial potential values per rarity need careful tuning — too high = effectively unlimited crafting, too low = Instant Destroy psychology.

### Pitfalls
- **Scope creep** — crafting systems are notoriously easy to design forever and hard to ship.
- **Economy balance** — too cheap trivializes the gacha loop (why pull when you can craft?), too expensive means no one bothers.
- **Power creep** — crafting gives players deterministic control over item improvement. Even with random results, being able to *repeatedly try* is stronger than a single gacha pull. The risk models exist to counterbalance this, but tuning matters.
- **Risk model feel.** Instant Destroy will feel punishing to many D&D players who aren't used to PoE-level item loss. No Risk removes all tension. The middle options (Durability, Potential, Potential Chance) are probably where most campaigns land, but each has a different psychological profile. Worth playtesting all five.
- **Potential as a hidden cap on item power.** Potential effectively limits how many times an item can be improved. High-potential items become strictly better crafting targets than low-potential ones — this is probably intentional (another axis of item quality), but makes potential-at-generation a balance-sensitive value.
- **Conflicts** with other crafting modules in the dnd5e ecosystem.

---

## Cross-cutting

### Concepts
- All three systems share materials/items/currency — a clean shared inventory and currency abstraction pays for itself.
- Single shared "modifier" / "tag" vocabulary across magic items, gacha pools, and crafting filters.

### Pitfalls
- Coupling between subsystems makes each one harder to ship independently. The natural MVP order:
  1. **Magic Items** — data model for items and modifiers (state).
  2. **Item Generation** — the engine that rolls items. Useless without (1), required by (3) and (4).
  3. **Gacha** — calls into generation. Can ship without crafting.
  4. **Crafting** — calls into generation, plus material/inventory layers. Can ship without gacha.
