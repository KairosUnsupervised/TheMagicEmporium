import type { JSX } from "react";
import styles from "./GachaHeader.module.css";

export interface GachaHeaderProps {}

export const GachaHeader = (_props: GachaHeaderProps): JSX.Element => {
	return (
		<header className={styles.header}>
			<div className={styles.decoRow}>
				<div className={styles.decoLine} />
				<div className={styles.decoDiamond} />
				<div className={styles.decoDiamondSmall} />
				<div className={styles.decoDiamond} />
				<div className={styles.decoLineRight} />
			</div>
			<div className={styles.titleJp}>魔法の商店　祈願</div>
			<div className={styles.titleMain}>THE MAGIC EMPORIUM</div>
			<div className={styles.titleSub}>The Sacred Draw — Season of the Arcane</div>
		</header>
	);
};
