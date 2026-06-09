import {AllOperations, LockOperation, NumberOperation} from "@tme/shared/src/types/GachaItem5e";

export interface NumberInputProps {
	default?: number;
}

export class NumberInput {
	private value: number = 0;
	private locked: boolean = false;

	public constructor(props: NumberInputProps) {
		this.value = props.default ?? 0;
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
		return this.value;
	};
}
