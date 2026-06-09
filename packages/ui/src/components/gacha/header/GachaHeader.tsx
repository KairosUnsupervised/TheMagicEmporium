import type { JSX } from "react";
import styles from "./GachaHeader.module.css";
import {CloseButton} from "./CloseButton";

export const GachaHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.main}>
				<div className={styles.decoRow}>
					<div className={styles.decoLine} />
					<div className={styles.decoDiamond} />
					<div className={styles.decoDiamondSmall} />
					<div className={styles.decoDiamond} />
					<div className={styles.decoLineRight} />
				</div>
				<div className={styles.titleJp}>魔法の商店　祈願</div>
				<div className={styles.titleMain}>THE MAGIC EMPORIUM</div>
				<div className={styles.titleSub}>The Sacred Draw</div>
			</div>
			<div className={styles.close}>
				<CloseButton onClick={() => {}} disabled={false}/>
			</div>
		</header>
	);
};
