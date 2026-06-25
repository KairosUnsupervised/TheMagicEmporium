import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { GachaIntroHeader } from "./GachaIntroHeader";

describe("GachaIntroHeader", () => {
	it("renders the title and subtitle", () => {
		// ARRANGE & ACT
		render(<GachaIntroHeader />);

		// ASSERT
		expect(screen.getByText("THE MAGIC EMPORIUM")).toBeInTheDocument();
		expect(screen.getByText("The Sacred Draw")).toBeInTheDocument();
	});
});
