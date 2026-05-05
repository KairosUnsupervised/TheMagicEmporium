import {loadPacks} from "./packs/loadPacks.ts";

window.Hooks.once("init", async () => {
    console.log("TheMagicEmporium | Initializing")

    const packs = loadPacks()
    console.log("TheMagicEmporium | Loaded packs", packs)
})
