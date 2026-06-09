import type { JSX } from "react";
import { motion } from "framer-motion";
import styles from "./CloseButton.module.css";

interface CloseButtonProps {
	onClick: () => void;
	disabled?: boolean;
}

export const CloseButton = (props: CloseButtonProps): JSX.Element => {
	return (
		<motion.button
			className={styles.root}
			onClick={props.onClick}
			disabled={props.disabled}
			whileHover={props.disabled ? undefined : "hover"}
			whileTap={props.disabled ? undefined : "tap"}
			variants={{
				hover: { scale: 1.07 },
				tap: { scale: 0.92 },
			}}
			transition={{ type: "spring", damping: 14, stiffness: 220 }}
		>
			<div className={`${styles.corner} ${styles.cornerTL}`} />
			<div className={`${styles.corner} ${styles.cornerTR}`} />
			<div className={`${styles.corner} ${styles.cornerBL}`} />
			<div className={`${styles.corner} ${styles.cornerBR}`} />

			<svg
				className={styles.icon}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<line x1="5.5" y1="5.5" x2="14.5" y2="14.5" strokeLinecap="round" />
				<line x1="14.5" y1="5.5" x2="5.5" y2="14.5" strokeLinecap="round" />
			</svg>
		</motion.button>
	);
};
