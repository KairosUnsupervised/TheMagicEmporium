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
	selected?: boolean;
	delay?: number;
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

const rarityTraceRgb: Record<Rarity, string> = {
	[Rarity.Common]: "180, 180, 180",
	[Rarity.Uncommon]: "80, 200, 110",
	[Rarity.Rare]: "90, 150, 240",
	[Rarity.VeryRare]: "170, 100, 240",
	[Rarity.Legendary]: "212, 166, 74",
};

const goldRgb = "212, 166, 74";

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
	const delay = props.delay ?? 0;

	const traceRgb = showRarity ? rarityTraceRgb[props.item.rarity] : goldRgb;
	const glowStroke = `rgba(${traceRgb}, 0.4)`;
	const crispStroke = `rgba(${traceRgb}, 0.9)`;

	const tracePath =
		"M 0 0 L 100 0 L 100 93.5 L 90.8 100 L 9.2 100 L 0 93.5 L 0 0";

	return (
		<motion.div
			style={{ display: "inline-block", lineHeight: 0 }}
			initial={{ opacity: 0, scale: 0.7, y: -24 }}
			animate={{
				opacity: 1,
				scale: 1,
				y: 0,
				filter: ["brightness(0)", "brightness(2.4)", "brightness(1)"],
			}}
			transition={{
				opacity: { duration: 0.18, delay },
				scale: {
					type: "spring",
					damping: 11,
					stiffness: 170,
					mass: 0.85,
					delay,
				},
				y: {
					type: "spring",
					damping: 14,
					stiffness: 200,
					delay,
				},
				filter: {
					duration: 0.6,
					times: [0, 0.22, 1],
					ease: "easeOut",
					delay,
				},
			}}
		>
			<div
				className={`${styles.root} ${showRarity ? rarityRootStyle[props.item.rarity] : ""}`}
			>
				<div className={`${styles.corner} ${styles.cornerTL}`} />
				<div className={`${styles.corner} ${styles.cornerTR}`} />
				<div className={`${styles.corner} ${styles.cornerBL}`} />
				<div className={`${styles.corner} ${styles.cornerBR}`} />

				<motion.svg
					className={styles.borderTrace}
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
					initial={{ opacity: 0 }}
					animate={{ opacity: props.selected ? 1 : 0 }}
					transition={{ duration: 0.18, ease: "easeOut" }}
				>
					<motion.path
						d={tracePath}
						fill="none"
						strokeWidth="6"
						vectorEffect="non-scaling-stroke"
						style={{ filter: "blur(2px)" }}
						animate={{ stroke: glowStroke }}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					/>
					<motion.path
						d={tracePath}
						fill="none"
						strokeWidth="1"
						vectorEffect="non-scaling-stroke"
						animate={{ stroke: crispStroke }}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					/>
				</motion.svg>

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

				<div className={styles.selectionStrip}>
					<AnimatePresence mode="wait">
						{props.selected ? (
							<motion.span
								key="filled"
								className={`${styles.selectionDiamond} ${styles.selectionDiamondFilled}`}
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5 }}
								transition={{ duration: 0.1, ease: "easeOut" }}
							>
								◆
							</motion.span>
						) : (
							<motion.span
								key="hollow"
								className={`${styles.selectionDiamond} ${styles.selectionDiamondHollow}`}
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5 }}
								transition={{ duration: 0.1, ease: "easeOut" }}
							>
								◇
							</motion.span>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};
