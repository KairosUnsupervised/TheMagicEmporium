import { describe, expect, it } from "bun:test";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { render } from "@testing-library/react";
import { ItemDisplay } from "./ItemDisplay";

describe("ItemDisplay", () => {
	it("renders the item name through the header", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.name = "Sunforged Ring";

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.textContent).toContain("Sunforged Ring");
	});

	it("renders no modifier sections for an item with empty slots", () => {
		// ARRANGE
		const item = new AbstractItem();

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.textContent).not.toContain("PRIMARY");
		expect(view.container.textContent).not.toContain("SECONDARY");
	});

	it("mounts without throwing when the full frame is shown", () => {
		// ARRANGE
		const item = new AbstractItem();

		// ACT & ASSERT
		expect(() => render(<ItemDisplay item={item} />)).not.toThrow();
	});
});
