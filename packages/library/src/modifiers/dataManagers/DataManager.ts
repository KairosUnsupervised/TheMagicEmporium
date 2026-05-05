export class DataManager<Data = unknown> {
    public data: Data;
    public static Disabled = null;

    constructor(initial: Data) {
        this.data = initial;
    }

    public setData = (data: Data) => {
        this.data = data;
    };
}
