import { describe, expect, it } from "bun:test";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { fireEvent, render, screen } from "@testing-library/react";
import { BreakpointSwap } from "./BreakpointSwap";

describe("BreakpointSwap", () => {
	it("renders the single item directly without breakpoint controls", () => {
		// ARRANGE & ACT
		const view = render(
			<BreakpointSwap
				type={ModifierType.Unique}
				defaultActiveIndex={0}
				items={[() => <span>only</span>]}
			/>,
		);

		// ASSERT
		expect(screen.getByText("only")).toBeInTheDocument();
		// No breakpoint selector buttons for a single item.
		expect(view.container.querySelectorAll("button")).toHaveLength(0);
	});

	it("shows the default active item and a control per breakpoint", () => {
		// ARRANGE & ACT
		const view = render(
			<BreakpointSwap
				type={ModifierType.Tiered}
				defaultActiveIndex={1}
				items={[() => <span>first</span>, () => <span>second</span>]}
			/>,
		);

		// ASSERT
		expect(screen.getByText("second")).toBeInTheDocument();
		expect(view.container.querySelectorAll("button")).toHaveLength(2);
	});

	it("swaps to another breakpoint when its control is clicked", () => {
		// ARRANGE
		const view = render(
			<BreakpointSwap
				type={ModifierType.Tiered}
				defaultActiveIndex={0}
				items={[() => <span>first</span>, () => <span>second</span>]}
			/>,
		);

		// ACT
		const buttons = view.container.querySelectorAll("button");
		fireEvent.click(buttons[1]);

		// ASSERT
		expect(screen.getByText("second")).toBeInTheDocument();
	});
});
