import {
	ChangeOperation,
	ChangeSchema,
	validateChangeSchema,
} from "./change.schema";
import { Logger } from "../../misc/Logger";

export class Change {
	public readonly definition: ChangeSchema;

	constructor(definition: ChangeSchema) {
		this.definition = definition;
	}

	/**
	 * Pass an array of unknown data and create an array of Change instances <br/>
	 * Invalid schemas will be logged as error and ignored
	 * @param definitions
	 */
	public static createMultiple = (definitions: unknown[]): Change[] => {
		return definitions
			.map((definition, index) => {
				if (!validateChangeSchema(definition)) {
					Logger.error(`Change at index ${index} has schema mismatches`, {
						definition,
						errors: validateChangeSchema.errors,
					});
					return null;
				}
				return new Change(definition as ChangeSchema);
			})
			.filter((item) => {
				return item !== null;
			}) as Change[];
	};

	/**
	 * Applies a set of changes to a target object, return a new object with the changes applied
	 * @param target
	 * @param changes
	 */
	public static applyAll = <T extends object>(
		target: T,
		changes: Change[],
	): T => {
		const result = JSON.parse(JSON.stringify(target)) as Record<string, any>;

		for (const change of changes) {
			const { key, operation, value } = change.definition;
			const parts = key.split(".");
			const lastKey = parts.pop()!;

			let node: Record<string, any> = result;
			for (const part of parts) {
				if (node[part] == null) node[part] = {};
				node = node[part];
			}

			const current = node[lastKey];

			switch (operation) {
				case ChangeOperation.Set:
					node[lastKey] = value;
					break;
				case ChangeOperation.Add:
					node[lastKey] = (Number(current) || 0) + Number(value);
					break;
				case ChangeOperation.Multiply:
					node[lastKey] = (Number(current) || 0) * Number(value);
					break;
				case ChangeOperation.Append:
					node[lastKey] = Array.isArray(current)
						? [...current, value]
						: [value];
					break;
				case ChangeOperation.Min:
					node[lastKey] = Math.min(Number(current) || 0, Number(value));
					break;
				case ChangeOperation.Max:
					node[lastKey] = Math.max(Number(current) || 0, Number(value));
					break;
				case ChangeOperation.Remove:
					if (Array.isArray(current)) {
						node[lastKey] = current.filter((item) => item !== value);
					} else if (current instanceof Set) {
						const copy = new Set(current);
						copy.delete(value);
						node[lastKey] = copy;
					}
					break;
			}
		}

		return result as T;
	};
}
