import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Item as RealItem } from "@tme/library/src/item/Item";
import { namespace } from "@tme/shared/src/namespaceConfig";
import type { Actor5e } from "@tme/shared/src/types/actor5e";
import {
	type AllOperations,
	type EnvelopeFlag,
	type GachaItem5e,
	GachaItemType,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { makeAutoObservable, runInAction } from "mobx";
import { crimsonLuckFoldFixture } from "../../../fixtures/gacha/envelopes/CrimsonLuckFold";
import { festivalSleeveFixture } from "../../../fixtures/gacha/envelopes/FestivalSleeve";
import { goldenBlessingSealFixture } from "../../../fixtures/gacha/envelopes/GoldenBlessingSeal";
import { moongateOfferingFixture } from "../../../fixtures/gacha/envelopes/MoongateOffering";
import { silkRoadSealFixture } from "../../../fixtures/gacha/envelopes/SilkRoadSeal";
import { blessingWishFixture } from "../../../fixtures/gacha/wishes/BlessingWish";
import { celestialWishFixture } from "../../../fixtures/gacha/wishes/CelestialWish";
import { wishOfBlindnessFixture } from "../../../fixtures/gacha/wishes/WishOfBlindness";
import { wishOfEmbracementFixture } from "../../../fixtures/gacha/wishes/WishOfEmbracement";
import { wishOfFortuneFixture } from "../../../fixtures/gacha/wishes/WishOfFortune";
import { wishOfGreedFixture } from "../../../fixtures/gacha/wishes/WishOfGreed";
import { wishOfShatteringFixture } from "../../../fixtures/gacha/wishes/WishOfShattering";
import { wishOfTheBlade } from "../../../fixtures/gacha/wishes/WishOfTheBlade";
import type { Gacha } from "./Gacha";

export type Envelope = GachaItem5e<EnvelopeFlag>;

export interface AvailableWish {
	item: GachaItem5e<WishFlag>;
	locked: boolean;
}

export class Inventory {
	private gacha: Gacha;
	private readonly actor: Actor5e | null = null;

	/**
	 * Doing any sort of animation during foundry document updates causes them to massively lag <br/>
	 * We queue up all updates and push them during artificial downtime where no animation is running <br/>
	 * Currently there is no safeguard against abuse, the user can reload the page before confirming for free previews
	 */
	private foundryQueue: (() => Promise<unknown>)[] = [];
	public isSyncing: boolean = false;

	public envelopeSelected: Envelope | null = null;
	public isEnvelopeSelectOpen: boolean = false;

	public wishesSelected: (GachaItem5e<WishFlag> | null)[] = [
		null,
		null,
		null,
		null,
	];
	public isWishSelectOpen: boolean[] = [false, false, false, false];

	/**
	 * Foundry mutates item documents outside MobX, so observers reading
	 * item data (e.g. quantities) never re-render on their own. Item getters
	 * read this counter and Foundry's document hooks bump it, turning every
	 * item change into a MobX update.
	 */
	private itemsVersion: number = 0;
	private hookIds: { hook: string; id: number }[] = [];

	constructor(gacha: Gacha, actor?: Actor5e) {
		makeAutoObservable(this);
		this.gacha = gacha;
		this.actor = actor ?? null;
		this.registerFoundryHooks();
	}

	private registerFoundryHooks = (): void => {
		// No actor means fixture mode (Storybook), where Hooks doesn't exist
		if (!this.actor || typeof Hooks === "undefined") {
			return;
		}
		const actorId = this.actor.id;
		for (const hook of ["createItem", "updateItem", "deleteItem"]) {
			const id = Hooks.on(hook, (item: { actor?: { id: string } | null }) => {
				if (item.actor?.id === actorId) {
					this.invalidateItems();
				}
			});
			this.hookIds.push({ hook, id });
		}
	};

	public invalidateItems = (): void => {
		this.itemsVersion += 1;
	};

	public dispose = (): void => {
		for (const entry of this.hookIds) {
			Hooks.off(entry.hook, entry.id);
		}
		this.hookIds = [];
	};

	public getActorEnvelopes = (): GachaItem5e<EnvelopeFlag>[] => {
		// Subscribe observers to Foundry-driven item changes (see itemsVersion)
		void this.itemsVersion;
		if (!this.actor) {
			return [
				crimsonLuckFoldFixture,
				festivalSleeveFixture,
				goldenBlessingSealFixture,
				moongateOfferingFixture,
				silkRoadSealFixture,
			];
		}
		return this.actor.items.filter((item) => {
			if (item.system.quantity <= 0) {
				return false;
			}

			return (
				(item as unknown as GachaItem5e).flags[namespace.gacha.id]?.type ===
				GachaItemType.Envelope
			);
		}) as unknown as GachaItem5e<EnvelopeFlag>[];
	};

	public getActorWishes = (): GachaItem5e<WishFlag>[] => {
		// Subscribe observers to Foundry-driven item changes (see itemsVersion)
		void this.itemsVersion;
		if (!this.actor) {
			return [
				blessingWishFixture,
				celestialWishFixture,
				wishOfBlindnessFixture,
				wishOfEmbracementFixture,
				wishOfFortuneFixture,
				wishOfGreedFixture,
				wishOfShatteringFixture,
				wishOfTheBlade,
			];
		}
		return this.actor.items.filter((item) => {
			if (item.system.quantity <= 0) {
				return false;
			}

			return (
				(item as unknown as GachaItem5e).flags[namespace.gacha.id]?.type ===
				GachaItemType.Wish
			);
		}) as unknown as GachaItem5e<WishFlag>[];
	};

	public setEnvelope(envelope: Envelope | null): void {
		this.envelopeSelected = envelope;
		this.gacha.onInputUpdate();
	}

	public setWish = (
		index: number,
		item: GachaItem5e<WishFlag> | null,
	): void => {
		this.wishesSelected[index] = item;
		this.gacha.onInputUpdate();
	};

	public getWish = (index: number): GachaItem5e<WishFlag> | null => {
		return this.wishesSelected[index] ?? null;
	};

	public getAvailableWishes = (index: number): AvailableWish[] => {
		return this.getActorWishes().map((wish) => ({
			item: wish,
			locked: this.wishesSelected.some((selected, slotIndex) => {
				if (!selected || !wish) {
					return false;
				}

				return (
					selected.flags[namespace.gacha.id].id ===
						wish.flags[namespace.gacha.id].id && slotIndex !== index
				);
			}),
		}));
	};

	public getAllOperations = (): AllOperations[] => {
		const envelopeOps =
			this.envelopeSelected?.flags[namespace.gacha.id].operations ?? [];
		const wishOps = [0, 1, 2, 3].flatMap(
			(i) => this.getWish(i)?.flags[namespace.gacha.id].operations ?? [],
		);
		return [...envelopeOps, ...wishOps];
	};

	public queueConsumeItem = (): void => {
		if (!this.actor) {
			return;
		}

		const items = [...this.wishesSelected, this.envelopeSelected];
		const toUpdate: { _id: string; system: { quantity: number } }[] = [];
		const toDelete: string[] = [];

		for (const item of items) {
			if (!item) {
				continue;
			}
			if (item.system.quantity >= 2) {
				toUpdate.push({
					_id: item.id,
					system: { quantity: item.system.quantity - 1 },
				});
			} else {
				toDelete.push(item.id);
			}
		}

		runInAction(() => {
			if (
				this.envelopeSelected !== null &&
				toDelete.includes(this.envelopeSelected.id)
			) {
				this.envelopeSelected = null;
			}
			this.wishesSelected.forEach((wish, i) => {
				if (wish !== null && toDelete.includes(wish.id)) {
					this.wishesSelected[i] = null;
				}
			});
		});
		this.gacha.onInputUpdate();

		const actor = this.actor;
		if (toUpdate.length > 0) {
			this.foundryQueue.push(() =>
				actor.updateEmbeddedDocuments("Item", toUpdate),
			);
		}
		if (toDelete.length > 0) {
			this.foundryQueue.push(() =>
				actor.deleteEmbeddedDocuments("Item", toDelete),
			);
		}
	};

	public flushQueue = async (): Promise<void> => {
		return new Promise((resolve) => {
			if (this.foundryQueue.length === 0) {
				resolve();
			}
			runInAction(() => {
				// Changes trigger animations, so we wait before and after that
				this.isSyncing = true;
			});
			setTimeout(() => {
				Promise.all(this.foundryQueue.map((op) => op())).then(() => {
					runInAction(() => {
						this.foundryQueue = [];

						setTimeout(() => {
							runInAction(() => {
								this.isSyncing = false;
							});
							resolve();
						}, 600);
					});
				});
			}, 600);
		});
	};

	public closeAll = async (): Promise<void> => {
		const closingActions: (() => void)[] = [];

		if (this.isEnvelopeSelectOpen) {
			closingActions.push(() => {
				this.isEnvelopeSelectOpen = false;
			});
		}

		this.isWishSelectOpen.forEach((isOpen, index) => {
			if (isOpen) {
				closingActions.push(() => {
					this.isWishSelectOpen[index] = false;
				});
			}
		});

		if (closingActions.length === 0) {
			return;
		}

		const delay = (): Promise<void> =>
			new Promise((resolve) => setTimeout(resolve, 200));

		for (const action of closingActions.reverse()) {
			await delay();
			runInAction(action);
		}

		await delay();
	};

	public queueAwardItems = (items: AbstractItem[]): void => {
		if (!this.actor) {
			return;
		}

		const toCreate = items.map((item) => RealItem.create(item).export());
		const actor = this.actor;
		this.foundryQueue.push(() =>
			actor.createEmbeddedDocuments("Item", toCreate),
		);
	};
}
