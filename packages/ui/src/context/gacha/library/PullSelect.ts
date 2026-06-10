import { Forge } from "@tme/library/src/forge/Forge";
import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { makeAutoObservable } from "mobx";
import type { Gacha } from "./Gacha";
import { PullProcess } from "./PullProcess";

export class PullSelect {
	private gacha: Gacha;
	public isOpen: boolean = false;
	public isRevealing: boolean = false;
	public items: AbstractItem[] = [];
	public process: PullProcess = new PullProcess();

	constructor(gacha: Gacha) {
		makeAutoObservable(this);
		this.gacha = gacha;
	}

	public onSelectConfirm = (selected: AbstractItem[]) => {
		this.gacha.inventory.queueAwardItems(selected);
		this.isRevealing = true;
	};

	public onCompleteConfirm = async (): Promise<void> => {
		await this.gacha.inventory.flushQueue();
		this.isOpen = false;
	};

	public startProcess = (pullProcess: PullProcess) => {
		console.log("Starting pull select process", pullProcess);
		this.process = pullProcess;
		this.populateItems();
		this.isRevealing = false;
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
