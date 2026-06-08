import { makeAutoObservable } from "mobx";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { PullProcess } from "./PullProcess";
import { commonFixture } from "../../../fixtures/items/commonFixture";
import { uncommonFixture } from "../../../fixtures/items/uncommonFixture";
import { rareFixture } from "../../../fixtures/items/rareFixture";
import { veryRareFixture } from "../../../fixtures/items/veryRareFixture";
import { legendaryModifierBackgroundFixture } from "../../../fixtures/items/legendaryModifierBackgroundFixture";
import {Forge} from "@tme/library/src/forge/Forge";
import {equipmentDetails} from "@tme/library/src/item/equipment/equipment.details";
import {Equipment} from "@tme/library/src/item/equipment/equipment.types";

const dummyPool: AbstractItem[] = [
	commonFixture,
	uncommonFixture,
	rareFixture,
	veryRareFixture,
	legendaryModifierBackgroundFixture,
];

const forge = new Forge()

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
			this.items.push(Forge.getGachaAbstractItem({
				modifierLuck: this.process.floatLuck.getValue(),
				rarityLuck: this.process.rarityLuck.getValue(),
				// TODO Equipment whitelist
				equipmentWhitelist: Object.keys(equipmentDetails) as Equipment[],
				forcedRarity: undefined,
			}));
		}
	};
}
