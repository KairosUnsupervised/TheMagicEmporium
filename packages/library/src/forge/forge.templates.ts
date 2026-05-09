import {Rarity} from "../item/item.types";
import {Slot, Template} from "./forge.types";

export const templates: Template[] = [
    // ── Common ────────────────────────────────────────────────────────────────
    {
        rarity:       Rarity.Common,
        slots:        [Slot.Primary, Slot.Primary],
        points:       0.4,
        floatBias:    'NORMAL',
        nonFloatCost: 0.5,
    },
    {
        rarity:       Rarity.Common,
        slots:        [Slot.Secondary],
        points:       0.4,
        floatBias:    'UNLUCKY',
        nonFloatCost: 0.5,
    },

    // ── Uncommon ──────────────────────────────────────────────────────────────
    {
        rarity:       Rarity.Uncommon,
        slots:        [Slot.Primary, Slot.Primary, Slot.Primary],
        points:       0.8,
        floatBias:    'NORMAL',
        nonFloatCost: 0.5,
    },
    {
        rarity:       Rarity.Uncommon,
        slots:        [Slot.Primary, Slot.Primary, Slot.Secondary],
        points:       0.8,
        floatBias:    'UNLUCKY',
        nonFloatCost: 0.5,
    },

    // ── Rare ──────────────────────────────────────────────────────────────────
    {
        rarity:       Rarity.Rare,
        slots:        [Slot.Primary, Slot.Primary, Slot.Primary, Slot.Secondary, Slot.Secondary, Slot.Secondary],
        points:       1.2,
        floatBias:    'UNLUCKY',
        nonFloatCost: 0.4,
    },
    {
        rarity:       Rarity.Rare,
        slots:        [Slot.Primary, Slot.Primary, Slot.Primary, Slot.Secondary],
        points:       1.2,
        floatBias:    'NORMAL',
        nonFloatCost: 0.4,
    },
    {
        rarity:       Rarity.Rare,
        slots:        [Slot.Primary, Slot.Secondary],
        points:       1.2,
        floatBias:    'LUCKY',
        nonFloatCost: 0.4,
    },

    // ── Very Rare ─────────────────────────────────────────────────────────────
    {
        rarity:       Rarity.VeryRare,
        slots:        [Slot.Primary, Slot.Primary, Slot.Primary, Slot.Secondary, Slot.Secondary, Slot.Secondary],
        points:       2.4,
        floatBias:    'NORMAL',
        nonFloatCost: 0.3,
    },
    {
        rarity:       Rarity.VeryRare,
        slots:        [Slot.Primary, Slot.Primary, Slot.Secondary, Slot.Secondary],
        points:       2.4,
        floatBias:    'LUCKY',
        nonFloatCost: 0.3,
    },
    {
        rarity:       Rarity.VeryRare,
        slots:        [Slot.Primary, Slot.Primary, Slot.Primary, Slot.Secondary, Slot.Secondary, Slot.Secondary],
        points:       2.4,
        floatBias:    'UNLUCKY',
        nonFloatCost: 0.3,
    },

    // ── Legendary ─────────────────────────────────────────────────────────────
    {
        rarity:       Rarity.Legendary,
        slots:        [Slot.Primary, Slot.Primary, Slot.Primary, Slot.Secondary, Slot.Secondary, Slot.Secondary, Slot.Tertiary],
        points:       4,
        floatBias:    'NORMAL',
        nonFloatCost: 0.3,
    },
    {
        rarity:       Rarity.Legendary,
        slots:        [Slot.Primary, Slot.Primary, Slot.Secondary, Slot.Secondary, Slot.Tertiary],
        points:       4,
        floatBias:    'LUCKY',
        nonFloatCost: 0.3,
    },
];

export const getRandomTemplate = (rarity: Rarity): Template => {
    const available = templates.filter((t) => t.rarity === rarity);
    const picked = available[Math.floor(Math.random() * available.length)];
    return JSON.parse(JSON.stringify(picked));
};
