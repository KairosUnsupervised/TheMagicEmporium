import {makeAutoObservable} from "mobx";
import {AllNumberOperations, EnvelopeFlag, GachaItem5e, WishFlag,} from "@tme/shared/src/types/GachaItem5e";
import {namespace} from "@tme/shared/src/namespaceConfig";
import {crimsonLuckFoldFixture} from "../../../fixtures/gacha/envelopes/CrimsonLuckFold";
import {blessingWishFixture} from "../../../fixtures/gacha/wishes/BlessingWish";
import {celestialWishFixture} from "../../../fixtures/gacha/wishes/CelestialWish";
import {festivalSleeveFixture} from "../../../fixtures/gacha/envelopes/FestivalSleeve";
import {goldenBlessingSealFixture} from "../../../fixtures/gacha/envelopes/GoldenBlessingSeal";
import {moongateOfferingFixture} from "../../../fixtures/gacha/envelopes/MoongateOffering";
import {silkRoadSealFixture} from "../../../fixtures/gacha/envelopes/SilkRoadSeal";
import {Gacha} from "./Gacha";

export type Envelope = GachaItem5e<EnvelopeFlag>;

export interface AvailableWish {
	item: GachaItem5e<WishFlag>;
	locked: boolean;
}

export class Inventory {
	private gacha: Gacha;
	public envelopeSelected: Envelope | null = null;
	public wishesSelected: (string | null)[] = [null, null, null, null];

	constructor(gacha: Gacha) {
		makeAutoObservable(this);
		this.gacha = gacha;
	}

	public envelopes: Envelope[] = [
		crimsonLuckFoldFixture,
		festivalSleeveFixture,
		goldenBlessingSealFixture,
		moongateOfferingFixture,
		silkRoadSealFixture,
	];

	// Only allow wishes with amount > 0 here! PROBLEM FOR LATER
	private wishes: GachaItem5e<WishFlag>[] = [
		blessingWishFixture,
		celestialWishFixture,
		celestialWishFixture,
	];

	public setEnvelope(envelope: Envelope | null): void {
		this.envelopeSelected = envelope;
		this.gacha.onInputUpdate()
	}

	public setWish = (
		index: number,
		item: GachaItem5e<WishFlag> | null,
	): void => {
		this.wishesSelected[index] = item
			? item.flags[namespace.gacha.id].id
			: null;
		this.gacha.onInputUpdate()
	};

	public getWish = (index: number): GachaItem5e<WishFlag> | null => {
		const id = this.wishesSelected[index];
		if (id === null) {
			return null;
		}
		return (
			this.wishes.find((item) => {
				if (item.flags[namespace.gacha.id].id === id) {
					return item.flags[namespace.gacha.id].id === id;
				}
				return false;
			}) ?? null
		);
	};

	public getAvailableWishes = (index: number): AvailableWish[] => {
		return this.wishes.map((wish) => ({
			item: wish,
			locked: this.wishesSelected.some(
				(id, slotIndex) =>
					id === wish.flags[namespace.gacha.id].id && slotIndex !== index,
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
