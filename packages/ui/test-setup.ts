import { afterEach, expect } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

// DOM globals and import-time stubs are registered in happydom.ts, which is
// preloaded ahead of this file (see bunfig.toml). By the time these
// testing-library imports evaluate, `document` already exists.

// Teach bun's `expect` the jest-dom matchers (toBeInTheDocument, ...).
expect.extend(matchers);

// RTL's automatic cleanup only hooks in when the test framework's afterEach is a
// global, which it is not under `bun:test`. Register it explicitly so mounted
// trees are torn down between tests.
afterEach(() => {
	cleanup();
});
