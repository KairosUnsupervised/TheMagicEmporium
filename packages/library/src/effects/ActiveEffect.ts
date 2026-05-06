export enum Mode {
    /**
     * The Custom change mode applies logic defined by a game system or add-on module.
     */
    Custom = 0,
    /**
     * Multiplies the defined attribute by the numeric value in the Effect Value field.
     */
    Multiply = 1,
    /**
     * Adds the provided value to a number. This can be used to both add and subtract from a particular value by specifying +1 or -1 as the value to add.
     */
    Add = 2,
    /**
     * Reduces the defined attribute only in cases where the current value of that attribute would be greater than value specified in the Effect Value field.
     */
    Downgrade = 3,
    /**
     * Increases the defined attribute only in cases where the current value of that attribute would be less than value specified in the Effect Value field.
     */
    Upgrade = 4,
    /**
     * Replaces the defined attribute with the value provided in the Effect Value field.
     */
    Override = 5,
}

interface Change {
    key: string;
    mode: Mode;
    priority: undefined;
    value: string;
}

interface Document {
    name: string;
    type: 'base';
    description: string;
    icon: string;
    transfer: boolean;
    changes: Change[];
}

export class ActiveEffect {
    private sortIndex = 0;
    public document: Document = {
        name: 'Unnamed Item',
        type: 'base',
        description: '',
        icon: '',
        transfer: true,
        changes: [],
    };

    constructor(props: Partial<Document>, sortIndex: number) {
        this.document = { ...this.document, ...props };
        this.sortIndex = sortIndex;
    }

    public addEffect = (key: string, mode: Mode, value: string | number) => {
        if (typeof value !== 'string') {
            value = value.toString();
        }
        this.document.changes.push({ key, mode, value, priority: undefined });
        return this;
    };

    public getSortIndex = (): number => {
        return this.sortIndex;
    };

    public export = (): object => {
        return this.document;
    };
}
