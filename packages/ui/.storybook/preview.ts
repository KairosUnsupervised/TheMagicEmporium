import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
	"https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap";
document.head.appendChild(link);

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
