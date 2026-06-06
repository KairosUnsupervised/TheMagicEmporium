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

	public add = (type: DiamondType, delay: number = 0): void => {
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

	public addBatch = (types: DiamondType[]): void => {
		types.forEach((type, i) => {
			this.add(type, i * 0.1);
		});
	};

	public clear = () => {
		this.all = [];
	};
}
