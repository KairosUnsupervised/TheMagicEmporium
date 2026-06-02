import Ajv from "ajv";
import { Logger } from "../../misc/Logger";
import { DataManager } from "./DataManager";

export type Breakpoint<Data extends object = object> = { min: number } & Data;

export interface FloatData {
	float: number;
}

const ajv = new Ajv();

const validateData = ajv.compile<FloatData>({
	type: "object",
	required: ["float"],
	properties: {
		float: { type: "number", minimum: 0 },
	},
});

export class FloatDataManager<
	Data extends object = object,
> extends DataManager {
	/**
	 * Sorted descended by min value
	 * @private
	 */
	private breakpoints: Breakpoint<Data>[] = [];

	public static create = <Data extends object = object>() => {
		return new FloatDataManager<Data>();
	};

	public setBreakpoints = (breakpoints: Breakpoint<Data>[]) => {
		this.breakpoints = [...breakpoints].sort((a, b) => b.min - a.min);
	};

	public isHighestBreakpoint = (data: unknown): boolean => {
		if (this.breakpoints.length === 0) {
			return false;
		}
		return this.getBreakpoint(data).min === this.breakpoints[0].min;
	};

	public getBreakpoint = (data: unknown): Breakpoint<Data> => {
		const float = this.resolveFloat(data);
		for (const breakpoint of this.breakpoints) {
			if (float >= breakpoint.min) {
				return breakpoint;
			}
		}
		if (this.breakpoints.length === 0) {
			// This should be circumvented by the schema validation
			throw new Error("No breakpoints set for FloatDataManager");
		}
		return this.breakpoints[0];
	};

	private resolveFloat = (data: unknown): number => {
		if (!validateData(data)) {
			Logger.error("Invalid data for FloatDataManager", {
				data,
				errors: validateData.errors,
			});
			return 0;
		}
		return data.float;
	};
}
