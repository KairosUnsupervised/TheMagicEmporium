import Ajv from "ajv"

const ajv = new Ajv({removeAdditional: true})

export interface RawPack {
    id: string
    name: string
    description: string
    enabled: boolean
    modifiers: unknown[]
}

export const validatePack = ajv.compile<RawPack>({
    type: "object",
    required: ["id", "name", "description", "enabled", "modifiers"],
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        enabled: { type: "boolean" },
        modifiers: { type: "array" },
    },
    additionalProperties: false,
})
