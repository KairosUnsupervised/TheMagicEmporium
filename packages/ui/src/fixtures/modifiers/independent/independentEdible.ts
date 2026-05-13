import {IndependentModifier} from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import {ModifierType} from "@tme/library/src/modifiers/modifier.schema";

export const independentEdibleFixture = new IndependentModifier({
    identifier: "fixture.edible",
    type: ModifierType.Independent,
    application: {weight: 1, whitelistedBy: [], blacklistedBy: [], applies: []},
    breakpoints: [{
        min: 0,
        flavor: {title: "Edible", description: "Despite its properties, this item is edible.", disclaimer: null},
        changes: [],
        activities: []
    }],
})
