import type { JSX } from "react";
import { motion } from "framer-motion";
import { animationDelay } from "../../animationDelay";

const TRAIL_SWEEP_DEG = 260;

const toRad = (deg: number): number => (deg * Math.PI) / 180;

interface OrbitalPositionProps {
	x: number;
	y: number;
	id: string;
	index: number;
}

export const OrbitalPosition = (props: OrbitalPositionProps): JSX.Element => {
	const r = Math.sqrt(props.x * props.x + props.y * props.y);
	const aDeg = (Math.atan2(props.y, props.x) * 180) / Math.PI;

	const hx = (Math.cos(toRad(aDeg)) * r).toFixed(2);
	const hy = (Math.sin(toRad(aDeg)) * r).toFixed(2);
	const tx = (Math.cos(toRad(aDeg + TRAIL_SWEEP_DEG)) * r).toFixed(2);
	const ty = (Math.sin(toRad(aDeg + TRAIL_SWEEP_DEG)) * r).toFixed(2);

	const baseDelay = animationDelay.orbits + props.index * 0.3;

	return (
		<g>
			<defs>
				<linearGradient
					id={props.id}
					gradientUnits="userSpaceOnUse"
					x1={hx}
					y1={hy}
					x2={tx}
					y2={ty}
				>
					<stop offset="0%" stopColor="#d4a64a" stopOpacity="0.5" />
					<stop offset="70%" stopColor="#d4a64a" stopOpacity="0.1" />
					<stop offset="100%" stopColor="#d4a64a" stopOpacity="0.0" />
				</linearGradient>
			</defs>
			<motion.circle
				cx="0"
				cy="0"
				r={r}
				fill="none"
				stroke="#d4a64a"
				strokeWidth="0.25"
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{ pathLength: 1, opacity: 0.25 }}
				transition={{
					pathLength: { duration: 1.2, delay: baseDelay, ease: "easeOut" },
					opacity: { duration: 0.3, delay: baseDelay },
				}}
			/>
			<motion.path
				d={`M ${hx},${hy} A ${r.toFixed(2)},${r.toFixed(2)} 0 1 1 ${tx},${ty}`}
				fill="none"
				stroke={`url(#${props.id})`}
				strokeWidth="1.8"
				strokeLinecap="round"
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{ pathLength: 1, opacity: 1 }}
				transition={{
					pathLength: { duration: 2.0, delay: baseDelay + 0.2, ease: "easeOut" },
					opacity: { duration: 0.6, delay: baseDelay + 0.2 },
				}}
			/>
		</g>
	);
};
