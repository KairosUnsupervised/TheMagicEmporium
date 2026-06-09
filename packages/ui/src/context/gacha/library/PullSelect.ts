import {makeAutoObservable} from "mobx";
import {AbstractItem} from "@tme/library/src/item/AbstractItem";
import {PullProcess} from "./PullProcess";
import {Forge} from "@tme/library/src/forge/Forge";
import type {Gacha} from "./Gacha";

export class PullSelect {
	private gacha: Gacha;
	public isOpen: boolean = false;
	public items: AbstractItem[] = [];
	public process: PullProcess = new PullProcess();

	constructor(gacha: Gacha) {
		makeAutoObservable(this);
		this.gacha = gacha;
	}

	public close = (selected: AbstractItem[]): void => {
		this.gacha.inventory.awardItems(selected);
		this.isOpen = false;
		this.items = [];
	};

	public startProcess = (pullProcess: PullProcess) => {
		console.log("Starting pull select process", pullProcess);
		this.process = pullProcess;
		this.populateItems();
		this.isOpen = true;
	};

	private populateItems = (): void => {
		this.items = [];
		const count = this.process.revealAmount.getValue();
		for (let i = 0; i < count; i++) {
			this.items.push(Forge.getGachaAbstractItem({
				modifierLuck: this.process.floatLuck.getValue(),
				rarityLuck: this.process.rarityLuck.getValue(),
				equipmentWhitelist: this.process.equipmentWhitelist.getValue(),
				forcedRarity: undefined,
			}));
		}
	};
}
