import {loadPacks} from "./packs/loadPacks.ts";
import {Logger} from "./misc/Logger.ts";
import {registry} from "./misc/registry.ts";

window.Hooks.once("init", async () => {
    Logger.log("Initializing")

    const packs = await loadPacks()
    Logger.log("Loaded packs", packs)

    registry.loadPacks(packs)

    console.log(registry)

})
