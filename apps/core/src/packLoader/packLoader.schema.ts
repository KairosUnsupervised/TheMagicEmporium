import Ajv from "ajv"

const ajv = new Ajv({removeAdditional: true})

export interface PackSchema {
    id: string
    name: string
    description: string
    enabled: boolean
    modifiers: unknown[]
}

export const validatePackSchema = ajv.compile<PackSchema>({
    type: "object",
    required: ["id", "name", "description", "enabled", "modifiers"],
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        enabled: { type: "boolean" },
        modifiers: { type: "array" },
    },
})
