import { describe, expect, it } from "bun:test";
import { renderHook } from "@testing-library/react";
import { Gacha } from "./library/Gacha";
import { useGachaContext } from "./useGachaContext";

describe("useGachaContext", () => {
	it("returns the shared Gacha singleton", () => {
		// ARRANGE & ACT
		const { result } = renderHook(() => useGachaContext());

		// ASSERT
		expect(result.current).toBeInstanceOf(Gacha);
		expect(typeof result.current.onConfirm).toBe("function");
	});
});
