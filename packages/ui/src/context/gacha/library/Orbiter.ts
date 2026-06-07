import { makeAutoObservable } from "mobx";
import { DiamondType } from "../../../components/gacha/content/orbit/Diamond";

interface OrbiterMeta {
	x: number;
	y: number;
	type: DiamondType;
	key: string;
	delay: number;
}

export class Orbiter {
	public all: OrbiterMeta[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	private add = (type: DiamondType, delay: number = 0): void => {
		const angle = Math.random() * 2 * Math.PI;
		const radius = Math.random() * 200 + 100;
		this.all.push({
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius,
			type,
			key: crypto.randomUUID(),
			delay,
		});
	};

	public adjustOrbiters = (bright: number, dim: number): void => {
		const brightAdded = this.adjustType(DiamondType.Bright, bright, 0);
		this.adjustType(DiamondType.Dim, dim, brightAdded);
	};

	private adjustType = (
		type: DiamondType,
		desired: number,
		offset: number,
	): number => {
		const current = this.all.filter((o) => o.type === type).length;
		if (desired > current) {
			const toAdd = desired - current;
			for (let i = 0; i < toAdd; i++) {
				this.add(type, (offset + i) * 0.25);
			}
			return toAdd;
		} else if (desired < current) {
			let toRemove = current - desired;
			this.all = this.all.filter((o) => {
				if (o.type === type && toRemove > 0) {
					toRemove--;
					return false;
				}
				return true;
			});
		}
		return 0;
	};
}
