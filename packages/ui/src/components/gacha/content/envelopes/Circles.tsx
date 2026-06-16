import { motion } from "framer-motion";
import type { JSX } from "react";
import { animationDelay } from "../../animationDelay";
import styles from "./Envelope.module.css";

const CIRCLES = [
	{ r: 240, opacity: 0.42, strokeWidth: 0.3 },
	{ r: 320, opacity: 0.35, strokeWidth: 0.3 },
	{ r: 400, opacity: 0.28, strokeWidth: 0.25 },
];

export const Circles = (): JSX.Element => (
	<svg
		className={styles.circles}
		viewBox="-500 -500 1000 1000"
		aria-hidden="true"
	>
		{CIRCLES.map((c, i) => (
			<motion.circle
				key={c.r}
				cx="0"
				cy="0"
				r={c.r}
				fill="none"
				stroke="#d4a64a"
				strokeWidth={c.strokeWidth}
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{ pathLength: 1, opacity: c.opacity }}
				transition={{
					pathLength: {
						duration: 1.5,
						delay: animationDelay.circles + i * 0.2,
						ease: "easeOut",
					},
					opacity: { duration: 0.4, delay: animationDelay.circles + i * 0.2 },
				}}
			/>
		))}
	</svg>
);
