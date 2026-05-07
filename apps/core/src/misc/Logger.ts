import { namespace } from "@tme/shared/src/namespaceConfig";

// TODO this could be an instance
export class Logger {
    protected static prefix = namespace.core.name;

    static log = (message: string, meta?: object) => {
        if (!meta) {
            console.log(`${this.prefix} | ${message}`);
            return;
        }
        console.log(`${this.prefix} | ${message}`, meta);
    };

    static error = (message: string, meta?: object) => {
        if (!meta) {
            console.error(`${this.prefix} | ${message}`);
            return;
        }
        console.error(`${this.prefix} | ${message}`, meta);
    };
}
