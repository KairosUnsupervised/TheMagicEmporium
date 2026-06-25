import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useGachaContext } from "../../context/gacha/useGachaContext";
import { GachaDisplay } from "./GachaDisplay";
import styles from "./GachaReveal.module.css";
import { GachaIntroHeader } from "./header/GachaIntroHeader";

export interface GachaRevealProps {
	onClosed?: () => void;
}

type IntroPhase = "intro" | "iris" | "open" | "closing";

const irisTransition = { duration: 1.2, ease: [0.85, 0, 0.25, 1] } as const;
const closeTransition = { duration: 0.9, ease: [0.85, 0, 0.25, 1] } as const;

export const GachaReveal = observer((props: GachaRevealProps) => {
	const context = useGachaContext();
	const [phase, setPhase] = useState<IntroPhase>("intro");

	useEffect(() => {
		const timer = setTimeout(() => setPhase("iris"), 2200);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!context.isOpen && phase === "open") {
			setPhase("closing");
		}
	}, [context.isOpen, phase]);

	const showBackdrop =
		phase === "intro" || phase === "iris" || phase === "closing";

	const clipTarget =
		phase === "intro" || phase === "closing"
			? "circle(0% at 50% 50%)"
			: "circle(150% at 50% 50%)";

	const clipTransition =
		phase === "iris"
			? irisTransition
			: phase === "closing"
				? closeTransition
				: { duration: 0 };

	const handleAnimationComplete = (): void => {
		if (phase === "iris") {
			setPhase("open");
		} else if (phase === "closing") {
			props.onClosed?.();
		}
	};

	return (
		<div className={styles.root}>
			{showBackdrop && (
				<div className={styles.backdrop}>
					<AnimatePresence>
						{phase === "intro" && (
							<motion.div
								key="intro-header"
								className={styles.headerWrapper}
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -32 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								<GachaIntroHeader />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			)}

			<motion.div
				className={styles.contentIris}
				initial={{ clipPath: "circle(0% at 50% 50%)" }}
				animate={{ clipPath: clipTarget }}
				transition={clipTransition}
				onAnimationComplete={handleAnimationComplete}
			>
				{phase !== "intro" && <GachaDisplay />}
			</motion.div>
		</div>
	);
});
