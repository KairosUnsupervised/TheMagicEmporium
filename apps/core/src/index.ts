import { Forge } from "@tme/library/src/forge/Forge.ts";
import { registry } from "@tme/library/src/registry/Registry.ts";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { registerFancyModifierIcons } from "./hooks/registerFancyModifierIcons.ts";
import { registerGacha } from "./hooks/registerGacha.ts";
import { registerRarityBorderColors } from "./hooks/registerRarityBorderColors.ts";
import { registerTooltip } from "./hooks/registerTooltip.ts";
import { registerValidator } from "./hooks/registerValidator.ts";
import { logger } from "./logger.ts";
import { packLoader } from "./packLoader/PackLoader.ts";
import { Utility } from "./utility/Utility.ts";

Hooks.once("init", async () => {
	logger.log("Initializing");

	const packs = await packLoader.load();
	logger.log("Loaded packs", packs);

	await registry.registerPacks(packs);
	logger.log("Registered modifiers", registry);

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
	registerTooltip();
	registerGacha();
});

// @ts-expect-error
window.debug = Forge;
