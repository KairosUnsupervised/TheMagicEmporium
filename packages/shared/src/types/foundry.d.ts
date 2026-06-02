declare const Hooks: {
	on: (hook: string, any) => void;
	once: (hook: string, any) => void;
};

declare class Item {
	static create(data: object, options?: object): Promise<Item | undefined>;
}

declare const game: {
	userId: string;
	world: {
		id: string;
	};
	modules: {
		get(id: string): { api: unknown } | undefined;
	};
	user?: {
		role: number;
	};
};

declare const ui: {
	notifications: {
		info(message: string): void;
		warn(message: string): void;
		error(message: string): void;
	};
};

declare const foundry: {
	applications: {
		apps: {
			FilePicker: {
				browse(
					source: "data" | "public" | "s3",
					path: string,
				): Promise<{
					dirs: string[];
					files: string[];
					target: string;
				}>;
			};
		};
	};
};
