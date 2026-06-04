import type { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useRef, useState } from "react";
import { BreakpointDisplay } from "./BreakpointDisplay";

export interface BreakpointSwapProps {
	type: ModifierType;
	items: ReactNode[];
	defaultActiveIndex: number;
}

const swapTransition = {
	duration: 0.4,
	ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
};

const swapVariants = {
	enter: (dir: number) => ({ opacity: 0, x: 36 * dir, scale: 0.95 }),
	center: { opacity: 1, x: 0, scale: 1 },
	exit: (dir: number) => ({ opacity: 0, x: -36 * dir, scale: 0.95 }),
};

export const BreakpointSwap = (props: BreakpointSwapProps): ReactNode => {
	const direction = useRef(1);
	const [temporaryActiveIndex, setTemporaryActiveIndex] = useState<
		number | null
	>(null);

	if (props.items.length <= 1) {
		return <>{props.items[0]}</>;
	}

	const currentIndex = temporaryActiveIndex ?? props.defaultActiveIndex;

	const onSelect = (index: number): void => {
		direction.current = index > currentIndex ? 1 : -1;
		setTemporaryActiveIndex(index);
	};

	return (
		<div style={{ position: "relative", overflow: "hidden" }}>
			<AnimatePresence
				mode="popLayout"
				initial={false}
				custom={direction.current}
			>
				<motion.div
					key={currentIndex}
					custom={direction.current}
					variants={swapVariants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={swapTransition}
				>
					{props.items[currentIndex]}
				</motion.div>
			</AnimatePresence>
			<div
				style={{ position: "absolute", top: "22px", right: "4px", zIndex: 10 }}
			>
				<BreakpointDisplay
					type={props.type}
					length={props.items.length}
					defaultActiveIndex={props.defaultActiveIndex}
					temporaryActiveIndex={temporaryActiveIndex}
					onSelect={onSelect}
				/>
			</div>
		</div>
	);
};
