import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { OrbitalPosition } from "./OrbitalPosition";

const renderSvg = (x: number, y: number, id: string) => {
	// OrbitalPosition returns an SVG <g>; wrap it so the children mount in an
	// SVG context.
	return render(
		<svg>
			<OrbitalPosition x={x} y={y} id={id} index={0} />
		</svg>,
	);
};

describe("OrbitalPosition", () => {
	it("derives the orbit radius from the cartesian coordinates", () => {
		// ARRANGE & ACT
		const view = renderSvg(3, 4, "orbit-a");

		// ASSERT
		const circle = view.container.querySelector("circle");
		// r = sqrt(3^2 + 4^2) = 5
		expect(circle?.getAttribute("r")).toBe("5");
	});

	it("uses the provided id for its gradient", () => {
		// ARRANGE & ACT
		const view = renderSvg(10, 0, "orbit-b");

		// ASSERT
		expect(view.container.querySelector("linearGradient")?.id).toBe("orbit-b");
	});
});
