import {
	GachaImage,
	generateGachaImageUrl,
} from "@tme/library/src/misc/generateGachaImageUrl";
import { StarSystem } from "./content/StarSystem";
import { Vignette } from "./content/Vignette";
import { DrawButton } from "./footer/DrawButton";
import styles from "./GachaDisplay.module.css";
import { GachaHeader } from "./header/GachaHeader";
import { PullOverlay } from "./pull/PullOverlay";

export const GachaDisplay = () => {
	return (
		<div className={styles.root}>
			<div
				className={styles.bgImage}
				style={{
					backgroundImage: `url(${generateGachaImageUrl(GachaImage.Background)})`,
				}}
			/>
			<div className={styles.bgOverlay} />
			<GachaHeader />
			<StarSystem />
			<div className={styles.footer}>
				<DrawButton />
			</div>
			<Vignette />
			<PullOverlay />
		</div>
	);
};
