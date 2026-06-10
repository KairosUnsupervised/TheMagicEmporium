import { AnimatePresence, motion } from "framer-motion";
import type { JSX } from "react";
import styles from "./SealButton.module.css";

interface SealButtonProps {
	disabled: boolean;
	title: string;
	kanji: string;
	onClick: () => void;
}

export const SealButton = (props: SealButtonProps): JSX.Element => {
	const isActive = !props.disabled;

	return (
		<motion.div
			className={`${styles.sealWrap} ${isActive ? styles.sealWrapActive : ""}`}
			layout="position"
			animate={{ opacity: isActive ? 1 : 0.85 }}
			transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
		>
			<button
				type="button"
				className={`${styles.sealBtn} ${isActive ? styles.sealActive : ""}`}
				onClick={props.onClick}
				disabled={props.disabled}
			>
				<div className={`${styles.sealCorner} ${styles.sealCornerTL}`} />
				<div className={`${styles.sealCorner} ${styles.sealCornerBR}`} />
				<div className={styles.sealKanji}>
					<AnimatePresence mode="wait">
						<motion.span
							key={props.kanji}
							style={{ display: "block" }}
							initial={{ opacity: 0, y: -3 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 3 }}
							transition={{ duration: 0.22, ease: "easeOut" }}
						>
							{props.kanji}
						</motion.span>
					</AnimatePresence>
				</div>
				<span className={styles.sealText}>
					<AnimatePresence mode="wait">
						<motion.span
							key={props.title}
							style={{ display: "block" }}
							initial={{ opacity: 0, y: 4 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -4 }}
							transition={{ duration: 0.22, ease: "easeOut" }}
						>
							{props.title}
						</motion.span>
					</AnimatePresence>
				</span>
				<div className={styles.sealDivider}>
					<div className={styles.sealDividerLine} />
					<span className={styles.sealDividerDiamond}>◆</span>
					<div className={styles.sealDividerLine} />
				</div>
			</button>
		</motion.div>
	);
};
