import Ajv from "ajv";
import {BaseSchema, type CreateProps, Modifier} from "../Modifier";
import {Logger} from "../../misc/Logger";
import {applicationSchema, Flavor, flavorSchema, ModifierType} from "../modifier.schema";
import {KeydotChange, keydotChangesSchema} from "../keydot";
import {Activity} from "../../effects/activity/Activity";
import {FloatDataManager} from "../dataManagers/FloatDataManager";

const ajv = new Ajv({removeAdditional: true, useDefaults: true});

interface Breakpoint {
    min: number;
    flavor: Flavor;
    changes: KeydotChange[];
    activities: unknown[];
}

interface Schema extends BaseSchema {
    type: ModifierType.Independent;
    breakpoints: Breakpoint[];
}

const validateRaw = ajv.compile<Schema>({
    type: "object",
    required: ["identifier", "type", "application", "breakpoints"],
    properties: {
        identifier: {type: "string"},
        type: {type: "string", const: ModifierType.Independent},
        application: applicationSchema,
        breakpoints: {
            type: "array", minItems: 1, items: {
                type: "object",
                required: ["min", "flavor"],
                properties: {
                    min: {type: "number", minimum: 0},
                    flavor: flavorSchema,
                    changes: keydotChangesSchema,
                    activities: {type: "array", default: []},
                },
            }
        },
    },
});

/**
 * An Independent modifier selects a tier based on a float value and applies that breakpoint's
 * flavor, keydot changes, and activities directly to the item document.
 */
export class IndependentModifier extends Modifier<Schema> {

    public readonly dataManager = FloatDataManager.create<Breakpoint>();

    static create(props: CreateProps): IndependentModifier | null {
        if (!validateRaw(props.definition)) {
            Logger.error("Invalid modifier definition for IndependentModifier", {
                definition: props.definition,
                errors: validateRaw.errors,
            });
            return null;
        }

        if (props.enabled) {
            return new IndependentModifier(props.definition);
        }
        return new IndependentModifier({
            ...props.definition,
            application: {...props.definition.application, weight: 0},
        });
    }

    constructor(definition: Schema) {
        super(definition);
        this.dataManager.setBreakpoints(definition.breakpoints)
    }

    public override getDescription = (data: unknown): Flavor => {
        const breakpoint = this.dataManager.getBreakpoint(data);

        return breakpoint.flavor;
    };

    public override getItemChanges = (data: unknown): KeydotChange[] => {
        const breakpoint = this.dataManager.getBreakpoint(data);

        return breakpoint.changes;
    };

    public override getItemActivities = (data: unknown): Activity[] => {
        const breakpoint = this.dataManager.getBreakpoint(data);

        return Activity.createMultiple(breakpoint.activities);
    };

}
