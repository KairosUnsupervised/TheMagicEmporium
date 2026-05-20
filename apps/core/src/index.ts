import { Forge } from "@tme/library/src/forge/Forge.ts";
import { registry } from "@tme/library/src/registry/Registry.ts";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { registerFancyModifierIcons } from "./hooks/fancyModifierIcons.ts";
import { registerRarityBorderColors } from "./hooks/rarityBorderColors.ts";
import { registerTooltips } from "./hooks/tooltips.ts";
import { Logger } from "./misc/Logger.ts";
import { packLoader } from "./packLoader/PackLoader.ts";
import { Utility } from "./utility/Utility.ts";
import { registerValidator } from "./validator/registerValidator";

// TODO move type
Hooks.once("init", async () => {
	Logger.log("Initializing");

	const packs = await packLoader.load();
	Logger.log("Loaded packs", packs);

	await registry.registerPacks(packs);
	Logger.log("Registered modifiers", registry);

	/**
	 * Grab the dev utility with
	 * game.modules.get("the-magic-emporium").api.utility
	 */
	// biome-ignore lint/style/noNonNullAssertion: Required for FoundryVTT
	game.modules.get(namespace.core.id)!.api = {
		registry: registry,
		utility: new Utility(),
	};
});

Hooks.once("ready", async () => {
	registerValidator();
	registerFancyModifierIcons();
	registerRarityBorderColors();
	registerTooltips();
});

// @ts-expect-error
window.debug = Forge;
// TODO FORGE API

// TODO MAKE TAGS TO STRINGS
// TODO Let people zoom the ui in / out
// TODO TEMPLATE CONFIG, at least 2 primary
// TODO TEMPLATE FLOAT LUCK
