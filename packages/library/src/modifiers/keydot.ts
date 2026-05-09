export enum KeydotOperation {
    Set = "SET",
    Add = "ADD",
    Multiply = "MULTIPLY",
    Append = "APPEND",
    Min = "MIN",
    Max = "MAX",
}

export interface KeydotChange {
    key: string;
    operation: KeydotOperation;
    value: string | number | boolean;
}

export const keydotChangesSchema = {
    type: "array",
    items: {
        type: "object",
        required: ["key", "operation", "value"],
        properties: {
            key: {type: "string"},
            operation: {type: "string", enum: Object.values(KeydotOperation)},
            value: {type: ["string", "number", "boolean"]},
        },
    },
};

export const applyKeydotChanges = <T extends object>(target: T, changes: KeydotChange[]): T => {
    const result = JSON.parse(JSON.stringify(target)) as Record<string, any>;

    for (const change of changes) {
        const parts = change.key.split('.');
        const lastKey = parts.pop()!;

        let node: Record<string, any> = result;
        for (const part of parts) {
            if (node[part] == null) node[part] = {};
            node = node[part];
        }

        const current = node[lastKey];

        switch (change.operation) {
            case KeydotOperation.Set:
                node[lastKey] = change.value;
                break;
            case KeydotOperation.Add:
                node[lastKey] = (Number(current) || 0) + Number(change.value);
                break;
            case KeydotOperation.Multiply:
                node[lastKey] = (Number(current) || 0) * Number(change.value);
                break;
            case KeydotOperation.Append:
                node[lastKey] = Array.isArray(current) ? [...current, change.value] : [change.value];
                break;
            case KeydotOperation.Min:
                node[lastKey] = Math.min(Number(current) || 0, Number(change.value));
                break;
            case KeydotOperation.Max:
                node[lastKey] = Math.max(Number(current) || 0, Number(change.value));
                break;
        }
    }

    return result as T;
};
