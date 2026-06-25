import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { uniqueVenomousFixture } from "../../../fixtures/modifiers/unique/uniqueVenomous";
import { UniqueModifierDisplay } from "./UniqueModifierDisplay";

describe("UniqueModifierDisplay", () => {
	it("labels the modifier as UNIQUE and shows the active breakpoint flavor", () => {
		// ARRANGE & ACT
		render(
			<UniqueModifierDisplay modifier={uniqueVenomousFixture} float={0} />,
		);

		// ASSERT
		expect(screen.getByText("UNIQUE")).toBeInTheDocument();
		expect(screen.getByText("Venomous I")).toBeInTheDocument();
	});

	it("renders the flavor for the breakpoint matching the float", () => {
		// ARRANGE & ACT
		render(
			<UniqueModifierDisplay modifier={uniqueVenomousFixture} float={0.9} />,
		);

		// ASSERT
		expect(screen.getByText("Venomous VI")).toBeInTheDocument();
	});

	it("renders a breakpoint control per breakpoint", () => {
		// ARRANGE & ACT
		const view = render(
			<UniqueModifierDisplay modifier={uniqueVenomousFixture} float={0} />,
		);

		// ASSERT
		// The venomous fixture defines six breakpoints.
		expect(view.container.querySelectorAll("button")).toHaveLength(6);
	});
});
