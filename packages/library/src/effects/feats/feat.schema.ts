import Ajv from "ajv";
import {EffectType} from "../effect.schema";

// Permissive instance — unknown properties pass through to FoundryVTT untouched
const ajv = new Ajv({removeAdditional: false, strict: false});

// ── Activity sub-types ────────────────────────────────────────────────────────

export interface ActivityConsumptionTarget {
    type?: 'itemUses' | 'activityUses' | 'material' | 'hitDice' | 'attribute';
    target?: string;
    value?: string;
    scaling?: {
        mode?: string;
        formula?: string;
    };
}

export interface ActivityDamagePart {
    number?: number;
    denomination?: number;
    bonus?: string;
    /** e.g. ["fire", "cold"] */
    types?: string[];
    custom?: {
        enabled?: boolean;
        formula?: string;
    };
    scaling?: {
        mode?: 'whole' | 'half' | '';
        formula?: string;
    };
}

export interface ActivityUseRecovery {
    period?: 'sr' | 'lr' | 'dawn' | 'dusk' | 'charges' | 'day';
    type?: 'recoverAll' | 'loseAll' | 'formula';
    formula?: string;
}

export interface Activity {
    _id?: string;
    type?: 'attack' | 'damage' | 'heal' | 'save' | 'utility' | 'enchant' | 'summon';
    name?: string;
    img?: string;
    description?: {
        chatFlavor?: string;
    };
    activation?: {
        type?: string;
        cost?: number | null;
        condition?: string;
    };
    duration?: {
        value?: string | number | null;
        units?: 'inst' | 'turn' | 'round' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'perm' | 'spec' | '';
        special?: string;
    };
    target?: {
        template?: {
            type?: 'circle' | 'sphere' | 'cylinder' | 'cone' | 'square' | 'cube' | 'line' | 'wall';
            size?: number;
            width?: number;
            height?: number;
            units?: string;
            count?: number;
            contiguous?: boolean;
        };
        affects?: {
            count?: string | number;
            type?: string;
            choice?: boolean;
            special?: string;
        };
        prompt?: boolean;
    };
    range?: {
        value?: number | null;
        long?: number | null;
        units?: 'ft' | 'mi' | 'm' | 'km' | 'self' | 'touch' | 'spec' | 'any' | '';
        special?: string;
    };
    consumption?: {
        targets?: ActivityConsumptionTarget[];
        scaling?: {
            allowed?: boolean;
            max?: string;
        };
    };
    uses?: {
        spent?: number;
        max?: string | number;
        recovery?: ActivityUseRecovery[];
    };
    damage?: {
        critical?: {
            allow?: boolean;
            bonus?: string;
        };
        onSave?: 'none' | 'half' | 'full';
        includeBase?: boolean;
        parts?: ActivityDamagePart[];
    };
    save?: {
        ability?: string | string[];
        dc?: {
            calculation?: 'spellcasting' | 'proficiency' | 'flat' | '';
            formula?: string;
        };
    };
    healing?: {
        critical?: {
            allow?: boolean;
            bonus?: string;
        };
        custom?: {
            enabled?: boolean;
            formula?: string;
        };
        scaling?: {
            mode?: string;
            formula?: string;
        };
        types?: string[];
    };
    roll?: {
        formula?: string;
        name?: string;
        prompt?: boolean;
    };
    attack?: {
        ability?: string;
        bonus?: string;
        critical?: {
            threshold?: number | null;
        };
        flat?: boolean;
        type?: {
            value?: 'melee' | 'ranged' | '';
            classification?: 'weapon' | 'spell' | 'unarmed' | '';
        };
    };
}

// ── System block ──────────────────────────────────────────────────────────────

