import Ajv from "ajv"
import {type CreateProps, Modifier} from "../Modifier"
import {Logger} from "../../misc/Logger";
import {type Application, applicationSchema, type Flavor, flavorSchema, ModifierType} from "../modifier.types";
import {DataManager} from "../dataManagers/DataManager";
import {StackingManager} from "../stackingManagers/StackingManager";
import {UniqueStackingManager} from "../stackingManagers/UniqueStackingManager";

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

    public dataManager = DataManager.Disabled
    public stackingManager = new UniqueStackingManager()

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

    private constructor(definition: Schema) {
        super(definition)
        this.flavor = definition.flavor
    }
}
