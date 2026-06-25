import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { independentEdibleFixture } from "../../fixtures/modifiers/independent/independentEdible";
import { linearStealthFixture } from "../../fixtures/modifiers/linear/linearStealth";
import { tieredFuryFixture } from "../../fixtures/modifiers/tiered/tieredFury";
import { uniqueBloodthirstyFixture } from "../../fixtures/modifiers/unique/uniqueBloodthirsty";
import { ModifierDisplay } from "./ModifierDisplay";

describe("ModifierDisplay routing", () => {
	it("renders the unique variant for a UniqueModifier", () => {
		// ARRANGE & ACT
		render(<ModifierDisplay modifier={uniqueBloodthirstyFixture} float={0} />);

		// ASSERT
		expect(screen.getByText("UNIQUE")).toBeInTheDocument();
	});

	it("renders the independent variant for an IndependentModifier", () => {
		// ARRANGE & ACT
		render(<ModifierDisplay modifier={independentEdibleFixture} float={0} />);

		// ASSERT
		expect(screen.getByText("INDEPENDENT")).toBeInTheDocument();
	});

	it("renders the linear variant for a LinearModifier", () => {
		// ARRANGE & ACT
		render(<ModifierDisplay modifier={linearStealthFixture} float={0} />);

		// ASSERT
		expect(screen.getByText("LINEAR")).toBeInTheDocument();
	});

	it("renders the tiered variant for a TieredModifier", () => {
		// ARRANGE & ACT
		render(<ModifierDisplay modifier={tieredFuryFixture} float={0} />);

		// ASSERT
		expect(screen.getByText("TIERED")).toBeInTheDocument();
	});
});
