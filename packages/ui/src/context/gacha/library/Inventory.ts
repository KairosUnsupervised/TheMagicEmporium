import { makeAutoObservable } from "mobx";
import {
	EnvelopeFlag,
	GachaItem5e,
	WishFlag,
} from "@tme/shared/src/types/GachaItem5e";
import { crimsonLuckFoldFixture } from "../../../fixtures/gacha/envelopes/CrimsonLuckFold";
import { blessingWishFixture } from "../../../fixtures/gacha/wishes/BlessingWish";
import { celestialWishFixture } from "../../../fixtures/gacha/wishes/CelestialWish";
import { festivalSleeveFixture } from "../../../fixtures/gacha/envelopes/FestivalSleeve";
import { goldenBlessingSealFixture } from "../../../fixtures/gacha/envelopes/GoldenBlessingSeal";
import { moongateOfferingFixture } from "../../../fixtures/gacha/envelopes/MoongateOffering";
import { silkRoadSealFixture } from "../../../fixtures/gacha/envelopes/SilkRoadSeal";

export interface Envelope {
	item: GachaItem5e<EnvelopeFlag>;
}

export interface Wish {
	item: GachaItem5e<WishFlag>;
}

export class Inventory {
	public envelopeSelected: Envelope | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	public envelopes: Envelope[] = [
		{
			item: crimsonLuckFoldFixture,
		},
		{
			item: festivalSleeveFixture,
		},
		{
			item: goldenBlessingSealFixture,
		},
		{
			item: moongateOfferingFixture,
		},
		{
			item: silkRoadSealFixture,
		},
	];
	public wishes: Wish[] = [
		{
			item: blessingWishFixture,
		},
		{
			item: celestialWishFixture,
		},
	];

	public setEnvelope(envelope: Envelope | null) {
		this.envelopeSelected = envelope;
	}
}
