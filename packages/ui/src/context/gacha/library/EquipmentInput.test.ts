import { describe, expect, it } from "bun:test";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import {
	ArrayOperation,
	Field,
	LockOperation,
} from "@tme/shared/src/types/GachaItem5e";
import { EquipmentInput } from "./EquipmentInput";

const field = Field.EquipmentWhitelist;
const allCount = Object.values(Equipment).length;

describe("EquipmentInput", () => {
	it("starts whitelisting every equipment type", () => {
		// ARRANGE
		const input = new EquipmentInput();

		// ACT
		const value = input.getValue();

		// ASSERT
		expect(value).toHaveLength(allCount);
	});

	it("removes specific entries", () => {
		// ARRANGE
		const input = new EquipmentInput();

		// ACT
		input.doOperation({
			field,
			op: ArrayOperation.Remove,
			value: [Equipment.Shield, Equipment.Dagger],
		});
		const value = input.getValue();

		// ASSERT
		expect(value).toHaveLength(allCount - 2);
		expect(value).not.toContain(Equipment.Shield);
		expect(value).not.toContain(Equipment.Dagger);
	});

	it("replaces the whole set with Set", () => {
		// ARRANGE
		const input = new EquipmentInput();

		// ACT
		input.doOperation({
			field,
			op: ArrayOperation.Set,
			value: [Equipment.PlateArmor],
		});

		// ASSERT
		expect(input.getValue()).toEqual([Equipment.PlateArmor]);
	});

	it("adds entries without duplicating existing ones", () => {
		// ARRANGE
		const input = new EquipmentInput();
		input.doOperation({ field, op: ArrayOperation.Set, value: [] });

		// ACT
		input.doOperation({
			field,
			op: ArrayOperation.Add,
			value: [Equipment.Ring, Equipment.Ring],
		});

		// ASSERT
		expect(input.getValue()).toEqual([Equipment.Ring]);
	});

	it("ignores mutations while locked", () => {
		// ARRANGE
		const input = new EquipmentInput();

		// ACT
		input.doOperation({ field, op: LockOperation.Lock });
		input.doOperation({ field, op: ArrayOperation.Set, value: [] });

		// ASSERT
		expect(input.getValue()).toHaveLength(allCount);
	});

	it("accepts mutations again after unlock", () => {
		// ARRANGE
		const input = new EquipmentInput();

		// ACT
		input.doOperation({ field, op: LockOperation.Lock });
		input.doOperation({ field, op: LockOperation.Unlock });
		input.doOperation({ field, op: ArrayOperation.Set, value: [] });

		// ASSERT
		expect(input.getValue()).toHaveLength(0);
	});
});
