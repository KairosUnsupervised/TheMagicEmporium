import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import { registry } from "@tme/library/src/registry/Registry";

import accessoriesPack from "../../../apps/core/public/packs/tme.accessories.json";
import armorPack from "../../../apps/core/public/packs/tme.armor.json";
import consumablePack from "../../../apps/core/public/packs/tme.consumable.json";
import miscPack from "../../../apps/core/public/packs/tme.misc.json";
import scoresPack from "../../../apps/core/public/packs/tme.scores.json";
import skillsPack from "../../../apps/core/public/packs/tme.skills.json";
import weaponsPack from "../../../apps/core/public/packs/tme.weapons.json";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
	"https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap";
document.head.appendChild(link);

void registry.registerPacks([
	accessoriesPack,
	armorPack,
	consumablePack,
	miscPack,
	scoresPack,
	skillsPack,
	weaponsPack,
]);

const preview: Preview = {
	tags: ["autodocs"],
	parameters: {
		backgrounds: {
			options: {
				dark: { name: "Dark", value: "#333" },
				light: { name: "Light", value: "#F7F9F2" },
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			defaultName: "Documentation",
			theme: themes.dark,
		},
	},
	initialGlobals: {
		backgrounds: { value: "dark" },
	},
};

export default preview;
