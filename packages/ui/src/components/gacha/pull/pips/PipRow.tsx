import { motion } from "framer-motion";
import { Fragment, type JSX } from "react";
import { Pip } from "./Pip";
import styles from "./PipRow.module.css";

interface PipRowProps {
	/** Breakpoint index per pip, grouped by modifier slot (primary, secondary, tertiary) */
	groups: number[][];
	baseDelay?: number;
	stagger?: number;
}

export const PipRow = (props: PipRowProps): JSX.Element | null => {
	const baseDelay = props.baseDelay ?? 0.1;
	const stagger = props.stagger ?? 0.08;
	const groups = props.groups.filter(
		(group: number[]): boolean => group.length > 0,
	);

	if (groups.length === 0) {
		return null;
	}

	return (
		<motion.span
			className={styles.root}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.25 }}
		>
			{groups.map((group, groupIndex) => {
				const offset = groups
					.slice(0, groupIndex)
					.reduce(
						(sum: number, value: number[]): number => sum + value.length,
						0,
					);
				return (
					<Fragment key={groupIndex}>
						{groupIndex > 0 && (
							<motion.span
								className={styles.separator}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.3,
									ease: "easeOut",
									delay: baseDelay + offset * stagger,
								}}
							/>
						)}
						{group.map((breakpoints, i) => (
							<Pip
								key={i}
								delay={baseDelay + (offset + i) * stagger}
								breakpoints={breakpoints}
							/>
						))}
					</Fragment>
				);
			})}
		</motion.span>
	);
};
