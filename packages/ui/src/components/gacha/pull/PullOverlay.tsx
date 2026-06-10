import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import type { JSX } from "react";
import { useGachaContext } from "../../../context/gacha/useGachaContext";
import { Pull } from "./Pull";
import styles from "./PullOverlay.module.css";
import { PullSummon } from "./PullSummon";

export const PullOverlay = observer((): JSX.Element => {
	const context = useGachaContext();
	const isSummoning = context.pullSelect.phase === "summoning";
	const revealRarity = context.getVisibility() >= 3;

	return (
		<AnimatePresence>
			{context.pullSelect.isOpen && (
				<motion.div
					className={styles.backdrop}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.35, ease: "easeInOut" }}
				>
					<motion.div
						className={styles.content}
						initial={{ opacity: 0, scale: 0.94, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.94, y: 20 }}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					>
						<AnimatePresence mode="wait">
							{isSummoning ? (
								<motion.div
									key="summon"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0, scale: 1.06, filter: "brightness(1.6)" }}
									transition={{ duration: 0.28, ease: "easeOut" }}
								>
									<PullSummon
										rarity={context.pullSelect.maxRarity}
										revealRarity={revealRarity}
										onComplete={context.pullSelect.onSummonComplete}
									/>
								</motion.div>
							) : (
								<motion.div
									key="pull"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3, ease: "easeOut" }}
								>
									<Pull />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
});
