# Effects

An **effect** is something applied to a character when they have a modifier active (i.e. the item is equipped and
attuned). Effects are defined inside the `effects` array of a modifier.

There are currently two types of effect:

| Type            | Description                                                                                  |
|-----------------|----------------------------------------------------------------------------------------------|
| `ACTIVE_EFFECT` | A passive, always-on bonus applied directly to a character's stats (e.g. +2 to a skill).     |
| `FEAT`          | A non-passive ability added as its own entry on the character sheet (e.g. a special action). |

See [ActiveEffects.md](ActiveEffects.md) and [Feats.md](Feats.md) for the full structure of each type.
