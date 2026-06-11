import { motion } from "framer-motion";
import type { JSX } from "react";
import styles from "./Pip.module.css";

interface PipProps {
	delay?: number;
	/** Breakpoint index of the modifier; one chevron is shown per breakpoint above zero */
	breakpoints?: number;
}

export const Pip = (props: PipProps): JSX.Element => {
	const delay = props.delay ?? 0;
	const breakpoints = props.breakpoints ?? 0;

	return (
		<motion.span
			className={styles.pip}
			initial={{ opacity: 0, scale: 0.4 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3, ease: "easeOut", delay }}
		>
			{breakpoints > 0 && (
				<span className={styles.chevrons}>
					{Array.from({ length: breakpoints }).map((_, i) => (
						<motion.svg
							key={i}
							className={styles.chevron}
							viewBox="0 0 6 3"
							aria-hidden="true"
							initial={{ opacity: 0, y: 2 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.25,
								ease: "easeOut",
								delay: delay + 0.2 + i * 0.06,
							}}
						>
							<path
								d="M 1 2.5 L 3 0.5 L 5 2.5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</motion.svg>
					))}
				</span>
			)}
			◈
		</motion.span>
	);
};
