import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { Diamond, DiamondType } from "./Diamond";

describe("Diamond", () => {
	it("sizes a bright diamond at 9px and tags it as bright", () => {
		// ARRANGE & ACT
		const view = render(<Diamond type={DiamondType.Bright} />);

		// ASSERT
		const root = view.container.firstElementChild as HTMLElement;
		expect(root.style.width).toBe("9px");
		expect(root.className).toContain("bright");
	});

	it("sizes a dim diamond at 7px and tags it as dim", () => {
		// ARRANGE & ACT
		const view = render(<Diamond type={DiamondType.Dim} />);

		// ASSERT
		const root = view.container.firstElementChild as HTMLElement;
		expect(root.style.width).toBe("7px");
		expect(root.className).toContain("dim");
	});
});
