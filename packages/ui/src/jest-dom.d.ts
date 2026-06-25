import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// test-setup.ts registers the jest-dom matchers at runtime via
// `expect.extend(matchers)`, but bun:test's `expect` types don't know about
// them. Augment its `Matchers` interface so `toBeInTheDocument`, `toHaveText`,
// etc. typecheck in test files.
declare module "bun:test" {
	interface Matchers<T> extends TestingLibraryMatchers<unknown, T> {}
	interface AsymmetricMatchers extends TestingLibraryMatchers<unknown, void> {}
}
