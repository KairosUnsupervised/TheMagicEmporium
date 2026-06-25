import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { Pip } from "./Pip";

describe("Pip", () => {
	it("renders the diamond glyph", () => {
		// ARRANGE & ACT
		const view = render(<Pip />);

		// ASSERT
		expect(view.container.textContent).toContain("◈");
	});

	it("renders no chevrons by default", () => {
		// ARRANGE & ACT
		const view = render(<Pip />);

		// ASSERT
		expect(view.container.querySelectorAll("svg")).toHaveLength(0);
	});

	it("renders one chevron per breakpoint", () => {
		// ARRANGE & ACT
		const view = render(<Pip breakpoints={3} />);

		// ASSERT
		expect(view.container.querySelectorAll("svg")).toHaveLength(3);
	});

	it("renders no chevrons when breakpoints is zero", () => {
		// ARRANGE & ACT
		const view = render(<Pip breakpoints={0} />);

		// ASSERT
		expect(view.container.querySelectorAll("svg")).toHaveLength(0);
	});
});
