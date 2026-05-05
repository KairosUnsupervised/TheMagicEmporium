import {loadPacks} from "./packs/loadPacks.ts";
import {Logger} from "./misc/Logger.ts";
import {registry} from "./misc/registry.ts";
import {namespace} from "@tme/shared/src/namespaceConfig";

window.Hooks.once("init", async () => {
    Logger.log("Initializing")

    const packs = await loadPacks()
    Logger.log("Loaded packs", packs)

    await registry.loadPacks(packs)
    Logger.log("Registered modifiers", registry)

    // biome-ignore lint/style/noNonNullAssertion: Required for FoundryVTT
    game.modules.get(namespace.core.id)!.api = { Registry: registry };

})
