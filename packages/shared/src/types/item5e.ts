import {namespace} from "../namespaceConfig";
import {Actor5e} from "./actor5e";

export type Type =
    | 'background'
    | 'class'
    | 'consumable'
    | 'container'
    | 'equipment'
    | 'feat'
    | 'loot'
    | 'race'
    | 'spell'
    | 'subclass'
    | 'tool'
    | 'weapon';

export enum ItemType {
    TemporaryItem = "TEMPORARY_ITEM",
    MagicItem = "MAGIC_ITEM",
}

export interface SubItem {
    type: ItemType.TemporaryItem;
    id: string;
}

export interface BaseItem {
    type: ItemType.MagicItem;
    base: string;
    primary: { identifier: string; data?: unknown }[];
    secondary: { identifier: string; data?: unknown }[];
    tertiary: { identifier: string; data?: unknown }[];
}

export interface Item5e<Flag = SubItem | BaseItem> {
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
            denomination: 'gp' | 'pp' | 'ep' | 'sp' | 'cp';
        };
        properties: string[];
        weight: number;
        rarity: string;
        attunement: 1 | 0;
        equipped: boolean;
        attuned: boolean;
        activities: object
    };
    flags: {
        [namespace.core.id]: Flag
    };
    actor: Actor5e;
    update: (data: any) => Promise<void>;
    delete: () => Promise<void>;
}
