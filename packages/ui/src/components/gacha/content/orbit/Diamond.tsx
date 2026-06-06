import { useMemo } from "react";
import type { JSX } from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./Diamond.module.css";

export enum DiamondType {
	Bright = "bright",
	Dim = "dim",
}

export interface DiamondProps {
	type: DiamondType;
}

interface DiamondCustom {
	color: string;
	opacity: number;
}

const variants: Variants = {
	hidden: {
		scaleX: 7,
		scaleY: 0.1,
		rotate: 0,
		backgroundColor: "#ffffff",
		filter: "brightness(8)",
		opacity: 1,
	},
	visible: (custom: DiamondCustom) => ({
		scaleX: 1,
		scaleY: 1,
		rotate: 45,
		backgroundColor: custom.color,
		filter: "brightness(1)",
		opacity: custom.opacity,
		transition: {
			scaleX: { type: "spring", stiffness: 420, damping: 24, mass: 0.5 },
			scaleY: { type: "spring", stiffness: 420, damping: 24, mass: 0.5 },
			rotate: { type: "spring", stiffness: 420, damping: 24, mass: 0.5 },
			backgroundColor: { duration: 0.45, ease: "easeOut" },
			filter: { duration: 0.4, ease: "easeOut" },
			opacity: { duration: 0.35, ease: "easeOut" },
		},
	}),
	exit: {
		scaleX: [1, 1.3, 0],
		scaleY: [1, 1.3, 0],
		filter: ["brightness(1)", "brightness(4)", "brightness(0)"],
		opacity: [1, 1, 0],
		transition: { duration: 0.35, times: [0, 0.25, 1], ease: "easeIn" },
	},
};

export const Diamond = (props: DiamondProps): JSX.Element => {
	const type = useMemo(() => {
		if (props.type === DiamondType.Bright) {
			return {
				style: styles.bright,
				size: 9,
				custom: { color: "#d4a64a", opacity: 1 } as DiamondCustom,
			};
		}
		return {
			style: styles.dim,
			size: 7,
			custom: { color: "#c9a84c", opacity: 0.65 } as DiamondCustom,
		};
	}, [props.type]);

	return (
		<motion.div
			className={`${styles.root} ${type.style}`}
			style={{ width: `${type.size}px`, height: `${type.size}px` }}
			custom={type.custom}
			transformTemplate={(values) =>
				`scaleX(${values.scaleX ?? 1}) scaleY(${values.scaleY ?? 1}) rotate(${values.rotate ?? "45deg"})`
			}
			variants={variants}
			initial="hidden"
			animate="visible"
			exit="exit"
		/>
	);
};
