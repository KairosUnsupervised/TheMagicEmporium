import { AnimatePresence, motion, useAnimate } from "framer-motion";
import type { JSX } from "react";
import { useCallback, useState } from "react";
import styles from "./PlaceHolderInput.module.css";

export interface GachaItem {
	id: string;
	name: string;
	image: string;
	disabled?: boolean;
}

export interface PlaceHolderInputProps {
	items?: GachaItem[];
	selectedId?: string | null;
	onSelect?: (id: string) => void;
	onClear?: () => void;
}

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

export const PlaceHolderInput = (props: PlaceHolderInputProps): JSX.Element => {
	const [open, setOpen] = useState(false);
	const items = props.items ?? [];
	const selected = items.find((item) => item.id === props.selectedId) ?? null;
	const [tileRef, animateTile] = useAnimate<HTMLDivElement>();

	const handleTileClick = useCallback((): void => {
		if (items.length > 0) {
			setOpen((prev) => !prev);
		}
	}, [items.length]);

	const handleSelect = useCallback(
		(id: string): void => {
			props.onSelect?.(id);
			setOpen(false);
			animateTile(
				tileRef.current,
				{ scale: [1, 1.1, 1] },
				{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
			);
			animateTile(
				tileRef.current,
				{ filter: ["brightness(1)", "brightness(2)", "brightness(1)"] },
				{ duration: 0.5, times: [0, 0.15, 1], ease: "easeOut", delay: 0.1 },
			);
		},
		[props.onSelect, animateTile, tileRef],
	);

	const handleClose = useCallback((): void => {
		setOpen(false);
	}, []);

	return (
		<div className={`${styles.wrapper} ${open ? styles.wrapperOpen : ""}`}>
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
						items.map((item, i) => {
							const { x, y } = computeOrbitPosition(i, items.length);
							const isSelected = item.id === props.selectedId;
							return (
								<motion.div
									key={item.id}
									className={`${styles.orbitItem} ${isSelected ? styles.orbitItemSelected : ""} ${item.disabled ? styles.orbitItemDisabled : ""}`}
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
											delay: (items.length - 1 - i) * 0.03,
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
										item.disabled
											? undefined
											: {
													scale: 1.1,
													transition: {
														type: "spring",
														stiffness: 500,
														damping: 26,
													},
												}
									}
									onClick={(e) => {
										e.stopPropagation();
										if (!item.disabled) {
											handleSelect(item.id);
										}
									}}
								>
									<div className={styles.orbitThumb}>
										<img
											className={styles.orbitImage}
											src={item.image}
											alt={item.name}
										/>
										{item.disabled && (
											<div className={styles.lockOverlay}>
												<svg
													className={styles.lockIcon}
													viewBox="0 0 24 24"
													fill="currentColor"
													aria-hidden="true"
												>
													<path d="M18 11h-1V7A5 5 0 0 0 7 7v4H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-6 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-6H9V7a3 3 0 0 1 6 0v4z" />
												</svg>
											</div>
										)}
									</div>
									<span className={styles.orbitName}>{item.name}</span>
								</motion.div>
							);
						})}
				</AnimatePresence>
			</div>

			<div
				ref={tileRef}
				className={`${styles.root} ${open ? styles.rootOpen : ""}`}
				onClick={handleTileClick}
			>
				<div className={`${styles.corner} ${styles.cornerTL}`} />
				<div className={`${styles.corner} ${styles.cornerTR}`} />
				<div className={`${styles.corner} ${styles.cornerBL}`} />
				<div className={`${styles.corner} ${styles.cornerBR}`} />

				{selected && props.onClear && (
					<button
						className={styles.clearBtn}
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							props.onClear?.();
						}}
					>
						✕
					</button>
				)}
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
								src={selected.image}
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
			</div>
		</div>
	);
};
