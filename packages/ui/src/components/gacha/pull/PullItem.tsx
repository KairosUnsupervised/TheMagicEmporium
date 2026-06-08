import type { JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Rarity } from "@tme/library/src/item/item.types";
import type { VignetteStage } from "../content/Vignette";
import styles from "./PullItem.module.css";
import placeholder from "./placeholder.jpg";

interface PullItemProps {
	item: AbstractItem;
	visibility: VignetteStage;
}

const rarityLabel: Record<Rarity, string> = {
	[Rarity.Common]: "Common",
	[Rarity.Uncommon]: "Uncommon",
	[Rarity.Rare]: "Rare",
	[Rarity.VeryRare]: "Very Rare",
	[Rarity.Legendary]: "Legendary",
};

const rarityStyle: Record<Rarity, string> = {
	[Rarity.Common]: styles.rarityCommon,
	[Rarity.Uncommon]: styles.rarityUncommon,
	[Rarity.Rare]: styles.rarityRare,
	[Rarity.VeryRare]: styles.rarityVeryRare,
	[Rarity.Legendary]: styles.rarityLegendary,
};

const rarityRootStyle: Record<Rarity, string> = {
	[Rarity.Common]: styles.rootCommon,
	[Rarity.Uncommon]: styles.rootUncommon,
	[Rarity.Rare]: styles.rootRare,
	[Rarity.VeryRare]: styles.rootVeryRare,
	[Rarity.Legendary]: styles.rootLegendary,
};

const formatBase = (base: string): string =>
	base
		.toLowerCase()
		.replace(/_/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());

export const PullItem = (props: PullItemProps): JSX.Element => {
	const background = placeholder; // TODO equipmentDetails[props.item.base].icon;
	const showImage = props.visibility >= 1 && background !== null;
	const showName = props.visibility >= 2;
	const showRarity = props.visibility >= 3;

	return (
		<div
			className={`${styles.root} ${showRarity ? rarityRootStyle[props.item.rarity] : ""}`}
		>
			<div className={`${styles.corner} ${styles.cornerTL}`} />
			<div className={`${styles.corner} ${styles.cornerTR}`} />
			<div className={`${styles.corner} ${styles.cornerBL}`} />
			<div className={`${styles.corner} ${styles.cornerBR}`} />

			<div className={styles.imageArea}>
				<AnimatePresence mode="wait">
					{showImage ? (
						<motion.img
							key="image"
							className={styles.image}
							src={background}
							alt={props.item.name}
							initial={{ opacity: 0, filter: "brightness(0)" }}
							animate={{ opacity: 1, filter: "brightness(1)" }}
							transition={{ duration: 0.6, ease: "easeOut" }}
						/>
					) : (
						<motion.div
							key="sealed"
							className={styles.sealedImage}
							initial={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4 }}
						>
							<span className={styles.sealedGlyph}>✦</span>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className={styles.divider} />

			<div className={styles.infoArea}>
				<AnimatePresence>
					{showName && (
						<motion.div
							key="detail"
							className={styles.detailRow}
							initial={{ opacity: 0, y: 4 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
						>
							<span className={styles.typeBadge}>
								{formatBase(props.item.base)}
							</span>
							<AnimatePresence mode="wait">
								{showRarity ? (
									<motion.span
										key="rarity-part"
										className={styles.rarityPart}
										initial={{ opacity: 0, x: -4 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.35, ease: "easeOut" }}
									>
										<span className={styles.diamond}>◆</span>
										<span
											className={`${styles.rarityBadge} ${rarityStyle[props.item.rarity]}`}
										>
											{rarityLabel[props.item.rarity]}
										</span>
									</motion.span>
								) : (
									<motion.span
										key="rarity-skeleton"
										className={styles.raritySkeleton}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</AnimatePresence>
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{showName && (
						<motion.div
							key="name"
							className={styles.nameRow}
							initial={{ opacity: 0, y: 5 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
						>
							<span className={styles.name}>
								{props.item.getNameWithoutRarity()}
							</span>
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{!showName && (
						<motion.div
							key="sealed-info"
							className={styles.sealedInfo}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};
