import { describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { SealButton } from "./SealButton";

describe("SealButton", () => {
	it("renders the title and kanji", () => {
		// ARRANGE & ACT
		render(
			<SealButton
				disabled={false}
				title="Seal"
				kanji="封"
				onClick={() => undefined}
			/>,
		);

		// ASSERT
		expect(screen.getByText("Seal")).toBeInTheDocument();
		expect(screen.getByText("封")).toBeInTheDocument();
	});

	it("fires onClick when enabled", () => {
		// ARRANGE
		const onClick = mock(() => undefined);
		render(
			<SealButton disabled={false} title="Seal" kanji="封" onClick={onClick} />,
		);

		// ACT
		fireEvent.click(screen.getByRole("button"));

		// ASSERT
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("is disabled when the disabled prop is set", () => {
		// ARRANGE
		const onClick = mock(() => undefined);
		render(
			<SealButton disabled={true} title="Seal" kanji="封" onClick={onClick} />,
		);
		const button = screen.getByRole("button") as HTMLButtonElement;

		// ACT
		fireEvent.click(button);

		// ASSERT
		expect(button.disabled).toBe(true);
		expect(onClick).not.toHaveBeenCalled();
	});
});
