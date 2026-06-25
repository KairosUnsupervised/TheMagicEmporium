import { describe, expect, it } from "bun:test";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { AbstractItemContextProvider } from "./AbstractItemContextProvider";
import { useAbstractItemContext } from "./useAbstractItemContext";

describe("useAbstractItemContext", () => {
	it("falls back to a default AbstractItem with no provider", () => {
		// ARRANGE & ACT
		const { result } = renderHook(() => useAbstractItemContext());

		// ASSERT
		expect(result.current.abstractItem).toBeInstanceOf(AbstractItem);
	});

	it("returns the item supplied by the provider", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.name = "Test Blade";
		const wrapper = (props: { children: ReactNode }) => (
			<AbstractItemContextProvider abstractItem={item}>
				{props.children}
			</AbstractItemContextProvider>
		);

		// ACT
		const { result } = renderHook(() => useAbstractItemContext(), { wrapper });

		// ASSERT
		expect(result.current.abstractItem.name).toBe("Test Blade");
	});
});
