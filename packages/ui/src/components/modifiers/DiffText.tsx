import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./DiffText.module.css";
import { diffWords } from "./diffWords";

export interface DiffTextProps {
	text: string;
	previousText: string | null;
}

const markerVisible = {
	backgroundColor: "rgba(166, 124, 27, 0.35)",
	boxShadow: "0 0 0 2px rgba(166, 124, 27, 0.35)",
};

const markerHidden = {
	backgroundColor: "rgba(166, 124, 27, 0)",
	boxShadow: "0 0 0 2px rgba(166, 124, 27, 0)",
};

// Hold the marker while the breakpoint swap settles, then fade it out.
const markerFadeTransition = {
	delay: 1.62,
	duration: 1.43,
	ease: "easeOut",
} as const;

export const DiffText = (props: DiffTextProps): ReactNode => {
	if (props.previousText === null || props.previousText === props.text) {
		return <>{props.text}</>;
	}

	const segments = diffWords(props.previousText, props.text);

	return (
		<>
			{segments.map((segment, index) => {
				if (segment.changed) {
					return (
						<motion.span
							key={`${index}-${segment.text}`}
							className={styles.changed}
							initial={markerVisible}
							animate={markerHidden}
							transition={markerFadeTransition}
						>
							{segment.text}
						</motion.span>
					);
				}
				return segment.text;
			})}
		</>
	);
};
