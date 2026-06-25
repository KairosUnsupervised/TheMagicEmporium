import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
	it("renders the name and description", () => {
		// ARRANGE & ACT
		render(
			<Tooltip
				name="Ring of Power"
				description="A potent artifact."
				x={0}
				y={0}
			/>,
		);

		// ASSERT
		expect(screen.getByText("Ring of Power")).toBeInTheDocument();
		expect(screen.getByText("A potent artifact.")).toBeInTheDocument();
	});
});
