import type { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { BreakpointDisplay } from "./BreakpointDisplay";

export interface BreakpointSwapProps {
	type: ModifierType;
	items: ((previousIndex: number | null) => ReactNode)[];
	defaultActiveIndex: number;
}

const swapTransition = {
	duration: 0.4,
	ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
};

const heightTransition = {
	duration: 0.3,
	ease: "easeInOut",
} as const;

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
	const [previousIndex, setPreviousIndex] = useState<number | null>(null);

	const contentRef = useRef<HTMLDivElement>(null);
	const prevHeightRef = useRef<number | "auto">("auto");
	const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
	const [isGrowing, setIsGrowing] = useState(false);

	useEffect(() => {
		const element = contentRef.current;
		if (!element) {
			return;
		}
		const observer = new ResizeObserver(() => {
			const newHeight = element.getBoundingClientRect().height;
			const prev = prevHeightRef.current;
			setIsGrowing(typeof prev === "number" && newHeight > prev);
			prevHeightRef.current = newHeight;
			setContentHeight(newHeight);
		});
		observer.observe(element);
		return () => {
			observer.disconnect();
		};
	}, []);

	if (props.items.length <= 1) {
		return <>{props.items[0]?.(null)}</>;
	}

	const currentIndex = temporaryActiveIndex ?? props.defaultActiveIndex;

	const onSelect = (index: number): void => {
		direction.current = index > currentIndex ? 1 : -1;
		setPreviousIndex(currentIndex);
		setTemporaryActiveIndex(index);
	};

	return (
		<div style={{ position: "relative" }}>
			<motion.div
				animate={{ height: contentHeight }}
				transition={isGrowing ? swapTransition : heightTransition}
				style={{ overflow: "hidden" }}
			>
				<div ref={contentRef}>
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
							{props.items[currentIndex](previousIndex)}
						</motion.div>
					</AnimatePresence>
				</div>
			</motion.div>
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
