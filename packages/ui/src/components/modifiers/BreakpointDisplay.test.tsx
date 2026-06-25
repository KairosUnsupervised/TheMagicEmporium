import { describe, expect, it, mock } from "bun:test";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { fireEvent, render } from "@testing-library/react";
import { BreakpointDisplay } from "./BreakpointDisplay";

describe("BreakpointDisplay", () => {
	it("renders one button per breakpoint", () => {
		// ARRANGE & ACT
		const view = render(
			<BreakpointDisplay
				type={ModifierType.Unique}
				length={4}
				defaultActiveIndex={0}
				temporaryActiveIndex={null}
			/>,
		);

		// ASSERT
		expect(view.container.querySelectorAll("button")).toHaveLength(4);
	});

	it("calls onSelect with the clicked index", () => {
		// ARRANGE
		const onSelect = mock(() => undefined);
		const view = render(
			<BreakpointDisplay
				type={ModifierType.Tiered}
				length={3}
				defaultActiveIndex={0}
				temporaryActiveIndex={null}
				onSelect={onSelect}
			/>,
		);

		// ACT
		const buttons = view.container.querySelectorAll("button");
		fireEvent.click(buttons[2]);

		// ASSERT
		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect).toHaveBeenCalledWith(2);
	});

	it("does not throw when clicked without an onSelect handler", () => {
		// ARRANGE
		const view = render(
			<BreakpointDisplay
				type={ModifierType.Linear}
				length={2}
				defaultActiveIndex={1}
				temporaryActiveIndex={null}
			/>,
		);
		const button = view.container.querySelector("button");

		// ACT & ASSERT
		expect(() => button && fireEvent.click(button)).not.toThrow();
	});
});
