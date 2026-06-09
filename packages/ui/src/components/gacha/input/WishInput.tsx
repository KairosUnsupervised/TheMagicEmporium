import type { JSX } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { useGachaContext } from "../../../context/gacha/useGachaContext";
import type { GachaItem5e, WishFlag } from "@tme/shared/src/types/GachaItem5e";
import type { AvailableWish } from "../../../context/gacha/library/Inventory";
import { Tooltip } from "./Tooltip";
import styles from "./EnvelopeInput.module.css";

const ORBIT_RADIUS = 160;
const SVG_HALF = ORBIT_RADIUS + 20;

const computeOrbitPosition = (
	index: number,
	total: number,
): { x: number; y: number } => {
	const angle = -Math.PI / 2 + ((2 * Math.PI) / total) * index;
	return {
		x: ORBIT_RADIUS * Math.cos(angle),
		y: ORBIT_RADIUS * Math.sin(angle),
	};
};

interface WishInputProps {
	index: number;
}

export const WishInput = observer((props: WishInputProps): JSX.Element => {

	const context = useGachaContext();
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [tileRef, animateTile] = useAnimate<HTMLDivElement>();

	const open = context.inventory.isWishSelectOpen[props.index]
	const selected = context.inventory.getWish(props.index);
	const all = context.inventory.getAvailableWishes(props.index);

	const hoveredWish =
		hoveredId !== null
			? (all.find((w) => w.item.id === hoveredId) ?? null)
			: null;
	const hoveredIndex =
		hoveredWish !== null
			? all.findIndex((w) => w.item.id === hoveredWish.item.id)
			: -1;
	const hoveredPos =
		hoveredIndex !== -1 ? computeOrbitPosition(hoveredIndex, all.length) : null;

	const handleTileClick = useCallback((): void => {
		context.inventory.isWishSelectOpen[props.index] = !context.inventory.isWishSelectOpen[props.index];
	}, [all.length]);

	const handleSelect = useCallback(
		(wish: GachaItem5e<WishFlag>): void => {
			context.inventory.setWish(props.index, wish);
			context.inventory.isWishSelectOpen[props.index] = false;
			animateTile(
				tileRef.current,
				{ scale: [1, 1.1, 1] },
				{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
			);
			animateTile(
				tileRef.current,
				{ filter: ["brightness(1)", "brightness(2)", "brightness(1)"] },
				{ duration: 0.5, times: [0, 0.15, 1], ease: "easeOut", delay: 0.1 },
			).then(() => {
				if (tileRef.current) {
					tileRef.current.style.transform = "";
					tileRef.current.style.filter = "";
				}
			});
		},
		[context.inventory, props.index, animateTile, tileRef],
	);

	const handleClose = useCallback((): void => {
		context.inventory.isWishSelectOpen[props.index] = false;
	}, []);

	return (
		<div className={`${styles.wrapper} ${open ? styles.wrapperOpen : ""}`}>
			<AnimatePresence>
				{selected && (
					<motion.button
						className={styles.clearBtn}
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							context.inventory.setWish(props.index, null);
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						✕
					</motion.button>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{open && (
					<motion.div
						className={styles.backdrop}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						onClick={handleClose}
					/>
				)}
			</AnimatePresence>

			<div className={styles.orbitContainer}>
				<AnimatePresence>
					{open && (
						<motion.svg
							className={styles.ringSvg}
							viewBox={`${-SVG_HALF} ${-SVG_HALF} ${SVG_HALF * 2} ${SVG_HALF * 2}`}
							width={SVG_HALF * 2}
							height={SVG_HALF * 2}
							style={{
								top: `-${SVG_HALF}px`,
								left: `-${SVG_HALF}px`,
							}}
						>
							<motion.circle
								cx={0}
								cy={0}
								r={ORBIT_RADIUS}
								fill="none"
								stroke="rgba(212, 166, 74, 0.4)"
								strokeWidth={1}
								transform="rotate(-90)"
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 1 }}
								exit={{ pathLength: 0, opacity: 0 }}
								transition={{ duration: 0.5, ease: "easeInOut" }}
							/>
						</motion.svg>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{open &&
						all.map((wish: AvailableWish, i) => {
							const { x, y } = computeOrbitPosition(i, all.length);
							const isSelected = wish.item.id === selected?.id;
							return (
								<motion.div
									key={wish.item.id}
									className={`${styles.orbitItem} ${isSelected ? styles.orbitItemSelected : ""} ${wish.locked ? styles.orbitItemDisabled : ""}`}
									initial={{ x, y, scale: 0, opacity: 0 }}
									animate={{ x, y, scale: 1, opacity: 1 }}
									exit={{
										x,
										y,
										scale: 0,
										opacity: 0,
										transition: {
											type: "spring",
											stiffness: 500,
											damping: 35,
											delay: (all.length - 1 - i) * 0.03,
										},
									}}
									transition={{
										type: "spring",
										stiffness: 360,
										damping: 28,
										mass: 0.7,
										delay: i * 0.06,
									}}
									whileHover={
										wish.locked
											? {}
											: {
													scale: 1.1,
													transition: {
														type: "spring",
														stiffness: 500,
														damping: 26,
													},
												}
									}
									onHoverStart={() => {
										if (!wish.locked) {
											setHoveredId(wish.item.id);
										}
									}}
									onHoverEnd={() => setHoveredId(null)}
									onClick={(e) => {
										e.stopPropagation();
										if (!wish.locked) {
											handleSelect(wish.item);
										}
									}}
								>
									<div className={styles.orbitThumb}>
										<img
											className={styles.orbitImage}
											src={wish.item.img}
											alt={wish.item.name}
										/>
										{wish.locked && (
											<div className={styles.lockOverlay}>
												<svg
													className={styles.lockIcon}
													viewBox="0 0 24 24"
													fill="currentColor"
													aria-hidden="true"
												>
													<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
												</svg>
											</div>
										)}
									</div>
									<span className={styles.orbitName}>{wish.item.name}</span>
								</motion.div>
							);
						})}
				</AnimatePresence>

				<AnimatePresence>
					{open && hoveredWish !== null && hoveredPos !== null && (
						<Tooltip
							key={`${hoveredWish.item.id}-tooltip`}
							name={hoveredWish.item.name}
							description={hoveredWish.item.system.description.value}
							x={hoveredPos.x + (hoveredPos.x / ORBIT_RADIUS) * 117}
							y={hoveredPos.y + (hoveredPos.y / ORBIT_RADIUS) * 117}
							scaleFactor={1.3}
						/>
					)}
				</AnimatePresence>
			</div>
			<motion.div
				ref={tileRef}
				className={`${styles.root} ${open ? styles.rootOpen : ""}`}
				onClick={handleTileClick}
				initial="rest"
				whileHover="hover"
				variants={{
					rest: { scale: 1 },
					hover: {
						scale: 1.05,
						transition: { type: "spring", stiffness: 350, damping: 28 },
					},
				}}
			>
				<motion.div
					className={styles.shimmer}
					variants={{
						rest: { x: "-100%" },
						hover: {
							x: "160%",
							transition: { duration: 0.6, ease: "easeOut" },
						},
					}}
				/>
				<div className={`${styles.corner} ${styles.cornerTL}`} />
				<div className={`${styles.corner} ${styles.cornerTR}`} />
				<div className={`${styles.corner} ${styles.cornerBL}`} />
				<div className={`${styles.corner} ${styles.cornerBR}`} />
				<AnimatePresence>
					{selected && (
						<motion.div
							key={selected.id}
							className={styles.selectedContent}
							exit={{ opacity: 0, scale: 1.06, filter: "blur(3px)" }}
							transition={{ duration: 0.28, ease: "easeIn" }}
						>
							<motion.img
								className={styles.selectedImage}
								src={selected.img}
								alt={selected.name}
								initial={{ opacity: 0 }}
								animate={{ opacity: 0.85 }}
								transition={{ duration: 0.35, ease: "easeOut" }}
							/>
							<div className={styles.selectedOverlay}>
								<span className={styles.selectedLabel}>{selected.name}</span>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				{!selected && (
					<div className={styles.iconWrap}>
						<span className={styles.icon}>✦</span>
					</div>
				)}
			</motion.div>
		</div>
	);
});
