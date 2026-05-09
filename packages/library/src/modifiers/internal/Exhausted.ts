import {Modifier} from "../Modifier";
import {ModifierType} from "../modifier.schema";

export class ExhaustedModifier extends Modifier {

    public constructor() {
        super({
            identifier: "TME.INTERNAL.EXHAUSTED",
            type: ModifierType.INDEPENDENT,
            application: {weight: 0, whitelistedBy: [], blacklistedBy: [], applies: []},
            flavor: {
                title: "Slot Exhausted",
                description: "The modifier pool had no valid candidates left to fill this slot.",
                disclaimer: null,
            },
        });
    }

}
