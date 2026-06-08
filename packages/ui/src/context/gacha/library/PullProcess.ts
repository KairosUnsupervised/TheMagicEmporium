import { Field } from "@tme/shared/src/types/GachaItem5e";
import type { AllNumberOperations } from "@tme/shared/src/types/GachaItem5e";
import { NumberInput } from "./NumberInput";
import {makeAutoObservable} from "mobx";

export class PullProcess {
	public rarityLuck = new NumberInput({});
	public floatLuck = new NumberInput({});
	public revealAmount = new NumberInput({});
	public pickAmount = new NumberInput({});
	public visibilityLevel = new NumberInput({});

    constructor() {
        makeAutoObservable(this);
    }

	public applyOperation = (operation: AllNumberOperations): void => {
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
		}
	};

	// TODO currently we don't account for a envelope to be present
    public isPossible = () => {
        return this.revealAmount.getValue() >= 1 && this.pickAmount.getValue() >= 1;
    }
}
