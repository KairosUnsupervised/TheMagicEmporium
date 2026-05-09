import Ajv from "ajv"
import {BaseSchema, type CreateProps, Modifier} from "../Modifier"
import {Logger} from "../../misc/Logger";
import {Effect} from "../../effects/Effect";
import {applicationSchema, Flavor, flavorSchema, ModifierType} from "../modifier.schema";
import {FloatDataManager} from "../dataManagers/FloatDataManager";

const ajv = new Ajv({removeAdditional: true, useDefaults: true})

interface Breakpoint {
    min: number;
    flavor: Flavor;
    effects: unknown[];
}

interface Schema extends BaseSchema {
    type: ModifierType.Unique;
    breakpoints: Breakpoint[];
}

const validateSchema = ajv.compile<Schema>({
    type: "object",
    required: ["identifier", "type", "application", "breakpoints"],
    properties: {
        identifier: {type: "string"},
        type: {type: "string", const: ModifierType.Unique},
        application: applicationSchema,
        breakpoints: {
            type: "array", minItems: 1, items: {
                type: "object",
                required: ["min", "flavor"],
                properties: {
                    min: {type: "number", minimum: 0},
                    flavor: flavorSchema,
                    effects: {type: "array", default: []},
                },
            }
        },
    },
})

/**
 * A Unique modifier bound to a player, e.g. multiple instances do not stack effects instead the highest effect is applied
 */
export class UniqueModifier extends Modifier<Schema> {

    public readonly dataManager = FloatDataManager.create<Breakpoint>();

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

    constructor(definition: Schema) {
        super(definition);
        this.dataManager.setBreakpoints(definition.breakpoints)
    }

    public override getDescription(data: unknown): Flavor {
        const breakpoint = this.dataManager.getBreakpoint(data);
        return breakpoint.flavor;
    }

    public override getEffects = (data: unknown[]) => {

        const breakpoints = data.map((data) => {
            return this.dataManager.getBreakpoint(data);
        })
        const highest = breakpoints.sort((a, b) => b.min - a.min)[0];

        return Effect.parseEffectDefinitions(highest.effects, highest.flavor)
    }

}
