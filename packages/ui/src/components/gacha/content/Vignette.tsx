import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import type { JSX } from "react";
import { useGachaContext } from "../../../context/gacha/useGachaContext";
import styles from "./Vignette.module.css";

export type VignetteStage = 0 | 1 | 2 | 3 | 4;

const stageOpacity: Record<VignetteStage, number> = {
	0: 1,
	1: 0.7,
	2: 0.45,
	3: 0.2,
	4: 0,
};

export const Vignette = observer((): JSX.Element => {
	const context = useGachaContext();

	return (
		<motion.div
			className={styles.root}
			animate={{ opacity: stageOpacity[context.getVisibility()] }}
			transition={{ duration: 0.6, ease: "easeInOut" }}
		/>
	);
});
