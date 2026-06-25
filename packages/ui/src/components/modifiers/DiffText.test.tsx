import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { DiffText } from "./DiffText";

describe("DiffText", () => {
	it("renders plain text when there is no previous text", () => {
		// ARRANGE & ACT
		const view = render(<DiffText text="hello world" previousText={null} />);

		// ASSERT
		expect(view.container.textContent).toBe("hello world");
		expect(view.container.querySelectorAll("span")).toHaveLength(0);
	});

	it("renders plain text when nothing changed", () => {
		// ARRANGE & ACT
		const view = render(<DiffText text="same text" previousText="same text" />);

		// ASSERT
		expect(view.container.querySelectorAll("span")).toHaveLength(0);
	});

	it("wraps changed words in a span and preserves full text", () => {
		// ARRANGE & ACT
		const view = render(
			<DiffText text="the slow fox" previousText="the quick fox" />,
		);

		// ASSERT
		expect(view.container.textContent).toBe("the slow fox");
		const spans = view.container.querySelectorAll("span");
		expect(spans.length).toBeGreaterThan(0);
		expect(spans[0].textContent).toBe("slow");
	});
});
