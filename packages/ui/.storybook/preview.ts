import type {Preview} from '@storybook/preact-vite'
import { themes } from "storybook/theming";

const preview: Preview = {
    tags: ["autodocs"],
    parameters: {
        backgrounds: {
            options: {
                dark: {name: 'Dark', value: '#333'},
                light: {name: 'Light', value: '#F7F9F2'},
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
        backgrounds: {value: 'dark'},
    },

};

export default preview;
