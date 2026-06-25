import { describe, expect, it } from "bun:test";
import { DiamondType } from "../../../components/gacha/content/envelopes/Diamond";
import { Orbiter } from "./Orbiter";

const countOf = (orbiter: Orbiter, type: DiamondType): number => {
	return orbiter.all.filter((entry) => entry.type === type).length;
};

describe("Orbiter", () => {
	it("starts empty", () => {
		// ARRANGE
		const orbiter = new Orbiter();

		// ACT
		const all = orbiter.all;

		// ASSERT
		expect(all).toHaveLength(0);
	});

	it("creates the requested number of bright and dim orbiters", () => {
		// ARRANGE
		const orbiter = new Orbiter();

		// ACT
		// dim is the total, bright is the subset that is bright.
		orbiter.adjustOrbiters(2, 5);

		// ASSERT
		expect(countOf(orbiter, DiamondType.Bright)).toBe(2);
		expect(countOf(orbiter, DiamondType.Dim)).toBe(3);
		expect(orbiter.all).toHaveLength(5);
	});

	it("adds orbiters when the desired count grows", () => {
		// ARRANGE
		const orbiter = new Orbiter();
		orbiter.adjustOrbiters(1, 2);

		// ACT
		orbiter.adjustOrbiters(3, 4);

		// ASSERT
		expect(countOf(orbiter, DiamondType.Bright)).toBe(3);
		expect(countOf(orbiter, DiamondType.Dim)).toBe(1);
	});

	it("removes orbiters when the desired count shrinks", () => {
		// ARRANGE
		const orbiter = new Orbiter();
		orbiter.adjustOrbiters(4, 8);

		// ACT
		orbiter.adjustOrbiters(1, 2);

		// ASSERT
		expect(countOf(orbiter, DiamondType.Bright)).toBe(1);
		expect(countOf(orbiter, DiamondType.Dim)).toBe(1);
	});

	it("assigns a unique key and finite position to each orbiter", () => {
		// ARRANGE
		const orbiter = new Orbiter();

		// ACT
		orbiter.adjustOrbiters(3, 6);

		// ASSERT
		const keys = new Set(orbiter.all.map((entry) => entry.key));
		expect(keys.size).toBe(orbiter.all.length);
		for (const entry of orbiter.all) {
			expect(Number.isFinite(entry.x)).toBe(true);
			expect(Number.isFinite(entry.y)).toBe(true);
		}
	});

	it("clears all orbiters when adjusted to zero", () => {
		// ARRANGE
		const orbiter = new Orbiter();
		orbiter.adjustOrbiters(2, 4);

		// ACT
		orbiter.adjustOrbiters(0, 0);

		// ASSERT
		expect(orbiter.all).toHaveLength(0);
	});
});
