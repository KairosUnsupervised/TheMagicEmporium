import Ajv from "ajv"
import {BaseSchema, type CreateProps, Modifier} from "../Modifier"
import {Logger} from "../../misc/Logger";
import {Effect} from "../../effects/Effect";
import {applicationSchema, Flavor, flavorSchema, ModifierType} from "../modifier.schema";
import {FloatDataManager} from "../dataManagers/FloatDataManager";
import {Breakpoint, breakpointsSchema} from "../dataManagers/FloatDataManager";

const ajv = new Ajv({removeAdditional: true, useDefaults: true})

interface Schema extends BaseSchema {
    type: ModifierType.LINEAR;
    effects: unknown[]
    breakpoints: Breakpoint[]
}

const validateSchema = ajv.compile<Schema>({
    type: "object",
    required: ["identifier", "type", "application", "flavor", "breakpoints"],
    properties: {
        identifier: {type: "string"},
        type: {type: "string", enum: Object.values(ModifierType)},
        application: applicationSchema,
        flavor: flavorSchema,
        breakpoints: breakpointsSchema,
        effects: {type: "array"},
    },
})

export class LinearModifier extends Modifier<Schema> {

    public readonly dataManager;

    static create(props: CreateProps): LinearModifier | null {
        if (!validateSchema(props.definition)) {
            Logger.error("Invalid modifier definition for UniqueModifier", {
                definition: props.definition,
                errors: validateSchema.errors
            })
            return null;
        }
        if (props.enabled) {
            return new LinearModifier(props.definition)
        }
        return new LinearModifier({...props.definition, application: {...props.definition.application, weight: 0}})
    }

    constructor(definition: Schema) {
        super(definition);
        this.dataManager = new FloatDataManager(definition.breakpoints)
    }

    public override getDescription(data: unknown): Flavor {
        const keywords = {amount: this.dataManager.resolveSingle(data).toString()};

        return this.replaceKeyWords(this.schema.flavor, keywords);
    }

    public override getEffects = (data: unknown[]) => {
        const keywords = {amount: this.dataManager.resolveMultiple(data).toString()};

        return Effect.parseEffectDefinitions(
            this.replaceKeyWords(this.schema.effects, keywords),
            this.replaceKeyWords(this.schema.flavor, keywords),
        )
    }

}
