import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, type JSX } from "react";
import { ItemDisplay } from "../../item/ItemDisplay";
import styles from "./PullItemPanel.module.css";

interface PullItemPanelProps {
	item: AbstractItem | null;
}

export const PullItemPanel = forwardRef<HTMLDivElement, PullItemPanelProps>(
	(props, ref): JSX.Element => {
		return (
			<div className={styles.wrapper}>
				<AnimatePresence>
					{props.item !== null && (
						<motion.div
							ref={ref}
							className={styles.panel}
							initial={{ x: "100%", opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: "100%", opacity: 0 }}
							transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
						>
							<ItemDisplay item={props.item} hideFrame={true} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	},
);
