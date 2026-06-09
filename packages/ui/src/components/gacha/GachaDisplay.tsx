import styles from "./GachaDisplay.module.css";
import {DrawButton} from "./footer/DrawButton";
import {GachaHeader} from "./header/GachaHeader";
import {StarSystem} from "./content/StarSystem";
import {Vignette} from "./content/Vignette";
import {PullOverlay} from "./pull/PullOverlay";
import {GachaImage, generateGachaImageUrl} from "@tme/library/src/misc/generateGachaImageUrl";
import {useGachaContext} from "../../context/gacha/useGachaContext";

export interface GachaDisplayProps {
	wishes: unknown[];
	hiddenRarity?: boolean;
	hiddenName?: boolean;
	hiddenType?: boolean;
	hiddenImage?: boolean;
}

export const GachaDisplay = (props: GachaDisplayProps) => {
	useGachaContext();

	return (
		<div className={styles.root}>
			<div
				className={styles.bgImage}
				style={{backgroundImage: `url(${generateGachaImageUrl(GachaImage.Background)})`}}
			/>
			<div className={styles.bgOverlay}/>
			<GachaHeader/>
			<StarSystem wishes={props.wishes}/>
			<div className={styles.footer}>
				<DrawButton/>
			</div>
			<Vignette/>
			<PullOverlay/>
		</div>
	);
};
