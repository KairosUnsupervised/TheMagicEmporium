import {UniqueModifier} from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import {ModifierType} from "@tme/library/src/modifiers/modifier.schema";

export const uniqueWrathfulFixture = new UniqueModifier({
    identifier: "fixture.wrathful",
    type: ModifierType.Unique,
    application: {weight: 1, whitelistedBy: [], blacklistedBy: [], applies: []},
    breakpoints: [
        {
            min: 0,
            flavor: {
                title: "Wrathful",
                description: "While below half health, your melee attacks deal an extra 1d4 fire damage.",
                disclaimer: null
            },
            activeEffects: [],
            feats: []
        },
        {
            min: 1,
            flavor: {
                title: "Wrathful",
                description: "While below half health, your melee attacks deal an extra 1d8 fire damage and cause the target to burn.",
                disclaimer: "Burning deals 1d4 fire damage at the start of each of the target's turns."
            },
            activeEffects: [],
            feats: []
        },
    ],
})