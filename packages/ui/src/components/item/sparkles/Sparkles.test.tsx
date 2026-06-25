import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { Sparkles } from "./Sparkles";

describe("Sparkles", () => {
	it("renders one sparkle svg per requested amount", () => {
		// ARRANGE & ACT
		const view = render(<Sparkles amount={5} />);

		// ASSERT
		expect(view.container.querySelectorAll("svg")).toHaveLength(5);
	});

	it("renders nothing visible when amount is zero", () => {
		// ARRANGE & ACT
		const view = render(<Sparkles amount={0} />);

		// ASSERT
		expect(view.container.querySelectorAll("svg")).toHaveLength(0);
	});
});
