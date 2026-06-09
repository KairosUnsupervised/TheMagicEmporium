import { type AllOperations, Field } from "@tme/shared/src/types/GachaItem5e";
import { makeAutoObservable } from "mobx";
import { EquipmentInput } from "./EquipmentInput";
import { NumberInput } from "./NumberInput";

export class PullProcess {
	public equipmentWhitelist = new EquipmentInput();
	public rarityLuck = new NumberInput({});
	public floatLuck = new NumberInput({});
	public revealAmount = new NumberInput({});
	public pickAmount = new NumberInput({});
	public visibilityLevel = new NumberInput({ default: 1 });

	constructor() {
		makeAutoObservable(this);
	}

	public applyOperation = (operation: AllOperations): void => {
		switch (operation.field) {
			case Field.RarityLuck:
				this.rarityLuck.doOperation(operation);
				break;

			case Field.FloatLuck:
				this.floatLuck.doOperation(operation);
				break;

			case Field.RevealAmount:
				this.revealAmount.doOperation(operation);
				break;

			case Field.PickAmount:
				this.pickAmount.doOperation(operation);
				break;

			case Field.VisibilityLevel:
				this.visibilityLevel.doOperation(operation);
				break;

			case Field.EquipmentWhitelist:
				this.equipmentWhitelist.doOperation(operation);
				break;
		}
	};

	/**
	 * Checks if a pull process is possible, doesn't account for an envelope to be required
	 */
	public isPossible = () => {
		if (this.revealAmount.getValue() <= 0) {
			return false;
		}

		if (this.pickAmount.getValue() <= 0) {
			return false;
		}

		if (this.equipmentWhitelist.getValue().length === 0) {
			return false;
		}

		return true;
	};
}
