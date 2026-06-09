import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import type { JSX } from "react";
import { useGachaContext } from "../../../../context/gacha/useGachaContext";
import { animationDelay } from "../../animationDelay";
import styles from "./Sun.module.css";

interface RayData {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	stroke: string;
	strokeWidth: number;
	opacity: number;
}

const RAYS: RayData[] = [
	{
		x1: 18,
		y1: 0,
		x2: 58,
		y2: 0,
		stroke: "#d4a64a",
		strokeWidth: 0.32,
		opacity: 1.0,
	},
	{
		x1: 13.79,
		y1: 11.57,
		x2: 44.43,
		y2: 37.28,
		stroke: "#d4a64a",
		strokeWidth: 0.28,
		opacity: 1.0,
	},
	{
		x1: 3.12,
		y1: 17.73,
		x2: 10.08,
		y2: 57.12,
		stroke: "#8a6a1f",
		strokeWidth: 0.22,
		opacity: 0.9,
	},
	{
		x1: -9,
		y1: 15.59,
		x2: -29,
		y2: 50.23,
		stroke: "#d4a64a",
		strokeWidth: 0.3,
		opacity: 1.0,
	},
	{
		x1: -16.91,
		y1: 6.16,
		x2: -54.52,
		y2: 19.84,
		stroke: "#c9a84c",
		strokeWidth: 0.2,
		opacity: 0.8,
	},
	{
		x1: -16.91,
		y1: -6.16,
		x2: -54.52,
		y2: -19.84,
		stroke: "#d4a64a",
		strokeWidth: 0.3,
		opacity: 1.0,
	},
	{
		x1: -9,
		y1: -15.59,
		x2: -29,
		y2: -50.23,
		stroke: "#d4a64a",
		strokeWidth: 0.28,
		opacity: 1.0,
	},
	{
		x1: 3.12,
		y1: -17.73,
		x2: 10.08,
		y2: -57.12,
		stroke: "#8a6a1f",
		strokeWidth: 0.22,
		opacity: 0.84,
	},
	{
		x1: 13.79,
		y1: -11.57,
		x2: 44.43,
		y2: -37.28,
		stroke: "#d4a64a",
		strokeWidth: 0.28,
		opacity: 1.0,
	},
	{
		x1: 16.91,
		y1: 6.16,
		x2: 35.71,
		y2: 13,
		stroke: "#d4a64a",
		strokeWidth: 0.2,
		opacity: 1.0,
	},
	{
		x1: 9,
		y1: 15.59,
		x2: 19,
		y2: 32.91,
		stroke: "#8a6a1f",
		strokeWidth: 0.14,
		opacity: 0.7,
	},
	{
		x1: -3.12,
		y1: 17.73,
		x2: -6.6,
		y2: 37.42,
		stroke: "#c9a84c",
		strokeWidth: 0.18,
		opacity: 0.96,
	},
	{
		x1: -13.79,
		y1: 11.57,
		x2: -29.13,
		y2: 24.43,
		stroke: "#8a6a1f",
		strokeWidth: 0.13,
		opacity: 0.6,
	},
	{
		x1: -18,
		y1: 0,
		x2: -38,
		y2: 0,
		stroke: "#d4a64a",
		strokeWidth: 0.2,
		opacity: 1.0,
	},
	{
		x1: -13.79,
		y1: -11.57,
		x2: -29.13,
		y2: -24.43,
		stroke: "#8a6a1f",
		strokeWidth: 0.13,
		opacity: 0.6,
	},
	{
		x1: -3.12,
		y1: -17.73,
		x2: -6.6,
		y2: -37.42,
		stroke: "#c9a84c",
		strokeWidth: 0.16,
		opacity: 0.84,
	},
	{
		x1: 9,
		y1: -15.59,
		x2: 19,
		y2: -32.91,
		stroke: "#8a6a1f",
		strokeWidth: 0.14,
		opacity: 0.64,
	},
	{
		x1: 16.91,
		y1: -6.16,
		x2: 35.71,
		y2: -13,
		stroke: "#d4a64a",
		strokeWidth: 0.2,
		opacity: 1.0,
	},
];

const tip = (start: number, end: number, factor: number): number =>
	start + (end - start) * factor;

export const Sunburst = observer((): JSX.Element => {
	const context = useGachaContext();
	const brightness = context.getLuck() * 0.5 + 0.5;

	return (
		<motion.div
			className={styles.sunburst}
			animate={{ opacity: brightness }}
			transition={{ duration: 0.4, ease: "linear" }}
		>
			<motion.svg
				viewBox="-64 -64 128 128"
				style={{ width: "100%", height: "100%" }}
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1, rotate: 360 }}
				transition={{
					scale: {
						type: "spring",
						stiffness: 260,
						damping: 20,
						mass: 0.5,
						duration: 8,
					},
					opacity: { duration: 2, delay: animationDelay.sunburst },
					rotate: { duration: 360 * 2, repeat: Infinity, ease: "linear" },
				}}
			>
				{RAYS.map((ray, i) => {
					const duration = 12 + (i % 6) * 2;
					const delay = (i / RAYS.length) * duration;
					const x2Dim = tip(ray.x1, ray.x2, 0.88);
					const y2Dim = tip(ray.y1, ray.y2, 0.88);
					const x2Bright = tip(ray.x1, ray.x2, 1.06);
					const y2Bright = tip(ray.y1, ray.y2, 1.06);

					return (
						<motion.line
							key={i}
							x1={ray.x1}
							y1={ray.y1}
							stroke={ray.stroke}
							strokeWidth={ray.strokeWidth}
							strokeLinecap="round"
							animate={{
								x2: [ray.x2, x2Dim, x2Bright, ray.x2],
								y2: [ray.y2, y2Dim, y2Bright, ray.y2],
								opacity: [
									ray.opacity,
									ray.opacity * 0.4,
									ray.opacity * 1.1,
									ray.opacity,
								],
							}}
							transition={{
								duration,
								delay,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					);
				})}
			</motion.svg>
		</motion.div>
	);
});
