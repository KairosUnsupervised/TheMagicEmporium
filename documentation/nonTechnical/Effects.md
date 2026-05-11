# Effects

An **effect** is something applied to a character when they have a modifier active (i.e. the item is equipped and
attuned). Effects are defined on `UNIQUE`, `LINEAR`, and `TIERED` modifiers using two separate arrays — one per type
— rather than a single mixed list.

| Array           | Type            | Description                                                                                  |
|-----------------|-----------------|----------------------------------------------------------------------------------------------|
| `activeEffects` | `ACTIVE_EFFECT` | A passive, always-on bonus applied directly to a character's stats (e.g. +2 to a skill).     |
| `feats`         | `FEAT`          | A non-passive ability added as its own entry on the character sheet (e.g. a special action). |

Both arrays default to `[]` and are independent — a single breakpoint or tier can contain any number of entries in
either. An empty `activeEffects` and `feats` produces a default passive feat using the modifier's flavor text.

See [ActiveEffects.md](ActiveEffects.md) and [Feats.md](Feats.md) for the full structure of each type.
