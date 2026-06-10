import type { Rarity } from "@tme/library/src/item/item.types";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import styles from "./PullSummon.module.css";
import { goldRgb, rarityTraceRgb } from "./rarityColors";

interface PullSummonProps {
	rarity: Rarity;
	revealRarity: boolean;
	onComplete: () => void;
	forceCat?: boolean;
}

type SummonPhase = "stamping" | "sealed" | "bursting";

const STAMP_DURATION_MS = 1450;
const BURST_DURATION_MS = 1150;
const CAT_CHANCE = 0.05;

interface ParticleConfig {
	angle: number;
	distance: number;
	size: number;
	delay: number;
}

const particles: ParticleConfig[] = Array.from({ length: 12 }, (_, i) => {
	return {
		angle: (Math.PI * 2 * i) / 12 + (i % 3) * 0.18,
		distance: 120 + (i % 4) * 18,
		size: 6 + (i % 3) * 3,
		delay: (i % 5) * 0.03,
	};
});

const auraVariants: Variants = {
	stamping: {
		opacity: 0.3,
		scale: 0.9,
		transition: { duration: 0.8, ease: "easeOut" },
	},
	sealed: {
		opacity: [0.3, 0.55, 0.3],
		scale: [0.9, 1, 0.9],
		transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
	},
	bursting: {
		opacity: [0.55, 0.95, 0.35],
		scale: [1, 1.3, 1.45],
		transition: { duration: 1, times: [0, 0.6, 1], ease: "easeOut" },
	},
};

const wrapVariants: Variants = {
	stamping: { y: 0 },
	sealed: {
		y: [0, -5, 0],
		transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
	},
	bursting: { y: 0, transition: { duration: 0.2 } },
};

const envelopeVariants: Variants = {
	stamping: {
		y: 0,
		opacity: 1,
		scale: 1,
		filter: "brightness(1)",
		transition: {
			y: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
			opacity: { duration: 0.4 },
			scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
			filter: { duration: 0.6, ease: "easeOut" },
		},
	},
	sealed: { y: 0, opacity: 1, scale: 1, filter: "brightness(1)" },
	bursting: {
		x: [0, -3, 3, -2, 2, 0],
		y: 0,
		scale: [1, 1, 1.1],
		opacity: [1, 1, 0],
		filter: ["brightness(1)", "brightness(1.4)", "brightness(2.4)"],
		transition: {
			x: { duration: 0.45, ease: "easeInOut" },
			scale: { duration: 1, times: [0, 0.45, 1], ease: "easeOut" },
			opacity: { duration: 1, times: [0, 0.5, 1], ease: "easeOut" },
			filter: { duration: 1, times: [0, 0.45, 1], ease: "easeOut" },
		},
	},
};

const leakVariants: Variants = {
	stamping: { opacity: 0 },
	sealed: {
		opacity: [0.1, 0.3, 0.1],
		transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
	},
	bursting: { opacity: 0.95, transition: { duration: 0.4, ease: "easeIn" } },
};

const sealVariants: Variants = {
	stamping: {
		scale: [2.4, 0.92, 1],
		opacity: [0, 1, 1],
		transition: {
			delay: 0.7,
			duration: 0.45,
			times: [0, 0.75, 1],
			ease: "easeOut",
		},
	},
	sealed: {
		scale: [1, 1.04, 1],
		opacity: 1,
		transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
	},
	bursting: {
		scale: [1, 1.18],
		opacity: [1, 0],
		transition: { delay: 0.45, duration: 0.45, ease: "easeOut" },
	},
};

const sealFlashVariants: Variants = {
	stamping: {
		opacity: [0, 0.9, 0],
		transition: { delay: 0.95, duration: 0.4, times: [0, 0.25, 1] },
	},
	sealed: { opacity: 0 },
	bursting: { opacity: 0 },
};

const burstVariants: Variants = {
	stamping: { opacity: 0, scale: 0.5 },
	sealed: { opacity: 0, scale: 0.5 },
	bursting: {
		opacity: [0, 1, 0],
		scale: [0.5, 1.3, 1.6],
		transition: {
			delay: 0.45,
			duration: 0.5,
			times: [0, 0.35, 1],
			ease: "easeOut",
		},
	},
};

