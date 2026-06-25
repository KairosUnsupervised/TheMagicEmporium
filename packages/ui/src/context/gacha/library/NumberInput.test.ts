import { describe, expect, it } from "bun:test";
import {
	Field,
	LockOperation,
	NumberOperation,
} from "@tme/shared/src/types/GachaItem5e";
import { NumberInput } from "./NumberInput";

const field = Field.RarityLuck;

describe("NumberInput", () => {
	it("starts at zero with no default", () => {
		// ARRANGE
		const input = new NumberInput({});

		// ACT
		const value = input.getValue();

		// ASSERT
		expect(value).toBe(0);
	});

	it("uses the provided default", () => {
		// ARRANGE
		const input = new NumberInput({ default: 7 });

		// ACT
		const value = input.getValue();

		// ASSERT
		expect(value).toBe(7);
	});

	it("sets, adds, subtracts, multiplies and divides", () => {
		// ARRANGE
		const input = new NumberInput({ default: 10 });

		// ACT & ASSERT (each operation builds on the previous value)
		input.doOperation({ field, op: NumberOperation.Add, value: 5 });
		expect(input.getValue()).toBe(15);
		input.doOperation({ field, op: NumberOperation.Subtract, value: 3 });
		expect(input.getValue()).toBe(12);
		input.doOperation({ field, op: NumberOperation.Multiply, value: 2 });
		expect(input.getValue()).toBe(24);
		input.doOperation({ field, op: NumberOperation.Divide, value: 4 });
		expect(input.getValue()).toBe(6);
		input.doOperation({ field, op: NumberOperation.Set, value: 0 });
		expect(input.getValue()).toBe(0);
	});

	it("ignores division by zero", () => {
		// ARRANGE
		const input = new NumberInput({ default: 42 });

		// ACT
		input.doOperation({ field, op: NumberOperation.Divide, value: 0 });

		// ASSERT
		expect(input.getValue()).toBe(42);
	});

	it("ignores operations while locked", () => {
		// ARRANGE
		const input = new NumberInput({ default: 5 });

		// ACT
		input.doOperation({ field, op: LockOperation.Lock });
		input.doOperation({ field, op: NumberOperation.Set, value: 99 });

		// ASSERT
		expect(input.getValue()).toBe(5);
	});

	it("resumes accepting operations after unlock", () => {
		// ARRANGE
		const input = new NumberInput({ default: 5 });

		// ACT
		input.doOperation({ field, op: LockOperation.Lock });
		input.doOperation({ field, op: NumberOperation.Add, value: 10 });
		input.doOperation({ field, op: LockOperation.Unlock });
		input.doOperation({ field, op: NumberOperation.Add, value: 10 });

		// ASSERT
		expect(input.getValue()).toBe(15);
	});
});
