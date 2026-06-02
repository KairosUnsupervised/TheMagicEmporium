export class Logger {
	readonly prefix: string;
	/**
	 * 0 = All
	 * 1 = Player
	 * 4 = Gamemaster
	 * 5 = None
	 */
	readonly notificationLevel: number;

	public notification: {
		gm: Logger;
		all: Logger;
	};

	constructor(prefix: string, notificationLevel: number = 5) {
		this.prefix = prefix;
		this.notificationLevel = notificationLevel;

		this.notification = {
			gm: new Logger(prefix, 4),
			all: new Logger(prefix, 0),
		};
	}

	log(message: string, meta?: object): void {
		if (this.notificationLevel <= game.user.role) {
			ui.notifications.info(`${this.prefix} | ${message}`);
		}
		if (meta !== undefined) {
			console.log(`${this.prefix} | ${message}`, meta);
		} else {
			console.log(`${this.prefix} | ${message}`);
		}
	}

	warn(message: string, meta?: object): void {
		if (this.notificationLevel <= game.user.role) {
			ui.notifications.warn(`${this.prefix} | ${message}`);
		}
		if (meta !== undefined) {
			console.warn(`${this.prefix} | ${message}`, meta);
		} else {
			console.warn(`${this.prefix} | ${message}`);
		}
	}

	error(message: string, meta?: object): void {
		if (this.notificationLevel <= game.user.role) {
			ui.notifications.error(`${this.prefix} | ${message}`);
		}
		if (meta !== undefined) {
			console.error(`${this.prefix} | ${message}`, meta);
		} else {
			console.error(`${this.prefix} | ${message}`);
		}
	}
}
