import {Modifier} from "../Modifier";
import {ModifierType} from "../modifier.schema";

export class BrokenModifier extends Modifier {

    public constructor() {
        super({
            identifier: "INTERNAL_BROKEN",
            type: ModifierType.INDEPENDENT,
            application: {weight: 0, whitelistedBy: [], blacklistedBy: [], applies: []},
            flavor: {
                title: "Broken Reference",
                description: "This modifier could not be resolved from the registry",
                disclaimer: null,
            },
        });
    }

}
