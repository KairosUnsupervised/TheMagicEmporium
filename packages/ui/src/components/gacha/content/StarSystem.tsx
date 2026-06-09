import type { JSX } from "react";
import styles from "./StarSystem.module.css";
import { Sun } from "./sun/Sun";
import { WishNode } from "./wishes/WishNode";

const STAR_DATA = Array.from({ length: 90 }, (_, i) => {
	const a = ((i * 2654435761) >>> 0) % 10000;
	const b = ((i * 1134903170) >>> 0) % 10000;
	const tier = i % 3;
	return {
		x: a / 100,
		y: b / 100,
		r: ([0.5, 1.0, 1.5] as const)[tier],
		opacity: ([0.2, 0.35, 0.5] as const)[tier],
	};
});

const WISH_POSITIONS = [
	{ x: 450, y: -120, scale: 0.72, label: "Tianlong" },
	{ x: 670, y: 50, scale: 0.68, label: "Fenghuang" },
	{ x: 890, y: -80, scale: 0.65, label: "Xuanwu" },
	{ x: 1110, y: 80, scale: 0.62, label: "Qilin" },
] as const;

const StarField = (): JSX.Element => (
	<svg
		aria-hidden="true"
		className={styles.starField}
		preserveAspectRatio="xMidYMid slice"
	>
		{STAR_DATA.map((s, i) => (
			<circle
				key={i}
				cx={`${s.x}%`}
				cy={`${s.y}%`}
				r={s.r}
				fill="#f3dca0"
				opacity={s.opacity}
			/>
		))}
	</svg>
);

export const StarSystem = () => {
	return (
		<div className={styles.root}>
			<StarField />
			<div className={styles.origin}>
				<div
					className={styles.node}
					style={{ transform: "translate(-50%, -50%)" }}
				>
					<Sun orbitalPositions={WISH_POSITIONS} />
				</div>
				{WISH_POSITIONS.map((p, i) => {
					return (
						<WishNode
							key={i}
							x={p.x}
							y={p.y}
							scale={p.scale}
							label={p.label}
							index={i}
						/>
					);
				})}
			</div>
		</div>
	);
};
