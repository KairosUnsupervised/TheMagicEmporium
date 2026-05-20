import type { DeepPartial } from "../helpers/deepPartial.types";
import { namespace } from "../namespaceConfig";
import type { Item5e, ItemType } from "./item5e";

export interface Effect5e {
	id: string;
	flags: {
		[namespace.core.id]?: {
			type: ItemType.TemporaryItem;
			id: string;
		};
	};
}

export interface Actor5e {
	items: Item5e[];
	effects: Effect5e[];
	system: {
		currency: {
			gp: number;
			pp: number;
			ep: number;
			sp: number;
			cp: number;
		};
		details: {
			level: number;
		};
	};
	update: (data: DeepPartial<Actor5e>) => Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT
	createEmbeddedDocuments: (type: string, data: any) => Promise<Item5e[]>;
	deleteEmbeddedDocuments: (type: string, ids: string[]) => Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT
	setFlag: (module: string, key: string, data: any) => Promise<Actor5e>;
	// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT
	getFlag: (module: string, key: string) => undefined | any;
}
