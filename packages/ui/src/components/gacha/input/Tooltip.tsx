import { motion } from "framer-motion";
import type { JSX } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
	name: string;
	description: string;
	x: number;
	y: number;
	scaleFactor?: number;
}

export const Tooltip = (props: TooltipProps): JSX.Element => {
	return (
		<motion.div
			className={styles.anchor}
			style={{ x: props.x, y: props.y }}
			initial={{ opacity: 0, scale: 0.88 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.88 }}
			transition={{ duration: 0.15 }}
		>
			<div
				className={styles.card}
				style={{
					transform: `translate(-50%, -50%) scale(${props.scaleFactor ?? 1})`,
				}}
			>
				<div className={`${styles.corner} ${styles.cornerTL}`} />
				<div className={`${styles.corner} ${styles.cornerTR}`} />
				<div className={`${styles.corner} ${styles.cornerBL}`} />
				<div className={`${styles.corner} ${styles.cornerBR}`} />
				<span className={styles.name}>{props.name}</span>
				<div className={styles.divider}>
					<div className={styles.dividerLine} />
					<div className={styles.dividerDiamond} />
					<div className={styles.dividerLine} />
				</div>
				<p className={styles.desc}>{props.description}</p>
			</div>
		</motion.div>
	);
};
