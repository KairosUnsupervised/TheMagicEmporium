import type { JSX } from "react";
import styles from "./GachaDisplay.module.css";
import { DrawButton } from "./footer/DrawButton";
import { GachaHeader } from "./header/GachaHeader";
import { StarSystem } from "./content/StarSystem";
import bg from "./content/background.jpg";
import { GachaContextProvider } from "../../context/gacha/GachaContextProvider";

export interface GachaDisplayProps {
	wishes: unknown[];
	hiddenRarity?: boolean;
	hiddenName?: boolean;
	hiddenType?: boolean;
	hiddenImage?: boolean;
}

export const GachaDisplay = (props: GachaDisplayProps): JSX.Element => {
	return (
		<GachaContextProvider>
			<div className={styles.root}>
				<div
					className={styles.bgImage}
					style={{ backgroundImage: `url(${bg})` }}
				/>
				<div className={styles.bgOverlay} />
				<GachaHeader />
				<StarSystem wishes={props.wishes} />
				<div className={styles.footer}>
					<DrawButton />
				</div>
			</div>
		</GachaContextProvider>
	);
};
