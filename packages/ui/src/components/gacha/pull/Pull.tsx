import { useState, type JSX } from "react";
import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import type { VignetteStage } from "../content/Vignette";
import { PullItem } from "./PullItem";
import styles from "./Pull.module.css";

interface PullProps {
	items: AbstractItem[];
	picks: number;
	visibility: VignetteStage;
	onConfirm: (selected: AbstractItem[]) => void;
}

export const Pull = (props: PullProps): JSX.Element => {
	const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

	const handleSelect = (index: number): void => {
		setSelectedIndices((prev) => {
			if (prev.includes(index)) {
				return prev.filter((i) => i !== index);
			}
			if (prev.length >= props.picks) {
				return prev;
			}
			return [...prev, index];
		});
	};

	const picksRemaining = props.picks - selectedIndices.length;
	const isExhausted = picksRemaining === 0;

	const handleConfirm = (): void => {
		if (selectedIndices.length === 0) {
			return;
		}
		props.onConfirm(selectedIndices.map((i) => props.items[i]));
	};

	return (
		<div className={styles.root}>
			<div className={styles.grid}>
				{props.items.map((item, index) => {
					const isSelected = selectedIndices.includes(index);
					const isDisabled = isExhausted && !isSelected;
					return (
						<button
							key={index}
							className={`${styles.itemWrapper} ${isSelected ? styles.selected : ""} ${isDisabled ? styles.itemDisabled : ""}`}
							onClick={() => handleSelect(index)}
							disabled={isDisabled}
						>
							<PullItem
								item={item}
								visibility={props.visibility}
								selected={isSelected}
								delay={index * 0.07}
							/>
						</button>
					);
				})}
			</div>

			<div className={styles.hud}>
				<div className={styles.diamonds}>
					{Array.from({ length: props.picks }, (_, i) => (
						<span
							key={i}
							className={`${styles.diamond} ${i < selectedIndices.length ? styles.diamondFilled : styles.diamondHollow}`}
						>
							{i < selectedIndices.length ? "◆" : "◇"}
						</span>
					))}
				</div>
				<span className={styles.hudLabel}>
					Select up to {props.picks} items to keep
				</span>
			</div>

			<div
				className={`${styles.sealWrap} ${selectedIndices.length > 0 ? styles.sealWrapActive : ""}`}
			>
				<button
					type="button"
					className={`${styles.sealBtn} ${selectedIndices.length > 0 ? styles.sealActive : ""}`}
					onClick={handleConfirm}
					disabled={selectedIndices.length === 0}
				>
					<div className={`${styles.sealCorner} ${styles.sealCornerTL}`} />
					<div className={`${styles.sealCorner} ${styles.sealCornerBR}`} />
					<div className={styles.sealKanji}>封印せよ</div>
					<span className={styles.sealText}>Seal Your Fate</span>
					<div className={styles.sealDivider}>
						<div className={styles.sealDividerLine} />
						<span className={styles.sealDividerDiamond}>◆</span>
						<div className={styles.sealDividerLine} />
					</div>
				</button>
			</div>
		</div>
	);
};
