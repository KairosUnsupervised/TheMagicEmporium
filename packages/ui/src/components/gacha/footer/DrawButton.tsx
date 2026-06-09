import {AnimatePresence, motion} from "framer-motion";
import {observer} from "mobx-react-lite";
import type {JSX} from "react";
import {useState} from "react";
import {useGachaContext} from "../../../context/gacha/useGachaContext";
import {animationDelay} from "../animationDelay";
import styles from "./DrawButton.module.css";

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

export const DrawButton = observer((props: DrawButtonProps): JSX.Element => {
	const context = useGachaContext();
	const isEnabled = context.inventory.envelopeSelected && context.pullProcess.isPossible();
	const handleClick = props.onClick ?? context.onConfirm;

	const [label] = useState<string>(
		() => LABELS[Math.floor(Math.random() * LABELS.length)],
	);

	return (
		<motion.div
			className={styles.wrap}
			initial={{opacity: 0, y: 10}}
			animate={{opacity: 1, y: 0}}
			transition={{
				delay: animationDelay.drawButton,
				duration: 1.2,
				ease: "easeOut",
			}}
		>
			<motion.div
				animate={
					isEnabled
						? {
							scale: 1,
							filter: "grayscale(0) brightness(1) saturate(1)",
							opacity: 1,
						}
						:
						{
							scale: 0.97,
							filter: "grayscale(0.7) brightness(0.5) saturate(0.25)",
							opacity: [0.6, 0.42, 0.6],
						}
				}
				transition={
					!isEnabled
						? {
							scale: {duration: 0.45, ease: "easeOut"},
							filter: {duration: 0.55, ease: "easeOut"},
							opacity: {
								repeat: Number.POSITIVE_INFINITY,
								duration: 2.8,
								ease: "easeInOut",
							},
						}
						: {
							scale: {
								duration: 0.5,
								ease: [0.34, 1.56, 0.64, 1],
							},
							filter: {duration: 0.5, ease: "easeOut"},
							opacity: {duration: 0.35, ease: "easeOut"},
						}
				}
				style={{pointerEvents: isEnabled ? "auto" : "none"}}
			>
				<div
					className={styles.button}
					onClick={isEnabled ? handleClick : undefined}
				>
					<div className={styles.inner}>
						<AnimatePresence>
							{!isEnabled && (
								<motion.div
									className={styles.veil}
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									exit={{opacity: 0}}
									transition={{duration: 0.6, ease: "easeInOut"}}
								/>
							)}
						</AnimatePresence>
						<div className={`${styles.corner} ${styles.cornerTl}`}/>
						<div className={`${styles.corner} ${styles.cornerBr}`}/>
						<div className={styles.kanji}>神聖なる祈願</div>
						<div className={styles.label}>
							{label.split("\n").map((line, i) => (
								<span key={i}>
									{i > 0 && <br/>}
									{line}
								</span>
							))}
						</div>
						<div className={styles.divider}>
							<div className={styles.dividerLine}/>
							<div className={styles.dividerDiamond}/>
							<div className={styles.dividerLine}/>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
});
