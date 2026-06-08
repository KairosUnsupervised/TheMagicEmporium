import { makeAutoObservable } from "mobx";
import {
	AllNumberOperations,
	EnvelopeFlag,
	GachaItem5e,
	WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { crimsonLuckFoldFixture } from "../../../fixtures/gacha/envelopes/CrimsonLuckFold";
import { blessingWishFixture } from "../../../fixtures/gacha/wishes/BlessingWish";
import { celestialWishFixture } from "../../../fixtures/gacha/wishes/CelestialWish";
import { wishOfBlindnessFixture } from "../../../fixtures/gacha/wishes/WishOfBlindness";
import { wishOfEmbracementFixture } from "../../../fixtures/gacha/wishes/WishOfEmbracement";
import { wishOfFortuneFixture } from "../../../fixtures/gacha/wishes/WishOfFortune";
import { wishOfGreedFixture } from "../../../fixtures/gacha/wishes/WishOfGreed";
import { wishOfShatteringFixture } from "../../../fixtures/gacha/wishes/WishOfShattering";
import { festivalSleeveFixture } from "../../../fixtures/gacha/envelopes/FestivalSleeve";
import { goldenBlessingSealFixture } from "../../../fixtures/gacha/envelopes/GoldenBlessingSeal";
import { moongateOfferingFixture } from "../../../fixtures/gacha/envelopes/MoongateOffering";
import { silkRoadSealFixture } from "../../../fixtures/gacha/envelopes/SilkRoadSeal";
import { Gacha } from "./Gacha";

export type Envelope = GachaItem5e<EnvelopeFlag>;

export interface AvailableWish {
	item: GachaItem5e<WishFlag>;
	locked: boolean;
}

export class Inventory {
	private gacha: Gacha;
	public envelopeSelected: Envelope | null = null;
	public wishesSelected: (GachaItem5e<WishFlag> | null)[] = [
		null,
		null,
		null,
		null,
	];

	constructor(gacha: Gacha) {
		makeAutoObservable(this);
		this.gacha = gacha;
	}

	// TODO Unresolved inventory issue: How to deal with zero amount stacks => onLoad inventory, filter out 0 amount stacks
	// TODO Unresolved inventory issue: How to deal with multiple stacks of the same item => onLoad inventory take first stack only
	public envelopes: Envelope[] = [
		crimsonLuckFoldFixture,
		festivalSleeveFixture,
		goldenBlessingSealFixture,
		moongateOfferingFixture,
		silkRoadSealFixture,
	];

	private wishes: GachaItem5e<WishFlag>[] = [
		blessingWishFixture,
		celestialWishFixture,
		wishOfBlindnessFixture,
		wishOfEmbracementFixture,
		wishOfFortuneFixture,
		wishOfGreedFixture,
		wishOfShatteringFixture,
	];

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
		return this.wishes.map((wish) => ({
			item: wish,
			locked: this.wishesSelected.some(
				(selected, slotIndex) => selected === wish && slotIndex !== index,
			),
		}));
	};

	public getAllOperations = (): AllNumberOperations[] => {
		const envelopeOps =
			this.envelopeSelected?.flags[namespace.gacha.id].operations ?? [];
		const wishOps = [0, 1, 2, 3].flatMap(
			(i) => this.getWish(i)?.flags[namespace.gacha.id].operations ?? [],
		);
		return [...envelopeOps, ...wishOps];
	};
}
