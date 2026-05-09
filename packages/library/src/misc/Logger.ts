import { namespace } from "@tme/shared/src/namespaceConfig";

export class Logger {
    protected static prefix = namespace.library.name;

    static log = (message: string, meta?: object) => {
        if (!meta) {
            console.log(`${this.prefix} | ${message}`);
            return;
        }
        console.log(`${this.prefix} | ${message}`, meta);
    };

    static warn = (message: string, meta?: object) => {
        if (!meta) {
            console.warn(`${this.prefix} | ${message}`);
            return;
        }
        console.warn(`${this.prefix} | ${message}`, meta);
    };

    // TODO Proper error reporting inside error cases
    static error = (message: string, meta?: object) => {
        if (!meta) {
            console.error(`${this.prefix} | ${message}`);
            return;
        }
        console.error(`${this.prefix} | ${message}`, meta);
    };
}
