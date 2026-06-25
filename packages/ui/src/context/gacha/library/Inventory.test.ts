import { describe, expect, it } from "bun:test";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { Gacha } from "./Gacha";
import { Inventory } from "./Inventory";

const freshInventory = (): Inventory => {
	// In fixture mode (no actor) the inventory exposes the bundled envelope and
	// wish fixtures and skips all Foundry document writes.
	return new Inventory(new Gacha());
};

describe("Inventory (fixture mode)", () => {
	it("exposes the bundled envelope and wish fixtures", () => {
		// ARRANGE
		const inventory = freshInventory();

		// ACT
		const envelopes = inventory.getActorEnvelopes();
		const wishes = inventory.getActorWishes();

		// ASSERT
		expect(envelopes.length).toBeGreaterThan(0);
		expect(wishes.length).toBeGreaterThan(0);
	});

	it("stores and reads back a selected wish per slot", () => {
		// ARRANGE
		const inventory = freshInventory();
		const wish = inventory.getActorWishes()[0];
		const wishId = wish.flags[namespace.gacha.id].id;

		// ACT
		inventory.setWish(2, wish);

		// ASSERT
		// MobX proxies the stored object, so compare by identity field, not ref.
		expect(inventory.getWish(2)?.flags[namespace.gacha.id].id).toBe(wishId);
		expect(inventory.getWish(0)).toBeNull();
	});

	it("locks a wish in other slots once it is selected", () => {
		// ARRANGE
		const inventory = freshInventory();
		const wish = inventory.getActorWishes()[0];
		const wishId = wish.flags[namespace.gacha.id].id;

		// ACT
		inventory.setWish(0, wish);
		const sameSlot = inventory
			.getAvailableWishes(0)
			.find((entry) => entry.item.flags[namespace.gacha.id].id === wishId);
		const otherSlot = inventory
			.getAvailableWishes(1)
			.find((entry) => entry.item.flags[namespace.gacha.id].id === wishId);

		// ASSERT
		expect(sameSlot?.locked).toBe(false);
		expect(otherSlot?.locked).toBe(true);
	});

	it("aggregates operations from the selected envelope and wishes", () => {
		// ARRANGE
		const inventory = freshInventory();
		const envelope = inventory.getActorEnvelopes()[0];
		const envelopeOps = envelope.flags[namespace.gacha.id].operations;

		// ACT
		const before = inventory.getAllOperations();
		inventory.setEnvelope(envelope);
		const after = inventory.getAllOperations();

		// ASSERT
		expect(before).toEqual([]);
		expect(after).toEqual(envelopeOps);
	});

	it("clears the selected envelope when set to null", () => {
		// ARRANGE
		const inventory = freshInventory();
		inventory.setEnvelope(inventory.getActorEnvelopes()[0]);

		// ACT
		inventory.setEnvelope(null);

		// ASSERT
		expect(inventory.envelopeSelected).toBeNull();
	});

	it("does not throw when queueing consume/award without an actor", () => {
		// ARRANGE
		const inventory = freshInventory();
		inventory.setEnvelope(inventory.getActorEnvelopes()[0]);

		// ACT & ASSERT
		expect(() => inventory.queueConsumeItem()).not.toThrow();
		expect(() => inventory.queueAwardItems([])).not.toThrow();
	});

	it("resolves closeAll immediately when nothing is open", async () => {
		// ARRANGE
		const inventory = freshInventory();

		// ACT
		const result = inventory.closeAll();

		// ASSERT
		await expect(result).resolves.toBeUndefined();
	});
});
