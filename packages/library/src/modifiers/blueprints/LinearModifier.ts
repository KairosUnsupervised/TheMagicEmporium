import Ajv from "ajv"
import {BaseSchema, type CreateProps, Modifier} from "../Modifier"
import {Logger} from "../../misc/Logger";
import {Effect} from "../../effects/Effect";
import {applicationSchema, Flavor, flavorSchema, ModifierType} from "../modifier.schema";
import {FloatDataManager} from "../dataManagers/FloatDataManager";

const ajv = new Ajv({removeAdditional: true, useDefaults: true})

interface Breakpoint {
    min: number;
    value: number;
}

interface Schema extends BaseSchema {
    type: ModifierType.Linear;
    flavor: Flavor
    breakpoints: Breakpoint[]
    effects: unknown[]
}

const validateSchema = ajv.compile<Schema>({
    type: "object",
    required: ["identifier", "type", "application", "flavor", "breakpoints"],
    properties: {
        identifier: {type: "string"},
        type: {type: "string", enum: Object.values(ModifierType)},
        application: applicationSchema,
        flavor: flavorSchema,
        breakpoints: {type: "object"},
        effects: {type: "array"},
    },
})

export class LinearModifier extends Modifier<Schema> {

    public readonly dataManager= FloatDataManager.create<Breakpoint>();

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
        this.dataManager.setBreakpoints(definition.breakpoints)
    }

    public override getDescription(data: unknown): Flavor {
        const amount = this.dataManager.getBreakpoint(data).value.toString()

        return this.replaceKeyWords(this.schema.flavor, {amount});
    }

    public override getEffects = (data: unknown[]) => {

        const numbers = data.map((data) => {
            return this.dataManager.getBreakpoint(data).value;
        })
        const amount = numbers.reduce((a, b) => a + b, 0).toString()

        return Effect.parseEffectDefinitions(
            this.replaceKeyWords(this.schema.effects,  {amount}),
            this.replaceKeyWords(this.schema.flavor,  {amount}),
        )
    }

}
