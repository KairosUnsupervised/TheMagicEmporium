import { Modifier } from "../Modifier";
import { type Flavor, ModifierType } from "../modifier.schema";

export class BrokenModifier extends Modifier {
	public override getDescription(_data: unknown): Flavor {
		return {
			title: "Broken Reference",
			description: "This modifier could not be resolved from the registry",
			disclaimer: null,
			background: null,
		};
	}

	public constructor() {
		super({
			identifier: "INTERNAL_BROKEN",
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
