import type { JSX } from "react";
import styles from "./GachaIntroHeader.module.css";

export const GachaIntroHeader = (): JSX.Element => {
	return (
		<div className={styles.root}>
			<div className={styles.titleJp}>魔法の商店　祈願</div>
			<div className={styles.titleMain}>THE MAGIC EMPORIUM</div>
			<div className={styles.titleSub}>The Sacred Draw</div>
		</div>
	);
};
