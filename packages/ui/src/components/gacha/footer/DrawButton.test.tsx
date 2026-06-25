import { describe, expect, it, mock } from "bun:test";
import { fireEvent, render } from "@testing-library/react";
import { gacha } from "../../../context/gacha/library/Gacha";
import { DrawButton } from "./DrawButton";

describe("DrawButton", () => {
	it("renders the ritual kanji", () => {
		// ARRANGE & ACT
		const view = render(<DrawButton />);

		// ASSERT
		expect(view.container.textContent).toContain("神聖なる祈願");
	});

	it("does not invoke onClick while disabled (no envelope selected)", () => {
		// ARRANGE
		const onClick = mock(() => undefined);
		// The shared gacha singleton has no envelope selected by default, so the
		// button is disabled and the click handler is detached.
		gacha.inventory.setEnvelope(null);
		const view = render(<DrawButton onClick={onClick} />);

		// ACT
		const button = view.container.querySelector(`[class*="button"]`);
		if (button) {
			fireEvent.click(button);
		}

		// ASSERT
		expect(onClick).not.toHaveBeenCalled();
	});
});
