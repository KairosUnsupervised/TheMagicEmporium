export type Breakpoint<Data extends BaseBreakpoint> = Data;

// TODO OUTSIDE FLOAT VALIDATION

export interface BaseBreakpoint {
	min: number;
}

export class FloatManager<
	Data extends BaseBreakpoint,
> {

	/**
	 * Sorted descended by min value
	 * @private
	 */
	private breakpoints: Breakpoint<Data>[] = [];

	public static create = <Data extends BaseBreakpoint>() => {
		return new FloatManager<Data>();
	};

	public setBreakpoints = (breakpoints: Breakpoint<Data>[]) => {
		this.breakpoints = [...breakpoints].sort((a, b) => b.min - a.min);
	};

	public isHighestBreakpoint = (float: number): boolean => {
		if (this.breakpoints.length === 0) {
			return false;
		}
		return this.getBreakpoint(float).min === this.breakpoints[0].min;
	};

	public getBreakpointIndex = (float: number) => {
		if (this.breakpoints.length === 0) {
			return 0;
		}
		const current = this.getBreakpoint(float);
		return this.breakpoints.length - (this.breakpoints.findIndex(b => b.min === current.min) + 1);
	}

	public getBreakpoint = (float: number): Breakpoint<Data> => {
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
}
