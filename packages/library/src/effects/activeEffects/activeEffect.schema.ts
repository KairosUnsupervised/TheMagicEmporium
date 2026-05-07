import Ajv from "ajv";
import {EffectType} from "../effect.schema";

const ajv = new Ajv({removeAdditional: true})

interface ActiveEffectSchema {
    type: EffectType.ActiveEffect,
    title?: string,
    description?: string,
    disclaimer?: string | null,
    effects: {
        key: string;
        // TODO MAKE MODES TO ENUM
        mode: string;
        value: string;
    }[]
}

export const validateActiveEffectSchema = ajv.compile<ActiveEffectSchema>({
    type: "object",
    required: ["type", "effects"],
    properties: {
        type: {type: "string", const: EffectType.ActiveEffect},
        title: {type: "string"},
        description: {type: "string"},
        disclaimer: {type: ["string", "null"]},
        effects: {
            type: "array",
            items: {
                type: "object",
                required: ["key", "mode", "value"],
                properties: {
                    key: {type: "string"},
                    mode: {type: "string"},
                    value: {type: "string"},
                },
            },
        },
    },
})
