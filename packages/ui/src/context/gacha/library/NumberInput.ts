import { LockOperation, NumberOperation } from "@tme/shared/src/types/GachaItem5e";
import type { AllNumberOperations } from "@tme/shared/src/types/GachaItem5e";

export interface NumberInputProps {
	clampLow?: number;
	clampHigh?: number;
}

export class NumberInput {
	private value: number = 0;
	private locked: boolean = false;
	private readonly clampLow: number | null = null;
	private readonly clampHigh: number | null = null;

	public constructor(props: NumberInputProps) {
		this.clampLow = props.clampLow ?? null;
		this.clampHigh = props.clampHigh ?? null;
	}

	public doOperation(operation: AllNumberOperations): void {
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

			case NumberOperation.Set:
				this.value = operation.value;
				break;

			case NumberOperation.Add:
				this.value = this.value + operation.value;
				break;

			case NumberOperation.Subtract:
				this.value = this.value - operation.value;
				break;

			case NumberOperation.Multiply:
				this.value = this.value * operation.value;
				break;

			case NumberOperation.Divide:
				if (operation.value !== 0) {
					this.value = this.value / operation.value;
				}
				break;
		}
	}

	public getValue = (): number => {
		let result = this.value;
		if (this.clampLow !== null) {
			result = Math.max(this.clampLow, result);
		}
		if (this.clampHigh !== null) {
			result = Math.min(this.clampHigh, result);
		}
		return result;
	};
}
