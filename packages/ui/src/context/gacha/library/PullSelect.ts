import { Forge } from "@tme/library/src/forge/Forge";
import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Rarity } from "@tme/library/src/item/item.types";
import { makeAutoObservable } from "mobx";
import type { Gacha } from "./Gacha";
import { PullProcess } from "./PullProcess";

export type PullPhase = "summoning" | "selecting" | "revealing";

const rarityOrder: Rarity[] = [
	Rarity.Common,
	Rarity.Uncommon,
	Rarity.Rare,
	Rarity.VeryRare,
	Rarity.Legendary,
];

export class PullSelect {
	private gacha: Gacha;
	public isOpen: boolean = false;
	public phase: PullPhase = "summoning";
	public items: AbstractItem[] = [];
	public process: PullProcess = new PullProcess();

	constructor(gacha: Gacha) {
		makeAutoObservable(this);
		this.gacha = gacha;
	}

	public get isRevealing(): boolean {
		return this.phase === "revealing";
	}

	public get maxRarity(): Rarity {
		let max = Rarity.Common;
		for (const item of this.items) {
			if (rarityOrder.indexOf(item.rarity) > rarityOrder.indexOf(max)) {
				max = item.rarity;
			}
		}
		return max;
	}

	public onSummonComplete = (): void => {
		if (this.phase === "summoning") {
			this.phase = "selecting";
		}
	};

	public onSelectConfirm = (selected: AbstractItem[]) => {
		this.gacha.inventory.queueAwardItems(selected);
		this.phase = "revealing";
	};

	public onCompleteConfirm = async (): Promise<void> => {
		await this.gacha.inventory.flushQueue();
		this.isOpen = false;
	};

	public startProcess = (pullProcess: PullProcess) => {
		this.process = pullProcess;
		this.populateItems();
		this.phase = "summoning";
		this.isOpen = true;
	};

	private populateItems = (): void => {
		this.items = [];
		const count = this.process.revealAmount.getValue();
		for (let i = 0; i < count; i++) {
			this.items.push(
				Forge.getGachaAbstractItem({
					modifierLuck: this.process.floatLuck.getValue(),
					rarityLuck: this.process.rarityLuck.getValue(),
					equipmentWhitelist: this.process.equipmentWhitelist.getValue(),
					forcedRarity: undefined,
				}),
			);
		}
	};
}
