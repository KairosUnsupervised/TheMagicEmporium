import {packLoader} from "./packLoader/PackLoader.ts";
import {Logger} from "./misc/Logger.ts";
import {namespace} from "@tme/shared/src/namespaceConfig";
import {registerValidator} from "./validator/registerValidator";
import {registry} from "@tme/library/src/registry/Registry.ts";
import {Forge} from "@tme/library/src/forge/Forge.ts";
import {registerFancyModifierIcons} from "./hooks/fancyModifierIcons.ts";
import {registerRarityBorderColors} from "./hooks/rarityBorderColors.ts";
import {registerTooltips} from "./hooks/tooltips.ts";

// TODO move type
window.Hooks.once("init", async () => {
    Logger.log("Initializing")

    const packs = await packLoader.load()
    Logger.log("Loaded packs", packs)

    await registry.registerPacks(packs)
    Logger.log("Registered modifiers", registry)

    // biome-ignore lint/style/noNonNullAssertion: Required for FoundryVTT
    game.modules.get(namespace.core.id)!.api = {Registry: registry};
})

window.Hooks.once("ready", async () => {
    registerValidator()
    registerFancyModifierIcons()
    registerRarityBorderColors()
    registerTooltips()
})

// @ts-ignore
window.debug = Forge
