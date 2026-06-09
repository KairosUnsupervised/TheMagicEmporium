import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import type {
	AllArrayOperations,
	AllOperations,
} from "@tme/shared/src/types/GachaItem5e";
import {
	ArrayOperation,
	LockOperation,
} from "@tme/shared/src/types/GachaItem5e";
import { makeAutoObservable } from "mobx";

export class EquipmentInput {
	private whitelist: Set<Equipment> = new Set(Object.values(Equipment));
	private locked: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	public doOperation(operation: AllOperations): void {
		if (operation.op !== LockOperation.Unlock && this.locked) {
			return;
		}

		switch (operation.op) {
			case LockOperation.Lock:
				this.locked = true;
				break;

			case LockOperation.Unlock:
				this.locked = false;
				break;

			case ArrayOperation.Add:
				for (const value of operation.value) {
					this.whitelist.add(value as Equipment);
				}
				break;

			case ArrayOperation.Remove:
				for (const value of operation.value) {
					this.whitelist.delete(value as Equipment);
				}
				break;

			case ArrayOperation.Set:
				this.whitelist = new Set(operation.value as Equipment[]);
				break;
		}
	}

	public getValue = (): Equipment[] => {
		return [...this.whitelist];
	};
}
