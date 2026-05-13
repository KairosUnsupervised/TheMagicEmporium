import {UniqueModifier} from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import {ModifierType} from "@tme/library/src/modifiers/modifier.schema";

export const uniqueVenomousFixture = new UniqueModifier({
    identifier: "fixture.venomous",
    type: ModifierType.Unique,
    application: {weight: 1, whitelistedBy: [], blacklistedBy: [], applies: []},
    breakpoints: [
        {
            min: 0,
            flavor: {title: "Venomous I", description: "Your attacks apply a minor toxin. The target takes 1 poison damage at the start of its next turn.", disclaimer: null},
            activeEffects: [], feats: []
        },
        {
            min: 0.2,
            flavor: {title: "Venomous II", description: "Your attacks apply a creeping toxin. The target takes 1d4 poison damage for 2 turns.", disclaimer: null},
            activeEffects: [], feats: []
        },
        {
            min: 0.4,
            flavor: {title: "Venomous III", description: "Your attacks apply a virulent toxin. The target takes 1d6 poison damage for 3 turns.", disclaimer: null},
            activeEffects: [], feats: []
        },
        {
            min: 0.6,
            flavor: {title: "Venomous IV", description: "Your attacks apply a concentrated venom. The target takes 1d8 poison damage for 3 turns and has disadvantage on Constitution saves.", disclaimer: null},
            activeEffects: [], feats: []
        },
        {
            min: 0.8,
            flavor: {title: "Venomous V", description: "Your attacks apply a lethal venom. The target takes 2d6 poison damage for 3 turns, has disadvantage on Constitution saves, and its speed is halved.", disclaimer: "Creatures with poison immunity are unaffected."},
            activeEffects: [], feats: []
        },
        {
            min: 0.9,
            flavor: {title: "Venomous VI", description: "Your attacks apply an essence-corrupting poison. The target takes 2d10 poison damage for 3 turns and must succeed on a DC 18 Constitution save or be poisoned for 1 hour.", disclaimer: "Creatures with poison immunity are unaffected."},
            activeEffects: [], feats: []
        },
    ],
})
