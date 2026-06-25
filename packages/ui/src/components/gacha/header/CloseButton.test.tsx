import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { gacha } from "../../../context/gacha/library/Gacha";
import { CloseButton } from "./CloseButton";

describe("CloseButton", () => {
	it("closes the gacha when clicked", () => {
		// ARRANGE
		gacha.isOpen = true;
		render(<CloseButton />);

		// ACT
		fireEvent.click(screen.getByRole("button"));

		// ASSERT
		expect(gacha.isOpen).toBe(false);
	});

	it("is disabled when the disabled prop is set", () => {
		// ARRANGE & ACT
		render(<CloseButton disabled />);
		const button = screen.getByRole("button") as HTMLButtonElement;

		// ASSERT
		expect(button.disabled).toBe(true);
	});
});
