import {DeepPartial} from "../helpers/deepPartial.types";
import {namespace} from "../namespaceConfig";

export enum GachaItemType {
    Envelope = "ENVELOPE",
    Wish = "ITEM",
}

export interface EnvelopeFlag {
    type: GachaItemType.Envelope
}

export interface WishFlag {
    type: GachaItemType.Wish
    id: string
}

export interface GachaItem5e<Flag = EnvelopeFlag | WishFlag> {
    id: string
    img: string;
    name: string;
    system: {
        quantity: number;
    }
    flags: {
        [namespace.core.id]: Flag
    };
    update: (data: DeepPartial<GachaItem5e>) => Promise<void>;
    delete: () => Promise<void>;
}
