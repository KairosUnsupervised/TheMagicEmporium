import { describe, expect, it } from "bun:test";
import { type DiffSegment, diffWords } from "./diffWords";

const changedText = (segments: DiffSegment[]): string => {
	return segments
		.filter((segment) => segment.changed)
		.map((segment) => segment.text)
		.join("");
};

const joinAll = (segments: DiffSegment[]): string => {
	return segments.map((segment) => segment.text).join("");
};

describe("diffWords", () => {
	it("returns a single unchanged segment for identical strings", () => {
		// ARRANGE
		const previous = "the quick fox";
		const current = "the quick fox";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		expect(result).toEqual([{ text: "the quick fox", changed: false }]);
	});

	it("reconstructs the full `current` string across all segments", () => {
		// ARRANGE
		const previous = "a b c";
		const current = "a x c d";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		expect(joinAll(result)).toBe("a x c d");
	});

	it("marks only the differing words as changed", () => {
		// ARRANGE
		const previous = "the quick brown fox";
		const current = "the slow brown fox";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		expect(changedText(result)).toBe("slow");
	});

	it("treats appended words as changed", () => {
		// ARRANGE
		const previous = "hello";
		const current = "hello world";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		expect(changedText(result)).toContain("world");
	});

	it("marks the entire string as changed when nothing matches", () => {
		// ARRANGE
		const previous = "alpha beta";
		const current = "gamma delta";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		expect(result).toEqual([{ text: "gamma delta", changed: true }]);
	});

	it("does not represent removed tokens", () => {
		// ARRANGE
		const previous = "one two three";
		const current = "one three";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		expect(joinAll(result)).toBe("one three");
		expect(changedText(result)).toBe("");
	});

	it("bridges whitespace between two changed words into one segment", () => {
		// ARRANGE
		// "big" and "red" are both new; the space between them should be merged
		// into a single continuous changed segment rather than three pieces.
		const previous = "a fox";
		const current = "a big red fox";

		// ACT
		const result = diffWords(previous, current);
		const changedSegments = result.filter((segment) => segment.changed);

		// ASSERT
		expect(changedSegments).toHaveLength(1);
		// The inserted run spans "big", "red" and the surrounding spaces, merged
		// into one continuous changed segment.
		expect(changedSegments[0].text).toBe("big red ");
	});

	it("handles an empty previous string", () => {
		// ARRANGE
		const previous = "";
		const current = "brand new text";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		expect(result).toEqual([{ text: "brand new text", changed: true }]);
	});

	it("handles an empty current string", () => {
		// ARRANGE
		const previous = "something";
		const current = "";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		expect(result).toEqual([]);
	});

	it("never emits zero-length segments", () => {
		// ARRANGE
		const previous = "the  quick";
		const current = "the quick fox";

		// ACT
		const result = diffWords(previous, current);

		// ASSERT
		for (const segment of result) {
			expect(segment.text.length).toBeGreaterThan(0);
		}
	});
});
