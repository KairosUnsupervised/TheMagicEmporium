# Workflow

## Keywords

The following terms are used throughout the codebase. Understanding the distinction between them is key to following the workflow.

- **Definition** — Raw JSON authored by a pack creator that describes the behavior or output of a modifier or effect.
- **Schema** — Either an interface or an JSON schema that defines and validates the shape of a Definition, ensuring required fields are present and correctly typed before any processing occurs.
- **Effect** — An umbrella term for anything applied to a character as a result of a modifier. An Effect is either an ActiveEffect or a Feat.
- **ActiveEffect** — A passive, always-on bonus applied to a character's stats (e.g. +1 AC). Stored as a Foundry ActiveEffect on the actor.
- **Feat** — Any non-passive effect that requires its own entry on the character sheet (e.g. a special ability or action). Stored as a separate Item on the actor.

## Init

- All packs are loaded and validated
- All modifier definitions of the packs are loaded and validated
- The resulting modifiers are stored in the "registry"

## Item Change
- Needed modifiers are calculated and retrieved from the registry
- The set of ActiveEffects and Feats is calculated
- The actor is updated to reflect this set

## Validation
Validation is generally done just in time, before the data is needed
- Pack validation is done at pack load on init
- Modifier validation is done upon construction before loading into the registry
- Feat and ActiveEffect validation is handled by the Effect abstraction
