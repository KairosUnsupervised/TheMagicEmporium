import Ajv from "ajv"

const ajv = new Ajv({ removeAdditional: true })

export enum EffectType {
    ActiveEffect = "ACTIVE_EFFECT",
    Feat = "FEAT",
}

interface ValidateEffect {
    type: EffectType
}

export const validateEffect = ajv.compile<ValidateEffect>({
    type: "object",
    required: ["type"],
    properties: {
        type: {enum: Object.values(EffectType)},
    }
})
