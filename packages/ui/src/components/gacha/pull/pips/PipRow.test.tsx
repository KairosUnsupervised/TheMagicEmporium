import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { PipRow } from "./PipRow";

describe("PipRow", () => {
	it("renders nothing when every group is empty", () => {
		// ARRANGE & ACT
		const view = render(<PipRow groups={[[], []]} />);

		// ASSERT
		expect(view.container.firstChild).toBeNull();
	});

	it("renders one pip per breakpoint entry across groups", () => {
		// ARRANGE & ACT
		const view = render(<PipRow groups={[[0, 1], [2]]} />);

		// ASSERT
		// Each pip renders the diamond glyph "◈".
		const text = view.container.textContent ?? "";
		const pipCount = text.split("◈").length - 1;
		expect(pipCount).toBe(3);
	});

	it("drops empty groups but keeps populated ones", () => {
		// ARRANGE & ACT
		const view = render(<PipRow groups={[[], [0], []]} />);

		// ASSERT
		const text = view.container.textContent ?? "";
		expect(text.split("◈").length - 1).toBe(1);
	});
});
