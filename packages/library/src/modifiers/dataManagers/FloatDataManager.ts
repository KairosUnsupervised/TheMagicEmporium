import Ajv from "ajv";
import {DataManager} from "./DataManager";
import {Logger} from "../../misc/Logger";

export interface Breakpoint {
    min: number;
    value: number;
}

export const breakpointsSchema = {
    type: "array",
    minItems: 1,
    items: {
        type: "object",
        required: ["min", "value"],
        properties: {
            min: {type: "number", minimum: 0},
            value: {type: "number"},
        },
    },
}

export interface Data {
    float: number;
}

const ajv = new Ajv()

const validateData = ajv.compile<Data>({
    type: "object",
    required: ["float"],
    properties: {
        float: {type: "number", minimum: 0},
    },
})

export class FloatDataManager extends DataManager {

    public breakpoints: Breakpoint[];

    constructor(breakpoints: Breakpoint[]) {
        super();
        this.breakpoints = breakpoints.sort((a, b) => b.min - a.min);
    }

    private resolveBreakpoint = (float: number) => {
        for (const breakpoint of this.breakpoints) {
            if (float >= breakpoint.min) {
                return breakpoint.value;
            }
        }
        return 0;
    }

    private resolveData = (data: unknown) => {
        if (!validateData(data)) {
            Logger.error("Invalid data for FloatDataManager.resolveData", {data, errors: validateData.errors})
            return 0
        }
        return data.float;
    }

    /**
     * Translate the float to the nearest breakpoint
     * @param data
     */
    public resolveSingle = (data: unknown): number => {
        return this.resolveBreakpoint(this.resolveData(data));
    }

    /**
     * Translates the float of all items to the nearest breakpoint and sums them up
     * @param data
     */
    public resolveMultiple = (data: unknown[]): number => {
        return data.reduce<number>((sum, item) => sum + this.resolveSingle(item), 0)
    }
}
