import { FloatManager } from "../manager/FloatManager";
import { Modifier } from "../Modifier";
import {type Flavor, ModifierType, Restriction} from "../modifier.schema";

export class ExhaustedModifier extends Modifier {
	public readonly float = FloatManager.create();

	public override getDescription(_float: number): Flavor {
		return {
			title: "Slot Exhausted",
			description:
				"The modifier pool had no valid candidates left to fill this slot.",
			disclaimer: null,
			background: null,
		};
	}

	public isHighestPossibleBreakpoint = (float: number): boolean => {
		return this.float.isHighestBreakpoint(float);
	};

	public getBreakpointIndex = (float: number): number => {
		return this.float.getBreakpointIndex(float);
	};

	public constructor() {
		super({
			identifier: "TME.INTERNAL.EXHAUSTED",
			type: ModifierType.Independent,
			application: {
				restriction: Restriction.Primary,
				weight: 0,
				whitelistedBy: [],
				blacklistedBy: [],
				applies: [],
			},
		});
	}
}
