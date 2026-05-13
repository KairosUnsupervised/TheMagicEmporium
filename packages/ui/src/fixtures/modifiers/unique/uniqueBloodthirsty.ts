import {UniqueModifier} from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import {ModifierType} from "@tme/library/src/modifiers/modifier.schema";

export const uniqueBloodthirstyFixture = new UniqueModifier({
    identifier: "fixture.bloodthirsty",
    type: ModifierType.Unique,
    application: {weight: 1, whitelistedBy: [], blacklistedBy: [], applies: []},
    breakpoints: [{min: 0,
        flavor: {
            title: "Bloodthirsty",
            description: "On direct creature kill, you gain advantage on your next attack.",
            disclaimer: null
        },
        activeEffects: [],
        feats: []
    }],
})
