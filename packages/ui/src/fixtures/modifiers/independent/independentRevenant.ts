import {IndependentModifier} from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import {ModifierType} from "@tme/library/src/modifiers/modifier.schema";

export const independentRevenantFixture = new IndependentModifier({
    identifier: "fixture.revenant",
    type: ModifierType.Independent,
    application: {weight: 1, whitelistedBy: [], blacklistedBy: [], applies: []},
    breakpoints: [{
        min: 0,
        flavor: {title: "Revenant", description: "Once per long rest, shadow-step up to 60 feet between areas of dim light or darkness.", disclaimer: null},
        changes: [],
        activities: []
    }],
})
