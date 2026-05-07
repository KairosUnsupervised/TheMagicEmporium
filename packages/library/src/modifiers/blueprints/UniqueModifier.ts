import Ajv from "ajv"
import {BaseSchema, type CreateProps, Modifier} from "../Modifier"
import {Logger} from "../../misc/Logger";
import {Effect} from "../../effects/Effect";
import {applicationSchema, flavorSchema, ModifierType} from "../modifier.schema";

const ajv = new Ajv({removeAdditional: true, useDefaults: true})

interface Schema extends BaseSchema {
    type: ModifierType.UNIQUE;
    effects: unknown[]
}

const validateSchema = ajv.compile<Schema>({
    type: "object",
    required: ["identifier", "type", "application", "flavor"],
    properties: {
        identifier: {type: "string"},
        type: {type: "string", enum: Object.values(ModifierType)},
        application: applicationSchema,
        flavor: flavorSchema,
        effects: {type: "array"}
    },
})

/**
 * A Unique modifier bound to a player, e.g. multiple instances do not stack effects
 */
export class UniqueModifier extends Modifier<Schema> {

    static create(props: CreateProps): UniqueModifier | null {
        if (!validateSchema(props.definition)) {
            Logger.error("Invalid modifier definition for UniqueModifier", {
                definition: props.definition,
                errors: validateSchema.errors
            })
            return null;
        }
        if (props.enabled) {
            return new UniqueModifier(props.definition)
        }
        return new UniqueModifier({...props.definition, application: {...props.definition.application, weight: 0}})
    }

    public override getEffects = () => {
        return Effect.parseEffectDefinitions(this.schema.effects, this.getDescription(null))
    }

}
