import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { commonFixture } from "../../fixtures/items/commonFixture";
import { legendaryNoBackgroundFixture } from "../../fixtures/items/legendaryNoBackgroundFixture";
import { FoundryIcon } from "./FoundryIcon";

describe("FoundryIcon", () => {
	it("borders a common item with the common rarity color", () => {
		// ARRANGE & ACT
		render(<FoundryIcon item={commonFixture} />);

		// ASSERT
		const icon = screen.getByAltText(commonFixture.name);
		expect(icon.getAttribute("style")).toContain("#9d9d9d");
	});

	it("borders a legendary item with the legendary rarity color", () => {
		// ARRANGE & ACT
		render(<FoundryIcon item={legendaryNoBackgroundFixture} />);

		// ASSERT
		const icon = screen.getByAltText(legendaryNoBackgroundFixture.name);
		expect(icon.getAttribute("style")).toContain("#ee7e3e");
	});

	it("renders at a 32x32 default size", () => {
		// ARRANGE & ACT
		render(<FoundryIcon item={commonFixture} />);

		// ASSERT
		const icon = screen.getByAltText(commonFixture.name);
		expect(icon.getAttribute("style")).toContain("width: 32px");
		expect(icon.getAttribute("style")).toContain("height: 32px");
	});
});
