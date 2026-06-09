import { motion } from "framer-motion";
import type { JSX } from "react";
import { animationDelay } from "../../animationDelay";
import { EnvelopeInput } from "../../input/EnvelopeInput";
import { Orbit } from "../orbit/Orbit";
import { Circles } from "./Circles";
import { OrbitalPosition } from "./OrbitalPosition";
import styles from "./Sun.module.css";
import { Sunburst } from "./Sunburst";

export interface OrbitalCoord {
	readonly x: number;
	readonly y: number;
}

export interface SunProps {
	orbitalPositions?: readonly OrbitalCoord[];
}

export const Sun = (props: SunProps): JSX.Element => (
	<div className={styles.root}>
		<Circles />
		{props.orbitalPositions && (
			<svg
				aria-hidden="true"
				className={styles.orbits}
				viewBox="-500 -500 1000 1000"
			>
				{props.orbitalPositions.map((pos, i) => (
					<OrbitalPosition
						key={i}
						x={pos.x}
						y={pos.y}
						id={`tg${i}`}
						index={i}
					/>
				))}
			</svg>
		)}
		<Sunburst />
		<div className={styles.diamondsLayer}>
			<Orbit />
		</div>
		<div className={styles.center}>
			<motion.div
				initial={{ opacity: 0, scale: 0.85 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					delay: animationDelay.placeholder,
					duration: 0.7,
					ease: [0.34, 1.56, 0.64, 1],
				}}
			>
				<EnvelopeInput />
			</motion.div>
		</div>
	</div>
);
