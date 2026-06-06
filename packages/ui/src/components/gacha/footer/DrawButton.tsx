import type { JSX } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./DrawButton.module.css";
import { animationDelay } from "../animationDelay";

const LABELS = [
	"SURRENDER YOUR\nWISHES\nTO THE STARS",
	"OFFER YOUR\nPRAYER",
	"WHISPER YOUR\nPRAYER",
	"LAY YOUR\nOFFERING",
	"MAKE YOUR\nOFFERING",
	"GIVE UNTO\nTHE STARS",
	"CAST YOUR\nWISH",
	"BECKON\nTHE STARS",
	"SEEK YOUR\nFORTUNE",
] as const;

export interface DrawButtonProps {
	onClick?: () => void;
}

export const DrawButton = (props: DrawButtonProps): JSX.Element => {
	const [label] = useState<string>(
		() => LABELS[Math.floor(Math.random() * LABELS.length)],
	);

	return (
		<motion.div
			className={styles.wrap}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				delay: animationDelay.drawButton,
				duration: 1.2,
				ease: "easeOut",
			}}
		>
			<div className={styles.button} onClick={props.onClick}>
				<div className={styles.inner}>
					<div className={`${styles.corner} ${styles.cornerTl}`} />
					<div className={`${styles.corner} ${styles.cornerBr}`} />
					<div className={styles.kanji}>神聖なる祈願</div>
					<div className={styles.label}>
						{label.split("\n").map((line, i) => (
							<span key={i}>
								{i > 0 && <br />}
								{line}
							</span>
						))}
					</div>
					<div className={styles.divider}>
						<div className={styles.dividerLine} />
						<div className={styles.dividerDiamond} />
						<div className={styles.dividerLine} />
					</div>
				</div>
			</div>
		</motion.div>
	);
};
