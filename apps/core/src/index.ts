import {loadPacks} from "./packs/loadPacks.ts";
import {Logger} from "./misc/Logger.ts";
import {namespace} from "@tme/shared/src/namespaceConfig";
import {MagicItem} from "@tme/library/src/item/Item.ts"
import {AbstractItem} from "@tme/library/src/item/AbstractItem.ts";
import { Equipment } from "@tme/library/src/item/equipment.types.ts";
import {registerValidator} from "./validator/registerValidator";
import {registry} from "@tme/library/src/registry/Registry.ts";

window.Hooks.once("init", async () => {
    Logger.log("Initializing")

    const packs = await loadPacks()
    Logger.log("Loaded packs", packs)

    await registry.loadPacks(packs)
    Logger.log("Registered modifiers", registry)

    // biome-ignore lint/style/noNonNullAssertion: Required for FoundryVTT
    game.modules.get(namespace.core.id)!.api = { Registry: registry };
})

window.Hooks.once("ready", async () => {
    registerValidator()
})


window.debug = () => {
    const abstractItem = new AbstractItem();

    abstractItem.base = Equipment.Battleaxe;
    abstractItem.primary.push(registry.weighted[0])

    const item = new MagicItem(abstractItem)

    console.log(item.export())

    Item.create(item.export())
}

/**
 * TODO
 * 1. Example Unique Modifiers
 * 2. Actor Validation
 * 3. Bring Other Modifiers to Life
 * 3. Alt // Images
 */
