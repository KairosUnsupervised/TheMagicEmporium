import { describe, expect, it } from "bun:test";
import type { Modifier } from "@tme/library/src/modifiers/Modifier";
import { render } from "@testing-library/react";
import { ModifierDisplay } from "./ModifierDisplay";

describe("ModifierDisplay", () => {
	it("renders nothing for a modifier that matches no known blueprint", () => {
		// ARRANGE & ACT
		const view = render(
			<ModifierDisplay modifier={{} as unknown as Modifier} float={0} />,
		);

		// ASSERT
		expect(view.container.firstChild).toBeNull();
	});
});