export interface FeatSystem {
    description?: {
        value?: string;
        chat?: string;
    };
    source?: {
        book?: string;
        page?: string;
        custom?: string;
        license?: string;
    };
    activation?: {
        type?: '' | 'action' | 'bonus' | 'reaction' | 'special' | 'legendary' | 'mythic' | 'lair' | 'crew';
        cost?: number | null;
        condition?: string;
    };
    duration?: {
        value?: string | number | null;
        units?: 'inst' | 'turn' | 'round' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'perm' | 'spec' | '';
    };
    target?: {
        value?: number | null;
        width?: number | null;
        units?: string;
        type?: '' | 'self' | 'ally' | 'enemy' | 'creature' | 'object' | 'space' | 'radius' | 'sphere' | 'cylinder' | 'cone' | 'square' | 'cube' | 'line' | 'wall' | 'any';
        prompt?: boolean;
    };
    range?: {
        value?: number | null;
        long?: number | null;
        units?: 'ft' | 'mi' | 'm' | 'km' | 'self' | 'touch' | 'spec' | 'any' | '';
    };
    uses?: {
        /** Current remaining uses — leave at 0 for fresh items */
        value?: number;
        max?: string | number;
        /** Recovery period (older system field; prefer activity-level recovery) */
        per?: 'sr' | 'lr' | 'day' | 'charges' | 'dawn' | 'dusk' | null;
        recovery?: string;
        prompt?: boolean;
    };
    type?: {
        value?: 'feat' | 'class' | 'subclass' | 'background' | 'race' | 'monster' | 'supernatural' | 'maneuver' | '';
        subtype?: string;
    };
    requirements?: string;
    recharge?: {
        value?: number | null;
        charged?: boolean;
    };
    activities?: Activity[];
}

// ── Top-level TME input schema ────────────────────────────────────────────────

export interface FeatSchema {
    type: EffectType.Feat;
    /** Generates document.name if not already set via system */
    title?: string;
    /** Generates system.description.value if not already set */
    description?: string;
    /** Appended to system.description.value as an italicised note */
    disclaimer?: string | null;
    img?: string;
    system?: FeatSystem;
}

// ── AJV validator ─────────────────────────────────────────────────────────────

const activitySchema = {
    type: "object",
    properties: {
        _id:  {type: "string"},
        type: {type: "string", enum: ["attack", "damage", "heal", "save", "utility", "enchant", "summon"]},
        name: {type: "string"},
        img:  {type: "string"},
        description: {
            type: "object",
            properties: {
                chatFlavor: {type: "string"},
            },
        },
        activation: {
            type: "object",
            properties: {
                type:      {type: "string"},
                cost:      {type: ["number", "null"]},
                condition: {type: "string"},
            },
        },
        duration: {
            type: "object",
            properties: {
                value: {type: ["string", "number", "null"]},
                units: {type: "string"},
                special: {type: "string"},
            },
        },
        target: {
            type: "object",
            properties: {
                template: {
                    type: "object",
                    properties: {
                        type:        {type: "string", enum: ["circle", "sphere", "cylinder", "cone", "square", "cube", "line", "wall"]},
                        size:        {type: "number"},
                        width:       {type: "number"},
                        height:      {type: "number"},
                        units:       {type: "string"},
                        count:       {type: "number"},
                        contiguous:  {type: "boolean"},
                    },
                },
                affects: {
                    type: "object",
                    properties: {
                        count:   {type: ["string", "number"]},
                        type:    {type: "string"},
                        choice:  {type: "boolean"},
                        special: {type: "string"},
                    },
                },
                prompt: {type: "boolean"},
            },
        },
        range: {
            type: "object",
            properties: {
                value:   {type: ["number", "null"]},
                long:    {type: ["number", "null"]},
                units:   {type: "string"},
                special: {type: "string"},
            },
        },
        consumption: {
            type: "object",
            properties: {
                targets: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            type:   {type: "string", enum: ["itemUses", "activityUses", "material", "hitDice", "attribute"]},
                            target: {type: "string"},
                            value:  {type: "string"},
                            scaling: {
                                type: "object",
                                properties: {
                                    mode:    {type: "string"},
                                    formula: {type: "string"},
                                },
                            },
                        },
                    },
                },
                scaling: {
                    type: "object",
                    properties: {
                        allowed: {type: "boolean"},
                        max:     {type: "string"},
                    },
                },
            },
        },
        uses: {
            type: "object",
            properties: {
                spent: {type: "number"},
                max:   {type: ["string", "number"]},
                recovery: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            period:  {type: "string", enum: ["sr", "lr", "dawn", "dusk", "charges", "day"]},
                            type:    {type: "string", enum: ["recoverAll", "loseAll", "formula"]},
                            formula: {type: "string"},
                        },
                    },
                },
            },
        },
        damage: {
            type: "object",
            properties: {
                critical: {
                    type: "object",
                    properties: {
                        allow:  {type: "boolean"},
                        bonus:  {type: "string"},
                    },
                },
                onSave:      {type: "string", enum: ["none", "half", "full"]},
                includeBase: {type: "boolean"},
                parts: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            number:      {type: "number"},
                            denomination:{type: "number"},
                            bonus:       {type: "string"},
                            types:       {type: "array", items: {type: "string"}},
                            custom: {
                                type: "object",
                                properties: {
                                    enabled: {type: "boolean"},
                                    formula: {type: "string"},
                                },
                            },
                            scaling: {
                                type: "object",
                                properties: {
                                    mode:    {type: "string"},
                                    formula: {type: "string"},
                                },
                            },
                        },
                    },
                },
            },
        },
        save: {
            type: "object",
            properties: {
                ability: {
                    oneOf: [
                        {type: "string"},
                        {type: "array", items: {type: "string"}},
                    ],
                },
                dc: {
                    type: "object",
                    properties: {
                        calculation: {type: "string", enum: ["spellcasting", "proficiency", "flat", ""]},
                        formula:     {type: "string"},
                    },
                },
            },
        },
        healing: {
            type: "object",
            properties: {
                critical: {
                    type: "object",
                    properties: {
                        allow:  {type: "boolean"},
                        bonus:  {type: "string"},
                    },
                },
                custom: {
                    type: "object",
                    properties: {
                        enabled: {type: "boolean"},
                        formula: {type: "string"},
                    },
                },
                scaling: {
                    type: "object",
                    properties: {
                        mode:    {type: "string"},
                        formula: {type: "string"},
                    },
                },
                types: {type: "array", items: {type: "string"}},
            },
        },
        roll: {
            type: "object",
            properties: {
                formula: {type: "string"},
                name:    {type: "string"},
                prompt:  {type: "boolean"},
            },
        },
        attack: {
            type: "object",
            properties: {
                ability: {type: "string"},
                bonus:   {type: "string"},
                critical: {
                    type: "object",
                    properties: {
                        threshold: {type: ["number", "null"]},
                    },
                },
                flat: {type: "boolean"},
                type: {
                    type: "object",
                    properties: {
                        value:          {type: "string", enum: ["melee", "ranged", ""]},
                        classification: {type: "string", enum: ["weapon", "spell", "unarmed", ""]},
                    },
                },
            },
        },
    },
};

