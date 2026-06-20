import type { Actor5e } from "@tme/shared/src/types/actor5e";
import {
	EnvelopeFlag,
	GachaItem5e,
	GachaItemType,
	WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { makeAutoObservable } from "mobx";
import { Inventory } from "./Inventory";
import { Orbiter } from "./Orbiter";
import { PullProcess } from "./PullProcess";
import { PullSelect } from "./PullSelect";
import { namespace } from "@tme/shared/src/namespaceConfig";

export class Gacha {
	public orbiter: Orbiter = new Orbiter();
	public inventory: Inventory = new Inventory(this);
	public pullProcess = new PullProcess();
	public pullSelect = new PullSelect(this);

	public isOpen: boolean = true;

	constructor() {
		makeAutoObservable(this);
	}

	public onInputUpdate = () => {
		this.pullProcess = new PullProcess();

		const operations = this.inventory.getAllOperations();

		operations.forEach((operation) => {
			this.pullProcess.applyOperation(operation);
		});

		this.orbiter.adjustOrbiters(
			this.pullProcess.pickAmount.getValue(),
			this.pullProcess.revealAmount.getValue(),
		);
	};

	public getVisibility = (): 0 | 1 | 2 | 3 | 4 => {
		if (!this.inventory.envelopeSelected) {
			return 4;
		}

		return Math.min(
			4,
			Math.max(0, Math.floor(this.pullProcess.visibilityLevel.getValue())),
		) as 0 | 1 | 2 | 3 | 4;
	};

	/**
	 * Returns a value between -1 and 1 for UI and not the actual raw luck values
	 */
	public getLuck = () => {
		const totalLuck =
			this.pullProcess.floatLuck.getValue() +
			this.pullProcess.rarityLuck.getValue();
		return Math.min(1, Math.max(-1, totalLuck * 0.25)); // Internally cap it at -4 and +4 combined luck
	};

	public onConfirm = async () => {
		await this.inventory.closeAll();
		this.pullSelect.startProcess(this.pullProcess);
		this.inventory.queueConsumeItem();
		this.onInputUpdate();
	};

	public setOpen = (actor?: Actor5e, initial?: GachaItem5e) => {
		this.inventory.dispose();
		this.inventory = new Inventory(this, actor);

		if (
			initial &&
			initial.flags[namespace.gacha.id].type === GachaItemType.Envelope
		) {
			if (
				this.inventory
					.getActorEnvelopes()
					.includes(initial as GachaItem5e<EnvelopeFlag>)
			) {
				this.inventory.setEnvelope(initial as GachaItem5e<EnvelopeFlag>);
			}
		}

		if (
			initial &&
			initial.flags[namespace.gacha.id].type === GachaItemType.Wish
		) {
			if (
				this.inventory
					.getActorWishes()
					.includes(initial as GachaItem5e<WishFlag>)
			) {
				this.inventory.setWish(0, initial as GachaItem5e<WishFlag>);
			}
		}
		this.isOpen = true;
	};

	public setClosed = () => {
		this.inventory.dispose();
		this.isOpen = false;
	};
}

export const gacha = new Gacha();
