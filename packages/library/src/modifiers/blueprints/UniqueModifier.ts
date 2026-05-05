import Ajv from "ajv"
import {type CreateProps, Modifier} from "../Modifier"
import {Logger} from "../../misc/Logger";
import {type Application, applicationSchema, type Flavor, flavorSchema, ModifierType} from "../modifier.types";

const ajv = new Ajv({removeAdditional: true, useDefaults: true})

export interface Schema {
    identifier: string;
    type: ModifierType;
    application: Application
    flavor: Flavor
}

export const validateSchema = ajv.compile<Schema>({
    type: "object",
    required: ["identifier", "type", "application", "flavor"],
    properties: {
        identifier: {type: "string"},
        type: {type: "string", enum: Object.values(ModifierType)},
        application: applicationSchema,
        flavor: flavorSchema,
    },
})

export class UniqueModifier extends Modifier {

    public type = ModifierType.UNIQUE

    static create(props: CreateProps): UniqueModifier | null {
        if (!validateSchema(props.definition)) {
            Logger.error("Invalid modifier definition", {definition: props.definition, errors: validateSchema.errors})
            return null;
        }
        if (props.enabled) {
            return new UniqueModifier(props.definition)
        }
        return new UniqueModifier({...props.definition, application: {...props.definition.application, weight: 0}})
    }

    private constructor(data: Schema) {
        super(data)
        this.identifier = data.identifier
        this.application = data.application
        this.flavor = data.flavor
    }
}
