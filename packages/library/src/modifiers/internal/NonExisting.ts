import { IndependentModifier } from "../blueprints/IndependentModifier";
import { ModifierType, Restriction } from "../modifier.schema";

export class NonExistingModifier extends IndependentModifier {
	public constructor() {
		super({
			identifier: "INTERNAL_NON_EXISTING",
			type: ModifierType.Independent,
			application: {
				restriction: Restriction.Primary,
				weight: 0,
				whitelistedBy: [],
				blacklistedBy: [],
				applies: [],
			},
			breakpoints: [
				{
					min: 0,
					flavor: {
						title: "MISSING MODIFIER",
						description:
							"The referenced modifier has been deleted and no longer exists. To keep a modifier available for reference while preventing it from appearing again, set its weight to zero instead of deleting it.",
						disclaimer: "Ask you DM, you may be entitled to compensation",
						background: null,
					},
					changes: [],
					activities: [],
				},
			],
		});
	}
}
