import type { JSX } from "react";
import { motion } from "framer-motion";
import { WishInput } from "../../input/WishInput";
import { animationDelay } from "../../animationDelay";
import styles from "./WishNode.module.css";

interface WishNodeProps {
	x: number;
	y: number;
	scale: number;
	label: string;
	index: number;
}

export const WishNode = (props: WishNodeProps): JSX.Element => {
	return (
		<div
			className={styles.root}
			style={{
				transform: `translate(calc(-50% + ${props.x}px), calc(-50% + ${props.y}px)) scale(${props.scale})`,
			}}
		>
			<motion.div
				className={styles.planetTag}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					delay: animationDelay.wishLabels + props.index * 0.3,
					duration: 0.4,
					ease: "easeOut",
				}}
			>
				{props.label}
			</motion.div>
			<motion.div
				initial={{ opacity: 0, scale: 0.85 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					delay: animationDelay.wishes + props.index * 0.3,
					duration: 0.4,
					ease: [0.34, 1.56, 0.64, 1],
				}}
			>
				<WishInput index={props.index} />
			</motion.div>
		</div>
	);
};
