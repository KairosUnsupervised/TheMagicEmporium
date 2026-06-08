import { makeAutoObservable } from "mobx";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { PullProcess } from "./PullProcess";
import { commonFixture } from "../../../fixtures/items/commonFixture";
import { uncommonFixture } from "../../../fixtures/items/uncommonFixture";
import { rareFixture } from "../../../fixtures/items/rareFixture";
import { veryRareFixture } from "../../../fixtures/items/veryRareFixture";
import { legendaryModifierBackgroundFixture } from "../../../fixtures/items/legendaryModifierBackgroundFixture";

const dummyPool: AbstractItem[] = [
	commonFixture,
	uncommonFixture,
	rareFixture,
	veryRareFixture,
	legendaryModifierBackgroundFixture,
];

export class PullSelect {
	public isOpen: boolean = false;
	public items: AbstractItem[] = [];
	public process: PullProcess = new PullProcess();

	constructor() {
		makeAutoObservable(this);
	}

	public close = (): void => {
		this.isOpen = false;
		this.items = [];
	};

	public startProcess = (pullProcess: PullProcess) => {
		this.process = pullProcess;
		this.populateItems();
		this.isOpen = true;
	};

	private populateItems = (): void => {
		this.items = [];
		const count = this.process.revealAmount.getValue();
		for (let i = 0; i < count; i++) {
			const pick = dummyPool[Math.floor(Math.random() * dummyPool.length)];
			this.items.push(pick);
		}
	};
}
