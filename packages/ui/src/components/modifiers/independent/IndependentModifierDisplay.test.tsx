import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { independentEdibleFixture } from "../../../fixtures/modifiers/independent/independentEdible";
import { independentShadowwalkerFixture } from "../../../fixtures/modifiers/independent/independentShadowwalker";
import { IndependentModifierDisplay } from "./IndependentModifierDisplay";

describe("IndependentModifierDisplay", () => {
	it("labels the modifier as INDEPENDENT and renders its flavor", () => {
		// ARRANGE & ACT
		render(
			<IndependentModifierDisplay
				modifier={independentEdibleFixture}
				float={0}
			/>,
		);

		// ASSERT
		expect(screen.getByText("INDEPENDENT")).toBeInTheDocument();
		expect(screen.getByText("Edible")).toBeInTheDocument();
		expect(
			screen.getByText("Despite its properties, this item is edible."),
		).toBeInTheDocument();
	});

	it("renders no breakpoint controls for a single-breakpoint modifier", () => {
		// ARRANGE & ACT
		const view = render(
			<IndependentModifierDisplay
				modifier={independentEdibleFixture}
				float={0}
			/>,
		);

		// ASSERT
		expect(view.container.querySelectorAll("button")).toHaveLength(0);
	});

	it("shows the flavor of the breakpoint matching the float", () => {
		// ARRANGE & ACT
		const view = render(
			<IndependentModifierDisplay
				modifier={independentShadowwalkerFixture}
				float={0}
			/>,
		);

		// ASSERT
		expect(screen.getByText("Shadowwalker Minor")).toBeInTheDocument();
		// Three breakpoints (min 0 / 0.5 / 0.8) yield three selector controls.
		expect(view.container.querySelectorAll("button")).toHaveLength(3);
	});

	it("selects the top breakpoint at the high end of the float range", () => {
		// ARRANGE & ACT
		render(
			<IndependentModifierDisplay
				modifier={independentShadowwalkerFixture}
				float={0.8}
			/>,
		);

		// ASSERT
		expect(screen.getByText("Shadowwalker Evolved")).toBeInTheDocument();
	});
});
