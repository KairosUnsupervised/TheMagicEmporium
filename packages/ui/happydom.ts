import { plugin } from "bun";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

// This file is preloaded BEFORE test-setup.ts so that the DOM globals exist
// before `@testing-library/dom`'s `screen` captures `document.body` at import
// time. Keeping the registration in its own module (with no testing-library
// imports) guarantees the ordering, since ES imports are hoisted within a
// single module but each preload file is evaluated in sequence.

// Components import CSS modules (`import styles from "./X.module.css"`). bun has
// no CSS-module handling for tests, so stub every `.css` import with a proxy
// that echoes the requested class name (styles.pip -> "pip"). This keeps
// `className` assertions meaningful without bundling real CSS.
plugin({
	name: "css-module-stub",
	setup(build) {
		build.onLoad({ filter: /\.css$/ }, () => {
			return {
				contents:
					"export default new Proxy({}, { get: (_target, key) => (typeof key === 'string' ? key : '') });",
				loader: "js",
			};
		});
	},
});

// Provide a DOM (window/document/etc.) for React Testing Library. happy-dom is
// lighter than jsdom and registers the globals onto globalThis.
GlobalRegistrator.register();

// happy-dom does not implement ResizeObserver, which some components observe in
// effects. Provide an inert stub so those effects mount without throwing.
const resizeObserverHost = globalThis as unknown as {
	ResizeObserver?: unknown;
};
if (resizeObserverHost.ResizeObserver === undefined) {
	resizeObserverHost.ResizeObserver = class {
		public observe(): void {}
		public unobserve(): void {}
		public disconnect(): void {}
	};
}

// The shared Logger and Inventory hooks reach for Foundry VTT globals at import
// time, which do not exist outside Foundry. Provide inert stubs so module-load
// side effects (e.g. Hooks.once("ready", ...)) don't throw during tests.
const foundryGlobals = globalThis as unknown as {
	Hooks?: unknown;
	game?: unknown;
	ui?: unknown;
};
if (foundryGlobals.Hooks === undefined) {
	foundryGlobals.Hooks = {
		on: () => 0,
		off: () => undefined,
		once: () => 0,
		call: () => true,
		callAll: () => true,
	};
}
if (foundryGlobals.game === undefined) {
	foundryGlobals.game = { user: null };
}
if (foundryGlobals.ui === undefined) {
	foundryGlobals.ui = {
		notifications: {
			warn: () => undefined,
			error: () => undefined,
			info: () => undefined,
		},
	};
}
