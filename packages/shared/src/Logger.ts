export class NotificationLogger {
    private readonly prefix: string;

    /**
     * We abuse FoundryVTTs permission system here, 4 = Gamemaster, 0 = All
     */
    private readonly notificationLevel: number;
    private readonly ready: Promise<void>;

    constructor(prefix: string, notificationLevel: number) {
        this.prefix = prefix;
        this.notificationLevel = notificationLevel;
        this.ready = this.createReady();
    }

    private createReady = () => {
        return new Promise<void>((resolve) => {
            Hooks.once("ready", () => {
                resolve();
            });
        });
    }

    public warn = async (message: string, meta?: object) => {
        await this.ready;
        if (game.user && this.notificationLevel <= game.user.role) {
            ui.notifications.warn(`${this.prefix} | ${message} | See logs for details`);
        }
        if (meta !== undefined) {
            console.warn(`${this.prefix} | ${message}`, meta);
        } else {
            console.warn(`${this.prefix} | ${message}`);
        }
    }

    public error = async (message: string, meta?: object) => {
        await this.ready;
        if (game.user && this.notificationLevel <= game.user.role) {
            ui.notifications.error(`${this.prefix} | ${message} | See logs for details`);
        }
        if (meta !== undefined) {
            console.error(`${this.prefix} | ${message}`, meta);
        } else {
            console.error(`${this.prefix} | ${message}`);
        }
    }
}

export class Logger {
    readonly prefix: string;

    public readonly notification: {
        gm: NotificationLogger;
        all: NotificationLogger;
    };

    constructor(prefix: string) {
        this.prefix = prefix;
        this.notification = {
            gm: new NotificationLogger(prefix, 4),
            all: new NotificationLogger(prefix, 0),
        };
    }

    log(message: string, meta?: object): void {
        if (meta !== undefined) {
            console.log(`${this.prefix} | ${message}`, meta);
        } else {
            console.log(`${this.prefix} | ${message}`);
        }
    }

    warn(message: string, meta?: object): void {
        if (meta !== undefined) {
            console.warn(`${this.prefix} | ${message}`, meta);
        } else {
            console.warn(`${this.prefix} | ${message}`);
        }
    }

    error(message: string, meta?: object): void {
        if (meta !== undefined) {
            console.error(`${this.prefix} | ${message}`, meta);
        } else {
            console.error(`${this.prefix} | ${message}`);
        }
    }
}
