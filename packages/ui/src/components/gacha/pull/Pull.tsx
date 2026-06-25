import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useMemo, useRef, useState } from "react";
import { useGachaContext } from "../../../context/gacha/useGachaContext";
import styles from "./Pull.module.css";
import { PullItem } from "./PullItem";
import { PullItemPanel } from "./PullItemPanel";
import { SealButton } from "./SealButton";

export const Pull = observer(() => {
	const context = useGachaContext();
	const isSyncing = context.inventory.isSyncing;
	const isRevealing = context.pullSelect.isRevealing;
	const picks = context.pullSelect.process.pickAmount.getValue();

	const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
	const [inspectedItem, setInspectedItem] = useState<AbstractItem | null>(null);
	const visibility = context.getVisibility();
	const canInspect = visibility >= 4 || isRevealing;
	const panelRef = useRef<HTMLDivElement>(null);

	const handleSelect = (index: number): void => {
		if (isRevealing) {
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
		context.pullSelect.onSelectConfirm(
			selectedIndices.map((i) => context.pullSelect.items[i]),
		);
	};

	const sealLabel = useMemo((): string => {
		if (context.inventory.isSyncing) {
			return "Sealing…";
		}
		if (isRevealing) {
			return "Add to Inventory";
		}
		return "Seal Your Fate";
	}, [context.inventory.isSyncing, isRevealing]);

	return (
		<>
			<div className={styles.root}>
				<div
					className={styles.grid}
					onMouseLeave={() => setInspectedItem(null)}
					onWheel={(e) => {
						if (panelRef.current !== null && inspectedItem !== null) {
							panelRef.current.scrollBy({ top: e.deltaY, behavior: "smooth" });
						}
					}}
				>
					<AnimatePresence mode="popLayout">
						{context.pullSelect.items.map((item, index) => {
							const isSelected = selectedIndices.includes(index);
							if (isRevealing && !isSelected) {
								return null;
							}
							const isDisabled = !isRevealing && isExhausted && !isSelected;
							return (
								<motion.div
									key={index}
									layout
									exit={{ opacity: 0, scale: 0.7, y: 16 }}
									transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
									style={{ lineHeight: 0 }}
								>
									<button
										className={`${styles.itemWrapper} ${isSelected && !isRevealing ? styles.selected : ""} ${isDisabled ? styles.itemDisabled : ""} ${isRevealing ? styles.itemRevealing : ""}`}
										onClick={() => handleSelect(index)}
										onMouseEnter={() => {
											if (canInspect) {
												setInspectedItem(item);
											}
										}}
										disabled={isDisabled}
										type={"button"}
									>
										<PullItem
											item={item}
											visibility={isRevealing ? 4 : visibility}
											selected={isSelected && !isRevealing}
											delay={index * 0.07}
											revealed={isRevealing}
											revealDelay={0.35 + selectedIndices.indexOf(index) * 0.15}
										/>
									</button>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>

				<motion.div
					className={styles.hud}
					layout="position"
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				>
					{isRevealing ? (
						<span className={styles.hudLabel}>Your fate is sealed</span>
					) : (
						<>
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
						</>
					)}
				</motion.div>

				<SealButton
					disabled={isSyncing || (!isRevealing && selectedIndices.length === 0)}
					title={sealLabel}
					kanji={isRevealing ? "封印完了" : "封印せよ"}
					onClick={
						isRevealing ? context.pullSelect.onCompleteConfirm : handleConfirm
					}
				/>
			</div>
			<PullItemPanel ref={panelRef} item={canInspect ? inspectedItem : null} />
		</>
	);
});
