import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { tieredFuryFixture } from "../../../fixtures/modifiers/tiered/tieredFury";
import { TieredModifierDisplay } from "./TieredModifierDisplay";

describe("TieredModifierDisplay", () => {
	it("labels the modifier as TIERED and shows the first tier at the low float", () => {
		// ARRANGE & ACT
		render(<TieredModifierDisplay modifier={tieredFuryFixture} float={0} />);

		// ASSERT
		expect(screen.getByText("TIERED")).toBeInTheDocument();
		expect(screen.getByText("Fury I")).toBeInTheDocument();
	});

	it("renders the tier indicator as position out of total", () => {
		// ARRANGE & ACT
		const view = render(
			<TieredModifierDisplay modifier={tieredFuryFixture} float={0} />,
		);

		// ASSERT
		// First of four tiers -> "I / IV".
		expect(view.container.textContent).toContain("I/IV");
	});

	it("renders one selector control per tier", () => {
		// ARRANGE & ACT
		const view = render(
			<TieredModifierDisplay modifier={tieredFuryFixture} float={0} />,
		);

		// ASSERT
		// The fury fixture defines four tiers.
		expect(view.container.querySelectorAll("button")).toHaveLength(4);
	});

	it("selects the top tier at the high end of the float range", () => {
		// ARRANGE & ACT
		render(<TieredModifierDisplay modifier={tieredFuryFixture} float={0.8} />);

		// ASSERT
		expect(screen.getByText("Fury IV")).toBeInTheDocument();
	});
});
