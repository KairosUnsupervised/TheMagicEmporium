import {DeepPartial} from "../helpers/deepPartial.types";
import {Item5e, ItemType} from "./item5e";
import {namespace} from "../namespaceConfig";

export interface Effect5e {
    flags: {
        [namespace.core.id]?: {
            type: ItemType.TemporaryItem
            // TODO SHOULD THIS BE REQUIRED ?
            id?: string;
        }
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
    createEmbeddedDocuments: (type: string, data: any) => Promise<Item5e[]>;
    setFlag: (module: string, key: string, data: any) => Promise<Actor5e>;
    getFlag: (module: string, key: string) => undefined | any;
}
