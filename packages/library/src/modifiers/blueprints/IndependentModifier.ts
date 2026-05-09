import Ajv from "ajv";
import {BaseSchema, type CreateProps, Modifier} from "../Modifier";
import {Logger} from "../../misc/Logger";
import {applicationSchema, flavorSchema, ModifierType} from "../modifier.schema";
import {KeydotChange, keydotChangesSchema} from "../keydot";
import {Activity} from "../../effects/activity/Activity";

const ajv = new Ajv({removeAdditional: true, useDefaults: true});

interface Schema extends BaseSchema {
    type: ModifierType.INDEPENDENT;
    changes?: KeydotChange[];
    activities?: unknown[];
}

const validateSchema = ajv.compile<Schema>({
    type: "object",
    required: ["identifier", "type", "application", "flavor"],
    properties: {
        identifier: {type: "string"},
        type: {type: "string", const: ModifierType.INDEPENDENT},
        application: applicationSchema,
        flavor: flavorSchema,
        changes: keydotChangesSchema,
        activities: {type: "array"},
    },
});

/**
 * An Independent modifier only has a direct effect on the item it's rolled on
 */
export class IndependentModifier extends Modifier<Schema> {

    static create(props: CreateProps): IndependentModifier | null {
        if (!validateSchema(props.definition)) {
            Logger.error("Invalid modifier definition for IndependentModifier", {
                definition: props.definition,
                errors: validateSchema.errors,
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

    public override getItemChanges = (_data: unknown): KeydotChange[] => {
        return this.schema.changes ?? [];
    };

    public override getItemActivities = (_data: unknown): Activity[] => {
        return Activity.createMultiple(this.schema.activities ?? []);
    };

}
