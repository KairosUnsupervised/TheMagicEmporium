# Modifier & Packs

All modifiers are stored in groups called `Packs` as JSON files at the following path:

`worlds/{world.id}/the-magic-emporium/modifiers/{file}.json`

When a new world is created, the default packs are copied into it automatically.

// TODO TME-19 Setup Experience

// TODO Auto Update Experience

## Disabling a pack
A pack can be disabled by setting the root `enabled` property to `false` in its JSON file.
It can be re-enabled by setting it back to `true`.

**Do not delete the JSON file.** Disabling a pack prevents its modifiers from rolling on new items, but existing items that already have those modifiers rolled still rely on the file to function correctly.

## System update packs
When the module updates and ships new versions of the default packs, those new versions are copied over automatically. A semantic version number is appended to their filename. Because the module does not track user-made changes, updated packs are always disabled by default, existing packs are never overwritten or duplicated.

// TODO TME-20 System Prompting

## Disabling a Modifier
A modifier can be disabled by setting its `enabled` property to `false`, and re-enabled by setting it back to `true`. Setting the weight to zero has the same effect as disabling it, though `enabled: false` is preferred for clarity.

**Do not delete a modifier or its JSON file.** Disabling it prevents it from rolling on new items, but existing items that already have it rolled still depend on the data to function correctly.

If a modifier is removed entirely, any item that rolled it will display a `Broken Modifier` in its place.

// TODO TME-21 Data structure and how to remove this

## Customizing a Modifier
To customize a modifier or a pack, edit the JSON files directly. They are never overwritten by module updates, so your changes are safe.

// TODO TME-22 Extensive Documentation
// TODO TME-23 JSON Validation
