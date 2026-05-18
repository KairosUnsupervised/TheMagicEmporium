import { Modifier } from "../Modifier";
import { Flavor, ModifierType } from "../modifier.schema";

export class ExhaustedModifier extends Modifier {
	public override getDescription(_data: unknown): Flavor {
		return {
			title: "Slot Exhausted",
			description:
				"The modifier pool had no valid candidates left to fill this slot.",
			disclaimer: null,
		};
	}

	public constructor() {
		super({
			identifier: "TME.INTERNAL.EXHAUSTED",
			type: ModifierType.Independent,
			application: {
				weight: 0,
				whitelistedBy: [],
				blacklistedBy: [],
				applies: [],
			},
		});
	}
}
