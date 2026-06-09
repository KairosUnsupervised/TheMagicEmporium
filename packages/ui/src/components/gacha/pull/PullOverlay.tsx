import type { JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { useGachaContext } from "../../../context/gacha/useGachaContext";
import { Pull } from "./Pull";
import styles from "./PullOverlay.module.css";

export const PullOverlay = observer((): JSX.Element => {
	const context = useGachaContext();
	const { pullSelect } = context;

	const handleConfirm = (selected: AbstractItem[]): void => {
		pullSelect.close(selected);
	};

	return (
		<AnimatePresence>
			{pullSelect.isOpen && (
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
						<Pull
							items={pullSelect.items}
							picks={pullSelect.process.pickAmount.getValue()}
							visibility={context.getVisibility()}
							onConfirm={handleConfirm}
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
});
