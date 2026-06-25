import { describe, expect, it } from "bun:test";
import { Field, NumberOperation } from "@tme/shared/src/types/GachaItem5e";
import { Gacha } from "./Gacha";

const setLuck = (gacha: Gacha, rarity: number, float: number): void => {
	gacha.pullProcess.applyOperation({
		field: Field.RarityLuck,
		op: NumberOperation.Set,
		value: rarity,
	});
	gacha.pullProcess.applyOperation({
		field: Field.FloatLuck,
		op: NumberOperation.Set,
		value: float,
	});
};

describe("Gacha", () => {
	it("reports zero luck by default", () => {
		// ARRANGE
		const gacha = new Gacha();

		// ACT
		const luck = gacha.getLuck();

		// ASSERT
		expect(luck).toBe(0);
	});

	it("scales combined luck by 0.25", () => {
		// ARRANGE
		const gacha = new Gacha();
		setLuck(gacha, 1, 1);

		// ACT
		const luck = gacha.getLuck();

		// ASSERT
		expect(luck).toBeCloseTo(0.5);
	});

	it("clamps luck to the range [-1, 1]", () => {
		// ARRANGE
		const gacha = new Gacha();

		// ACT & ASSERT
		setLuck(gacha, 100, 100);
		expect(gacha.getLuck()).toBe(1);
		setLuck(gacha, -100, -100);
		expect(gacha.getLuck()).toBe(-1);
	});

	it("returns full visibility (4) when no envelope is selected", () => {
		// ARRANGE
		const gacha = new Gacha();

		// ACT
		const visibility = gacha.getVisibility();

		// ASSERT
		expect(visibility).toBe(4);
	});

	it("returns a clamped visibility level once an envelope is selected", () => {
		// ARRANGE
		const gacha = new Gacha();
		gacha.inventory.setEnvelope(gacha.inventory.getActorEnvelopes()[0]);

		// ACT
		const visibility = gacha.getVisibility();

		// ASSERT
		expect(visibility).toBeGreaterThanOrEqual(0);
		expect(visibility).toBeLessThanOrEqual(4);
	});

	it("toggles isOpen via setOpen and setClosed", () => {
		// ARRANGE
		const gacha = new Gacha();

		// ACT & ASSERT
		gacha.setClosed();
		expect(gacha.isOpen).toBe(false);
		gacha.setOpen();
		expect(gacha.isOpen).toBe(true);
	});

	it("rebuilds the pull process from selected inventory operations", () => {
		// ARRANGE
		const gacha = new Gacha();
		const before = gacha.pullProcess;

		// ACT
		gacha.onInputUpdate();

		// ASSERT
		// onInputUpdate always produces a fresh PullProcess instance.
		expect(gacha.pullProcess).not.toBe(before);
	});
});
