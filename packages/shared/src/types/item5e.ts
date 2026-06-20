import type { DeepPartial } from "../helpers/deepPartial.types";
import { namespace } from "../namespaceConfig";
import type { Actor5e } from "./actor5e";

export type Type =
	| "background"
	| "class"
	| "consumable"
	| "container"
	| "equipment"
	| "feat"
	| "loot"
	| "race"
	| "spell"
	| "subclass"
	| "tool"
	| "weapon";

export enum ItemType {
	TemporaryItem = "TEMPORARY_ITEM",
	MagicItem = "MAGIC_ITEM",
}

export interface SubItem {
	type: ItemType.TemporaryItem;
	hash: string;
}

export interface BaseItem {
	type: ItemType.MagicItem;
	base: string;
	backgroundEligible: boolean;
	backgroundOverride: string | null;
	primary: { identifier: string, float: number }[];
	secondary: { identifier: string, float: number }[];
	tertiary: { identifier: string, float: number }[];
}

export interface Item5e<Flag = SubItem | BaseItem> {
	id: string;
	isOwner: boolean;
	name: string;
	type: Type;
	img: string;
	uuid: string;
	system: {
		quantity: number;
		container: string | null;
		description: {
			value: string;
			chat: string;
		};
		price: {
			value: number;
			denomination: "gp" | "pp" | "ep" | "sp" | "cp";
		};
		properties: string[];
		weight: {
			value: number;
		};
		rarity: string;
		attunement: 1 | 0;
		equipped: boolean;
		attuned: boolean;
		activities: object;
		damage?: {
			base: {
				// Amount of Dice
				number: number;
				// What dice size, e.g. 8 => D8
				denomination: number;
				// Damage Bonus
				bonus: number;
				// Damage Type e.g. bludgeoning / slashing
				types: string[];
			};
			versatile?: {
				number: number;
				denomination: number;
				bonus: number;
				types: string[];
			};
		};
		// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT to be defined
		type?: any;
		// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT to be defined
		armor?: any;
		// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT to be defined
		strength?: any;
		// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT to be defined
		actionType?: any;
		// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT to be defined
		activation?: any;
		// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT to be defined
		range?: any;
		// biome-ignore lint/suspicious/noExplicitAny: FoundryVTT to be defined
		ability?: any;
	};
	flags: {
		[namespace.core.id]: Flag;
	};
	actor: Actor5e;
	update: (data: DeepPartial<Item5e<Flag>>) => Promise<void>;
	delete: () => Promise<void>;
}
