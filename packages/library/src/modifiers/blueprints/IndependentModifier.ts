import Ajv from "ajv";
import {BaseSchema, type CreateProps, Modifier} from "../Modifier";
import {Logger} from "../../misc/Logger";
import {applicationSchema, Flavor, flavorSchema, ModifierType} from "../modifier.schema";
import {Breakpoint, breakpointsSchema, FloatDataManager} from "../dataManagers/FloatDataManager";
import {KeydotChange, keydotChangesSchema} from "../keydot";

const ajv = new Ajv({removeAdditional: true, useDefaults: true});

interface Schema extends BaseSchema {
    type: ModifierType.INDEPENDENT;
    breakpoints: Breakpoint[];
    changes: KeydotChange[];
}

const validateSchema = ajv.compile<Schema>({
    type: "object",
    required: ["identifier", "type", "application", "flavor", "breakpoints"],
    properties: {
        identifier:  {type: "string"},
        type:        {type: "string", const: ModifierType.INDEPENDENT},
        application: applicationSchema,
        flavor:      flavorSchema,
        breakpoints: breakpointsSchema,
        changes:     keydotChangesSchema,
    },
});

/**
 * An Independent modifier adds descriptive flavor text to an item without applying any effects to the character.
 * It has no effects and does not interact with the character's stats.
 */
export class IndependentModifier extends Modifier<Schema> {

    public readonly dataManager;

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

    constructor(definition: Schema) {
        super(definition);
        this.dataManager = new FloatDataManager(definition.breakpoints);
    }

    public override getDescription(data: unknown): Flavor {
        const keywords = {amount: this.dataManager.resolveSingle(data).toString()};
        return this.replaceKeyWords(this.schema.flavor, keywords);
    }

    public override getItemChanges = (data: unknown): KeydotChange[] => {
        const keywords = {amount: this.dataManager.resolveSingle(data).toString()};
        return this.replaceKeyWords(this.schema.changes ?? [], keywords);
    };

}