const systemSchema = {
    type: "object",
    properties: {
        description: {
            type: "object",
            properties: {
                value: {type: "string"},
                chat:  {type: "string"},
            },
        },
        source: {
            type: "object",
            properties: {
                book:    {type: "string"},
                page:    {type: "string"},
                custom:  {type: "string"},
                license: {type: "string"},
            },
        },
        activation: {
            type: "object",
            properties: {
                type:      {type: "string"},
                cost:      {type: ["number", "null"]},
                condition: {type: "string"},
            },
        },
        duration: {
            type: "object",
            properties: {
                value: {type: ["string", "number", "null"]},
                units: {type: "string"},
            },
        },
        target: {
            type: "object",
            properties: {
                value:  {type: ["number", "null"]},
                width:  {type: ["number", "null"]},
                units:  {type: "string"},
                type:   {type: "string"},
                prompt: {type: "boolean"},
            },
        },
        range: {
            type: "object",
            properties: {
                value: {type: ["number", "null"]},
                long:  {type: ["number", "null"]},
                units: {type: "string"},
            },
        },
        uses: {
            type: "object",
            properties: {
                value:    {type: "number"},
                max:      {type: ["string", "number"]},
                per:      {type: ["string", "null"]},
                recovery: {type: "string"},
                prompt:   {type: "boolean"},
            },
        },
        type: {
            type: "object",
            properties: {
                value:   {type: "string"},
                subtype: {type: "string"},
            },
        },
        requirements: {type: "string"},
        recharge: {
            type: "object",
            properties: {
                value:   {type: ["number", "null"]},
                charged: {type: "boolean"},
            },
        },
        activities: {
            type: "array",
            items: activitySchema,
        },
    },
};

export const validateFeatSchema = ajv.compile<FeatSchema>({
    type: "object",
    required: ["type"],
    properties: {
        type:        {type: "string", const: EffectType.Feat},
        title:       {type: "string"},
        description: {type: "string"},
        disclaimer:  {type: ["string", "null"]},
        img:         {type: "string"},
        system:      systemSchema,
    },
});
