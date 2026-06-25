import { describe, expect, it } from "bun:test";
import type { AppliedModifier } from "@tme/library/src/modifiers/Modifier";
import { render, screen } from "@testing-library/react";
import { Section } from "./Section";

describe("Section", () => {
	it("renders nothing when there are no modifiers", () => {
		// ARRANGE & ACT
		const view = render(<Section title="PRIMARY" modifiers={[]} />);

		// ASSERT
		expect(view.container.firstChild).toBeNull();
	});

	it("renders the section title when modifiers are present", () => {
		// ARRANGE
		// An object that is not an instance of any blueprint makes ModifierDisplay
		// render null, isolating Section's own structural rendering.
		const modifiers = [
			{ modifier: {}, float: 0 },
		] as unknown as AppliedModifier[];

		// ACT
		render(<Section title="SECONDARY" modifiers={modifiers} />);

		// ASSERT
		expect(screen.getByText("SECONDARY")).toBeInTheDocument();
	});
});
