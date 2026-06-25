import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { linearStealthFixture } from "../../../fixtures/modifiers/linear/linearStealth";
import { LinearModifierDisplay } from "./LinearModifierDisplay";

describe("LinearModifierDisplay", () => {
	it("labels the modifier as LINEAR", () => {
		// ARRANGE & ACT
		render(<LinearModifierDisplay modifier={linearStealthFixture} float={0} />);

		// ASSERT
		expect(screen.getByText("LINEAR")).toBeInTheDocument();
	});

	it("shows the active breakpoint value with a plus sign", () => {
		// ARRANGE & ACT
		const view = render(
			<LinearModifierDisplay modifier={linearStealthFixture} float={0} />,
		);

		// ASSERT
		// The stealth fixture's only breakpoint has value 2.
		expect(view.container.textContent).toContain("+2");
	});

	it("renders the flavor description", () => {
		// ARRANGE & ACT
		const view = render(
			<LinearModifierDisplay modifier={linearStealthFixture} float={0} />,
		);

		// ASSERT
		expect(view.container.textContent).toContain(
			"Your Stealth skill increases",
		);
	});
});
