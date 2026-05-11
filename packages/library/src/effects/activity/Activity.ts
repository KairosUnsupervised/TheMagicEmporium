import {ActivitySchema, validateActivitySchema} from "./activity.schema";
import {Logger} from "../../misc/Logger";

type ActivityDocument = ActivitySchema & { _id: string };

export class Activity {
    public readonly id: string;
    public document: ActivityDocument;

    constructor(definition: ActivitySchema) {
        this.id = randomId(16);
        this.document = {...definition, _id: this.id};
    }

    /**
     * Pass an array of unknown data and create an array of Activity instances <br/>
     * Schema mismatches will be logged as warning, an instance will still be created
     * @param definitions
     */
    public static createMultiple = (definitions: unknown[]): Activity[] => {
        return definitions.map((definition, index) => {
            if (!validateActivitySchema(definition)) {
                Logger.warn(`Activity at index ${index} has schema mismatches`, {
                    definition,
                    errors: validateActivitySchema.errors,
                });
            }
            return new Activity(definition as ActivitySchema);
        });
    };

    public static activitiesToRecord = (activities: Activity[]) => {
        const record: Record<string, ActivityDocument> = {};
        for(const activity of activities) {
            record[activity.id] = activity.export()
        }
        return record;
    }

    public export = (): ActivityDocument => {
        return this.document;
    };
}

/**
 * @DEPRECATED // TODO Replace deprecated function activitiesToRecord
 * @param activities
 */
export const activitiesToRecord = (activities: ActivitySchema[]): Record<string, ActivityDocument> => {
    const record: Record<string, ActivityDocument> = {};
    for (const activity of Activity.createMultiple(activities)) {
        record[activity.id] = activity.export();
    }
    return record;
};

const randomId = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
