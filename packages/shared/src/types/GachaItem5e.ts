import { DeepPartial } from "../helpers/deepPartial.types";
import { namespace } from "../namespaceConfig";
import { Actor5e } from "./actor5e";

export enum Field {
	RarityLuck = "RARITY_LUCK",
	FloatLuck = "FLOAT_LUCK",
	RevealAmount = "REVEAL_AMOUNT",
	PickAmount = "PICK_AMOUNT",
	VisibilityLevel = "VISIBILITY_LEVEL",
	EquipmentWhitelist = "EQUIPMENT_WHITELIST",
}

export enum NumberOperation {
	Set = "SET",
	Add = "ADD",
	Subtract = "SUBTRACT",
	Multiply = "MULTIPLY",
	Divide = "DIVIDE",
}

export enum LockOperation {
	Lock = "LOCK",
	Unlock = "UNLOCK",
}

export interface NumberOperations {
	field: Field;
	op: NumberOperation;
	value: number;
}

export interface LockOperations {
	field: Field;
	op: LockOperation;
}

export type AllNumberOperations = NumberOperations | LockOperations;

export enum ArrayOperation {
	Add = "ADD",
	Remove = "REMOVE",
	Set = "SET",
}

export interface ArrayOperations {
	field: Field;
	op: ArrayOperation;
	value: string[];
}

export type AllArrayOperations = ArrayOperations | LockOperations;
export type AllOperations = AllNumberOperations | AllArrayOperations;

export enum GachaItemType {
	Envelope = "ENVELOPE",
	Wish = "ITEM",
}

export interface EnvelopeFlag {
	type: GachaItemType.Envelope;
	operations: AllNumberOperations[];
}

export interface WishFlag {
	type: GachaItemType.Wish;
	id: string;
	operations: AllOperations[];
}

export interface GachaItem5e<Flag = EnvelopeFlag | WishFlag> {
	id: string;
	img: string;
	name: string;
	isOwner: boolean;
	system: {
		quantity: number;
		description: {
			value: string;
		};
	};
	flags: {
		[namespace.gacha.id]: Flag;
	};
	update: (data: DeepPartial<GachaItem5e>) => Promise<void>;
	delete: () => Promise<void>;
	actor?: Actor5e;
}
