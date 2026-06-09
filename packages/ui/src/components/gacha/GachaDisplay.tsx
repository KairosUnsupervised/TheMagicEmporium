import styles from "./GachaDisplay.module.css";
import {DrawButton} from "./footer/DrawButton";
import {GachaHeader} from "./header/GachaHeader";
import {StarSystem} from "./content/StarSystem";
import {Vignette} from "./content/Vignette";
import {PullOverlay} from "./pull/PullOverlay";
import {GachaImage, generateGachaImageUrl} from "@tme/library/src/misc/generateGachaImageUrl";

export const GachaDisplay = () => {

	return (
		<div className={styles.root}>
			<div
				className={styles.bgImage}
				style={{backgroundImage: `url(${generateGachaImageUrl(GachaImage.Background)})`}}
			/>
			<div className={styles.bgOverlay}/>
			<GachaHeader/>
			<StarSystem/>
			<div className={styles.footer}>
				<DrawButton/>
			</div>
			<Vignette/>
			<PullOverlay/>
		</div>
	);
};
