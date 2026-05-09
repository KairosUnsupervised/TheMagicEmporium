import {packLoader} from "./packLoader/PackLoader.ts";
import {Logger} from "./misc/Logger.ts";
import {namespace} from "@tme/shared/src/namespaceConfig";
import {MagicItem} from "@tme/library/src/item/Item.ts"
import {AbstractItem} from "@tme/library/src/item/AbstractItem.ts";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types.ts";
import {registerValidator} from "./validator/registerValidator";
import {registry} from "@tme/library/src/registry/Registry.ts";
import {Forge} from "@tme/library/src/forge/Forge.ts";

window.Hooks.once("init", async () => {
    Logger.log("Initializing")

    const packs = await packLoader.load()
    Logger.log("Loaded packs", packs)

    await registry.registerPacks(packs)
    Logger.log("Registered modifiers", registry)

    // biome-ignore lint/style/noNonNullAssertion: Required for FoundryVTT
    game.modules.get(namespace.core.id)!.api = { Registry: registry };
})

window.Hooks.once("ready", async () => {
    registerValidator()
})

// @ts-ignore
window.debug = Forge
