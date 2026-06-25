import { describe, expect, it } from "bun:test";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Rarity } from "@tme/library/src/item/item.types";
import { Gacha } from "./Gacha";
import { PullProcess } from "./PullProcess";
import { PullSelect } from "./PullSelect";

const itemWithRarity = (rarity: Rarity): AbstractItem => {
	const item = new AbstractItem();
	item.rarity = rarity;
	return item;
};

describe("PullSelect", () => {
	it("starts closed, in the summoning phase, and not revealing", () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());

		// ACT & ASSERT
		expect(select.phase).toBe("summoning");
		expect(select.isOpen).toBe(false);
		expect(select.isRevealing).toBe(false);
	});

	it("reports the lowest rarity (Common) when there are no items", () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());

		// ACT
		const max = select.maxRarity;

		// ASSERT
		expect(max).toBe(Rarity.Common);
	});

	it("reports the highest rarity present among the items", () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());
		select.items = [
			itemWithRarity(Rarity.Common),
			itemWithRarity(Rarity.Rare),
			itemWithRarity(Rarity.Uncommon),
		];

		// ACT
		const max = select.maxRarity;

		// ASSERT
		expect(max).toBe(Rarity.Rare);
	});

	it("treats Legendary as the top of the rarity order", () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());
		select.items = [
			itemWithRarity(Rarity.VeryRare),
			itemWithRarity(Rarity.Legendary),
		];

		// ACT
		const max = select.maxRarity;

		// ASSERT
		expect(max).toBe(Rarity.Legendary);
	});

	it("advances from summoning to selecting on summon completion", () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());

		// ACT
		select.onSummonComplete();

		// ASSERT
		expect(select.phase).toBe("selecting");
	});

	it("ignores summon completion once past the summoning phase", () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());
		select.onSelectConfirm([]); // -> revealing

		// ACT
		select.onSummonComplete();

		// ASSERT
		expect(select.phase).toBe("revealing");
	});

	it("moves to the revealing phase when a selection is confirmed", () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());

		// ACT
		select.onSelectConfirm([itemWithRarity(Rarity.Rare)]);

		// ASSERT
		expect(select.phase).toBe("revealing");
		expect(select.isRevealing).toBe(true);
	});

	it("opens and resets to summoning when a process starts", () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());
		select.phase = "revealing";
		// A zero-reveal process keeps populateItems from drawing any items.
		const process = new PullProcess();

		// ACT
		select.startProcess(process);

		// ASSERT
		expect(select.isOpen).toBe(true);
		expect(select.phase).toBe("summoning");
		expect(select.items).toHaveLength(0);
		expect(select.process).toBe(process);
	});

	it("closes the overlay when the reveal is completed", async () => {
		// ARRANGE
		const select = new PullSelect(new Gacha());
		select.isOpen = true;

		// ACT
		await select.onCompleteConfirm();

		// ASSERT
		expect(select.isOpen).toBe(false);
	});
});
