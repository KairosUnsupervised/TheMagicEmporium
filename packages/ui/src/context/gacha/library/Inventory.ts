import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Item as RealItem } from "@tme/library/src/item/Item";
import { namespace } from "@tme/shared/src/namespaceConfig";
import type { Actor5e } from "@tme/shared/src/types/actor5e";
import {
	AllNumberOperations,
	type AllOperations,
	type EnvelopeFlag,
	type GachaItem5e,
	GachaItemType,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { makeAutoObservable } from "mobx";
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

	public envelopeSelected: Envelope | null = null;
	public isEnvelopeSelectOpen: boolean = false;

	public wishesSelected: (GachaItem5e<WishFlag> | null)[] = [
		null,
		null,
		null,
		null,
	];
	public isWishSelectOpen: boolean[] = [false, false, false, false];

	constructor(gacha: Gacha, actor?: Actor5e) {
		makeAutoObservable(this);
		this.gacha = gacha;
		this.actor = actor;
	}

	public getActorEnvelopes = (): GachaItem5e<EnvelopeFlag>[] => {
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

	public consumeItems = async (): Promise<void> => {
		if (!this.actor) {
			return;
		}

		await Promise.all(
			[...this.wishesSelected, this.envelopeSelected].map(async (item) => {
				if (!item) {
					return;
				}

				if (item.system.quantity >= 2) {
					return item.update({
						system: { quantity: item.system.quantity - 1 },
					});
				}

				if (this.envelopeSelected === item) {
					this.setEnvelope(null);
					return item.delete();
				}

				if (this.wishesSelected.includes(item as GachaItem5e<WishFlag>)) {
					this.setWish(
						this.wishesSelected.indexOf(item as GachaItem5e<WishFlag>),
						null,
					);
				}

				return item.delete();
			}),
		);
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
			action();
		}

		await delay();
	};

	public awardItems = async (items: AbstractItem[]): Promise<void> => {
		if (!this.actor) {
			return;
		}

		const toCreate = items.map((item) => {
			return RealItem.create(item).export();
		});

		await this.actor.createEmbeddedDocuments("Item", toCreate);
		return;
	};
}
