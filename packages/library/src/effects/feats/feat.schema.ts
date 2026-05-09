import Ajv from "ajv";
import {EffectType} from "../effect.schema";
import {activityArraySchema, ActivitySchema} from "../activity/activity.schema";

const ajv = new Ajv({removeAdditional: false, strict: false});

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
        value?: number;
        max?: string | number;
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
    activities?: ActivitySchema[];
}

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

const systemSchema = {
    type: "object",
    properties: {
        description: {
            type: "object",
            properties: {
                value: {type: "string"},
                chat: {type: "string"},
            },
        },
        source: {
            type: "object",
            properties: {
                book: {type: "string"},
                page: {type: "string"},
                custom: {type: "string"},
                license: {type: "string"},
            },
        },
        activation: {
            type: "object",
            properties: {
                type: {type: "string"},
                cost: {type: ["number", "null"]},
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
                value: {type: ["number", "null"]},
                width: {type: ["number", "null"]},
                units: {type: "string"},
                type: {type: "string"},
                prompt: {type: "boolean"},
            },
        },
        range: {
            type: "object",
            properties: {
                value: {type: ["number", "null"]},
                long: {type: ["number", "null"]},
                units: {type: "string"},
            },
        },
        uses: {
            type: "object",
            properties: {
                value: {type: "number"},
                max: {type: ["string", "number"]},
                per: {type: ["string", "null"]},
                recovery: {type: "string"},
                prompt: {type: "boolean"},
            },
        },
        type: {
            type: "object",
            properties: {
                value: {type: "string"},
                subtype: {type: "string"},
            },
        },
        requirements: {type: "string"},
        recharge: {
            type: "object",
            properties: {
                value: {type: ["number", "null"]},
                charged: {type: "boolean"},
            },
        },
        activities: activityArraySchema,
    },
};

export const validateFeatSchema = ajv.compile<FeatSchema>({
    type: "object",
    required: ["type"],
    properties: {
        type: {type: "string", const: EffectType.Feat},
        title: {type: "string"},
        description: {type: "string"},
        disclaimer: {type: ["string", "null"]},
        img: {type: "string"},
        system: systemSchema,
    },
});
