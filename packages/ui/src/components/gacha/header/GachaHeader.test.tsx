import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { GachaHeader } from "./GachaHeader";

describe("GachaHeader", () => {
	it("renders the emporium title and a close button", () => {
		// ARRANGE & ACT
		render(<GachaHeader />);

		// ASSERT
		expect(screen.getByText("THE MAGIC EMPORIUM")).toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});
});
