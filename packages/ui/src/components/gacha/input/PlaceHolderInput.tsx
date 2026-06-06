import type { JSX } from "react";
import styles from "./PlaceHolderInput.module.css";

export interface PlaceHolderInputProps {}

export const PlaceHolderInput = (
	_props: PlaceHolderInputProps,
): JSX.Element => {
	return (
		<div className={styles.root}>
			<div className={`${styles.corner} ${styles.cornerTL}`} />
			<div className={`${styles.corner} ${styles.cornerTR}`} />
			<div className={`${styles.corner} ${styles.cornerBL}`} />
			<div className={`${styles.corner} ${styles.cornerBR}`} />
			<div className={styles.iconWrap}>
				<span className={styles.icon}>✦</span>
			</div>
		</div>
	);
};
