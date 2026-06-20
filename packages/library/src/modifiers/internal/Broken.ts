import {FloatManager} from "../manager/FloatManager";
import {Modifier} from "../Modifier";
import {type Flavor, ModifierType, Restriction} from "../modifier.schema";

export class BrokenModifier extends Modifier {
	public readonly float = FloatManager.create();

	public override getDescription(_float: number): Flavor {
		return {
			title: "Broken Reference",
			description: "This modifier could not be resolved from the registry",
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
			identifier: "INTERNAL_BROKEN",
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
