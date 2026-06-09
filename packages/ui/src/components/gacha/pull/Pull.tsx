import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useGachaContext } from "../../../context/gacha/useGachaContext";
import styles from "./Pull.module.css";
import { PullItem } from "./PullItem";

export const Pull = observer(() => {
	const context = useGachaContext();
	const isSyncing = context.inventory.isSyncing;
	const picks = context.pullSelect.process.pickAmount.getValue();

	const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

	const handleSelect = (index: number): void => {

		if(isSyncing){
			return;
		}

		setSelectedIndices((prev) => {
			if (prev.includes(index)) {
				return prev.filter((i) => i !== index);
			}
			if (prev.length >= picks) {
				return prev;
			}
			return [...prev, index];
		});
	};

	const picksRemaining = picks - selectedIndices.length;
	const isExhausted = picksRemaining === 0;

	const handleConfirm = (): void => {
		if (selectedIndices.length === 0) {
			return;
		}
		context.pullSelect.onPullConfirm(
			selectedIndices.map((i) => context.pullSelect.items[i]),
		);
	};

	return (
		<div className={styles.root}>
			<div className={styles.grid}>
				{context.pullSelect.items.map((item, index) => {
					const isSelected = selectedIndices.includes(index);
					const isDisabled = isExhausted && !isSelected;
					return (
						<button
							key={index}
							className={`${styles.itemWrapper} ${isSelected ? styles.selected : ""} ${isDisabled ? styles.itemDisabled : ""}`}
							onClick={() => handleSelect(index)}
							disabled={isDisabled}
							type={"submit"}
						>
							<PullItem
								item={item}
								visibility={context.getVisibility()}
								selected={isSelected}
								delay={index * 0.07}
							/>
						</button>
					);
				})}
			</div>

			<div className={styles.hud}>
				<div className={styles.diamonds}>
					{Array.from({ length: picks }, (_, i) => (
						<span
							key={i}
							className={`${styles.diamond} ${i < selectedIndices.length ? styles.diamondFilled : styles.diamondHollow}`}
						>
							{i < selectedIndices.length ? "◆" : "◇"}
						</span>
					))}
				</div>
				<span className={styles.hudLabel}>
					Select up to {picks} items to keep
				</span>
			</div>

			<div
				className={`${styles.sealWrap} ${selectedIndices.length > 0 ? styles.sealWrapActive : ""}`}
			>
				<button
					type="button"
					className={`${styles.sealBtn} ${selectedIndices.length > 0 ? styles.sealActive : ""}`}
					onClick={handleConfirm}
					disabled={selectedIndices.length === 0 || isSyncing}
				>
					<div className={`${styles.sealCorner} ${styles.sealCornerTL}`} />
					<div className={`${styles.sealCorner} ${styles.sealCornerBR}`} />
					<div className={styles.sealKanji}>封印せよ</div>
					<span className={styles.sealText}>
						{isSyncing || !context.pullSelect.isOpen
							? "Sealing…"
							: "Seal Your Fate"}
					</span>
					<div className={styles.sealDivider}>
						<div className={styles.sealDividerLine} />
						<span className={styles.sealDividerDiamond}>◆</span>
						<div className={styles.sealDividerLine} />
					</div>
				</button>
			</div>
		</div>
	);
});
