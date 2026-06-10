import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import type { Envelope } from "../../../context/gacha/library/Inventory";
import { useGachaContext } from "../../../context/gacha/useGachaContext";
import styles from "./EnvelopeInput.module.css";
import { Tooltip } from "./Tooltip";

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

export const EnvelopeInput = observer(() => {
	const context = useGachaContext();
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [tileRef, animateTile] = useAnimate<HTMLDivElement>();
	const selected = context.inventory.envelopeSelected;
	const all = context.inventory.getActorEnvelopes();

	const hoveredEnvelope =
		hoveredId !== null ? (all.find((e) => e.id === hoveredId) ?? null) : null;
	const hoveredIndex =
		hoveredEnvelope !== null
			? all.findIndex((e) => e.id === hoveredEnvelope.id)
			: -1;
	const hoveredPos =
		hoveredIndex !== -1 ? computeOrbitPosition(hoveredIndex, all.length) : null;

	const handleTileClick = useCallback((): void => {
		context.inventory.isEnvelopeSelectOpen =
			!context.inventory.isEnvelopeSelectOpen;
	}, [all.length]);

	const handleSelect = useCallback(
		(envelope: Envelope): void => {
			context.inventory.setEnvelope(envelope);
			context.inventory.isEnvelopeSelectOpen = false;
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
		[context.inventory, animateTile, tileRef],
	);

	const handleClose = useCallback((): void => {
		context.inventory.isEnvelopeSelectOpen = false;
	}, []);

	return (
		<div
			className={`${styles.wrapper} ${context.inventory.isEnvelopeSelectOpen ? styles.wrapperOpen : ""}`}
		>
			<AnimatePresence>
				{context.inventory.isEnvelopeSelectOpen && (
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
					{context.inventory.isEnvelopeSelectOpen && (
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
					{context.inventory.isEnvelopeSelectOpen &&
						all.map((envelope, i) => {
							const { x, y } = computeOrbitPosition(i, all.length);
							const isSelected = envelope.id === selected?.id;
							return (
								<motion.div
									key={envelope.id}
									className={`${styles.orbitItem} ${isSelected ? styles.orbitItemSelected : ""}`}
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
									whileHover={{
										scale: 1.1,
										transition: {
											type: "spring",
											stiffness: 500,
											damping: 26,
										},
									}}
									onHoverStart={() => setHoveredId(envelope.id)}
									onHoverEnd={() => setHoveredId(null)}
									onClick={(e) => {
										e.stopPropagation();
										if (isSelected) {
											context.inventory.setEnvelope(null);
											context.inventory.isEnvelopeSelectOpen = false;
										} else {
											handleSelect(envelope);
										}
									}}
								>
									<div className={styles.orbitThumb}>
										<img
											className={styles.orbitImage}
											src={envelope.img}
											alt={envelope.name}
										/>
										{isSelected && (
											<div className={styles.orbitClearOverlay}>
												<span className={styles.orbitClearX}>✕</span>
											</div>
										)}
									</div>
									<span className={styles.orbitName}>{envelope.name}</span>
								</motion.div>
							);
						})}
				</AnimatePresence>

				<AnimatePresence>
					{context.inventory.isEnvelopeSelectOpen &&
						hoveredEnvelope !== null &&
						hoveredPos !== null && (
							<Tooltip
								key={`${hoveredEnvelope.id}-tooltip`}
								name={hoveredEnvelope.name}
								description={hoveredEnvelope.system.description.value}
								x={hoveredPos.x + (hoveredPos.x / ORBIT_RADIUS) * 117}
								y={hoveredPos.y + (hoveredPos.y / ORBIT_RADIUS) * 117}
							/>
						)}
				</AnimatePresence>
			</div>
			<motion.div
				ref={tileRef}
				className={`${styles.root} ${context.inventory.isEnvelopeSelectOpen ? styles.rootOpen : ""}`}
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
