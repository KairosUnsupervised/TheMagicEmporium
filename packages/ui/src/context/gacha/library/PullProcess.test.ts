import { describe, expect, it } from "bun:test";
import {
	ArrayOperation,
	Field,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";
import { PullProcess } from "./PullProcess";

describe("PullProcess", () => {
	it("defaults visibility level to 1 and other numbers to 0", () => {
		// ARRANGE
		const process = new PullProcess();

		// ACT & ASSERT
		expect(process.visibilityLevel.getValue()).toBe(1);
		expect(process.rarityLuck.getValue()).toBe(0);
		expect(process.revealAmount.getValue()).toBe(0);
	});

	it("routes each operation to the matching field input", () => {
		// ARRANGE
		const process = new PullProcess();

		// ACT
		process.applyOperation({
			field: Field.RarityLuck,
			op: NumberOperation.Set,
			value: 3,
		});
		process.applyOperation({
			field: Field.RevealAmount,
			op: NumberOperation.Set,
			value: 5,
		});
		process.applyOperation({
			field: Field.PickAmount,
			op: NumberOperation.Set,
			value: 2,
		});

		// ASSERT
		expect(process.rarityLuck.getValue()).toBe(3);
		expect(process.revealAmount.getValue()).toBe(5);
		expect(process.pickAmount.getValue()).toBe(2);
		// Untouched fields keep their values.
		expect(process.floatLuck.getValue()).toBe(0);
	});

	it("routes array operations to the equipment whitelist", () => {
		// ARRANGE
		const process = new PullProcess();

		// ACT
		process.applyOperation({
			field: Field.EquipmentWhitelist,
			op: ArrayOperation.Set,
			value: [],
		});

		// ASSERT
		expect(process.equipmentWhitelist.getValue()).toHaveLength(0);
	});

	it("is not possible with default (zero) reveal and pick amounts", () => {
		// ARRANGE
		const process = new PullProcess();

		// ACT
		const possible = process.isPossible();

		// ASSERT
		expect(possible).toBe(false);
	});

	it("is possible once reveal and pick amounts are positive", () => {
		// ARRANGE
		const process = new PullProcess();
		process.applyOperation({
			field: Field.RevealAmount,
			op: NumberOperation.Set,
			value: 3,
		});
		process.applyOperation({
			field: Field.PickAmount,
			op: NumberOperation.Set,
			value: 1,
		});

		// ACT
		const possible = process.isPossible();

		// ASSERT
		expect(possible).toBe(true);
	});

	it("is not possible when the equipment whitelist is empty", () => {
		// ARRANGE
		const process = new PullProcess();
		process.applyOperation({
			field: Field.RevealAmount,
			op: NumberOperation.Set,
			value: 3,
		});
		process.applyOperation({
			field: Field.PickAmount,
			op: NumberOperation.Set,
			value: 1,
		});
		process.applyOperation({
			field: Field.EquipmentWhitelist,
			op: ArrayOperation.Set,
			value: [],
		});

		// ACT
		const possible = process.isPossible();

		// ASSERT
		expect(possible).toBe(false);
	});
});