const hintVariants: Variants = {
	stamping: { opacity: 0 },
	sealed: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
	bursting: { opacity: 0, transition: { duration: 0.2 } },
};

const ringVariants = (index: number): Variants => {
	return {
		stamping: {
			scale: [0.4, 2.2],
			opacity: [0, 0.6, 0],
			transition: {
				delay: 0.95 + index * 0.15,
				duration: 0.7,
				ease: "easeOut",
			},
		},
		sealed: { scale: 0.4, opacity: 0, transition: { duration: 0 } },
		bursting: {
			scale: [0.4, 2.4],
			opacity: [0, 0.5, 0],
			transition: {
				delay: 0.45 + index * 0.12,
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};
};

const particleVariants = (particle: ParticleConfig): Variants => {
	return {
		stamping: { x: 0, y: 0, opacity: 0, scale: 0.4 },
		sealed: { x: 0, y: 0, opacity: 0, scale: 0.4 },
		bursting: {
			x: Math.cos(particle.angle) * particle.distance,
			y: Math.sin(particle.angle) * particle.distance,
			opacity: [0, 1, 0],
			scale: [0.4, 1, 0.6],
			transition: {
				delay: 0.47 + particle.delay,
				duration: 0.55,
				ease: "easeOut",
			},
		},
	};
};

export const PullSummon = (props: PullSummonProps): JSX.Element => {
	const rgb = props.revealRarity ? rarityTraceRgb[props.rarity] : goldRgb;
	const [phase, setPhase] = useState<SummonPhase>("stamping");
	const [isCat] = useState<boolean>(() => {
		if (props.forceCat !== undefined) {
			return props.forceCat;
		}
		return Math.random() < CAT_CHANCE;
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setPhase((current) => (current === "stamping" ? "sealed" : current));
		}, STAMP_DURATION_MS);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (phase !== "bursting") {
			return;
		}
		const timer = setTimeout(() => {
			props.onComplete();
		}, BURST_DURATION_MS);
		return () => clearTimeout(timer);
	}, [phase]);

	const handleClick = (): void => {
		setPhase((current) => (current === "bursting" ? current : "bursting"));
	};

	return (
		<div className={styles.root} onClick={handleClick}>
			<motion.div
				className={styles.aura}
				style={{
					background: `radial-gradient(circle, rgba(${rgb}, 0.3) 0%, rgba(${rgb}, 0.08) 45%, transparent 70%)`,
				}}
				initial={{ opacity: 0, scale: 0.7 }}
				animate={phase}
				variants={auraVariants}
			/>

			<motion.div
				className={styles.envelopeWrap}
				animate={phase}
				variants={wrapVariants}
			>
				<motion.div
					className={styles.envelope}
					initial={{
						y: 56,
						opacity: 0,
						scale: 0.92,
						filter: "brightness(0.6)",
					}}
					animate={phase}
					variants={envelopeVariants}
				>
					<div className={styles.innerBorder} />
					<svg
						className={styles.flap}
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<polyline
							points="0,0 50,100 100,0"
							fill="none"
							stroke="rgba(212, 166, 74, 0.45)"
							strokeWidth="1"
							vectorEffect="non-scaling-stroke"
						/>
					</svg>
					<motion.div
						className={styles.leak}
						style={{ boxShadow: `inset 0 0 30px rgba(${rgb}, 0.55)` }}
						initial={{ opacity: 0 }}
						animate={phase}
						variants={leakVariants}
					/>
				</motion.div>

				{isCat && (
					<motion.div
						className={styles.envelopeEars}
						style={{ transformOrigin: "80px 120px" }}
						initial={{
							y: 56,
							opacity: 0,
							scale: 0.92,
							filter: "brightness(0.6)",
						}}
						animate={phase}
						variants={envelopeVariants}
					>
						<svg
							className={styles.catSvg}
							viewBox="0 0 160 16"
							preserveAspectRatio="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<polyline
								points="22,16 31,1 45,16"
								fill="none"
								stroke="rgba(212, 166, 74, 0.55)"
								strokeWidth="1"
								strokeLinejoin="round"
								vectorEffect="non-scaling-stroke"
							/>
							<polyline
								points="115,16 129,1 138,16"
								fill="none"
								stroke="rgba(212, 166, 74, 0.55)"
								strokeWidth="1"
								strokeLinejoin="round"
								vectorEffect="non-scaling-stroke"
							/>
						</svg>
					</motion.div>
				)}

				<motion.div
					className={styles.seal}
					style={{
						borderColor: `rgba(${rgb}, 0.75)`,
						boxShadow: `0 0 18px rgba(${rgb}, 0.35), inset 0 0 12px rgba(${rgb}, 0.2)`,
					}}
					initial={{ scale: 2.4, opacity: 0 }}
					animate={phase}
					variants={sealVariants}
				>
					<span
						className={styles.sealKanji}
						style={{
							color: `rgba(${rgb}, 0.95)`,
							textShadow: `0 0 12px rgba(${rgb}, 0.6)`,
						}}
					>
						封
					</span>
					{isCat && (
						<svg
							className={styles.sealEars}
							viewBox="0 0 58 14"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<polyline
								points="12,12 17,1 25,7"
								fill="none"
								stroke={`rgba(${rgb}, 0.75)`}
								strokeWidth="1"
								strokeLinejoin="round"
							/>
							<polyline
								points="33,7 41,1 46,12"
								fill="none"
								stroke={`rgba(${rgb}, 0.75)`}
								strokeWidth="1"
								strokeLinejoin="round"
							/>
						</svg>
					)}
					{isCat && (
						<svg
							className={styles.sealWhiskers}
							viewBox="0 0 110 58"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<line
								x1="26"
								y1="24"
								x2="3"
								y2="18"
								stroke={`rgba(${rgb}, 0.55)`}
								strokeWidth="1"
								strokeLinecap="round"
							/>
							<line
								x1="25"
								y1="29"
								x2="0"
								y2="29"
								stroke={`rgba(${rgb}, 0.55)`}
								strokeWidth="1"
								strokeLinecap="round"
							/>
							<line
								x1="26"
								y1="34"
								x2="3"
								y2="40"
								stroke={`rgba(${rgb}, 0.55)`}
								strokeWidth="1"
								strokeLinecap="round"
							/>
							<line
								x1="84"
								y1="24"
								x2="107"
								y2="18"
								stroke={`rgba(${rgb}, 0.55)`}
								strokeWidth="1"
								strokeLinecap="round"
							/>
							<line
								x1="85"
								y1="29"
								x2="110"
								y2="29"
								stroke={`rgba(${rgb}, 0.55)`}
								strokeWidth="1"
								strokeLinecap="round"
							/>
							<line
								x1="84"
								y1="34"
								x2="107"
								y2="40"
								stroke={`rgba(${rgb}, 0.55)`}
								strokeWidth="1"
								strokeLinecap="round"
							/>
						</svg>
					)}
					<motion.div
						className={styles.sealFlash}
						style={{
							background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(${rgb}, 0.6) 100%)`,
						}}
						initial={{ opacity: 0 }}
						animate={phase}
						variants={sealFlashVariants}
					/>
				</motion.div>

				{[0, 1].map((i) => (
					<motion.div
						key={i}
						className={styles.ring}
						style={{
							borderColor: `rgba(${rgb}, 0.6)`,
							boxShadow: `0 0 12px rgba(${rgb}, 0.3)`,
						}}
						initial={{ scale: 0.4, opacity: 0 }}
						animate={phase}
						variants={ringVariants(i)}
					/>
				))}

				<motion.div
					className={styles.burst}
					style={{
						background: `radial-gradient(circle, rgba(${rgb}, 0.85) 0%, rgba(${rgb}, 0.25) 35%, transparent 65%)`,
					}}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={phase}
					variants={burstVariants}
				/>

				{particles.map((p, i) => (
					<motion.span
						key={i}
						className={styles.particle}
						style={{
							fontSize: p.size,
							color: `rgba(${rgb}, 0.95)`,
							textShadow: `0 0 6px rgba(${rgb}, 0.8)`,
						}}
						initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
						animate={phase}
						variants={particleVariants(p)}
					>
						◆
					</motion.span>
				))}
			</motion.div>

			<motion.div
				className={styles.hint}
				initial={{ opacity: 0 }}
				animate={phase}
				variants={hintVariants}
			>
				Break the seal
			</motion.div>
		</div>
	);
};
