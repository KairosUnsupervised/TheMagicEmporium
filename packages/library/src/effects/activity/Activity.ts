import { logger } from "../../logger";
import {
	type ActivitySchema,
	validateActivitySchema,
} from "../../schemas/parts/activity.schema";

type ActivityDocument = ActivitySchema & { _id: string };

export class Activity {
	public readonly id: string;
	public document: ActivityDocument;

	constructor(definition: ActivitySchema) {
		this.id = randomId(16);
		this.document = { ...definition, _id: this.id };
	}

	/**
	 * Pass an array of unknown data and create an array of Activity instances <br/>
	 * Schema mismatches will be logged as warning, an instance will still be created
	 * @param definitions
	 */
	public static createMultiple = (definitions: unknown[]): Activity[] => {
		return definitions.map((definition, index) => {
			if (!validateActivitySchema(definition)) {
				logger.notification.all.warn(
					`Activity at index ${index} has schema mismatches, proceeding anyway`,
					{
						definition,
						errors: validateActivitySchema.errors,
					},
				);
			}
			return new Activity(definition as ActivitySchema);
		});
	};

	public static activitiesToRecord = (activities: Activity[]) => {
		const record: Record<string, ActivityDocument> = {};
		for (const activity of activities) {
			record[activity.id] = activity.export();
		}
		return record;
	};

	public export = (): ActivityDocument => {
		return this.document;
	};
}

const randomId = (length: number): string => {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};
