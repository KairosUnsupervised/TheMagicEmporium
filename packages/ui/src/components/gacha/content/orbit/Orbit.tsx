import type { JSX } from "react";
import { useRef } from "react";
import {
	AnimatePresence,
	motion,
	useAnimationFrame,
	useMotionValue,
} from "framer-motion";
import styles from "./Orbit.module.css";
import { Diamond, DiamondType } from "./Diamond";
import { useGachaContext } from "../../../../context/gacha/useGachaContext";
import { observer } from "mobx-react-lite";

const ORBIT_SPEED = 0.03;

interface OrbitItemProps {
	x: number;
	y: number;
	type: DiamondType;
	delay: number;
}

const OrbitItem = (props: OrbitItemProps): JSX.Element => {
	const radius = Math.sqrt(props.x ** 2 + props.y ** 2);
	const initialAngle = Math.atan2(props.y, props.x);
	const startTime = useRef<number | null>(null);

	const motionX = useMotionValue(props.x);
	const motionY = useMotionValue(props.y);

	useAnimationFrame((time) => {
		if (startTime.current === null) {
			startTime.current = time;
		}
		const elapsed = (time - startTime.current) / 1000;
		const angle = initialAngle + elapsed * ORBIT_SPEED;
		motionX.set(radius * Math.cos(angle));
		motionY.set(radius * Math.sin(angle));
	});

	return (
		<motion.div
			className={styles.item}
			style={{ x: motionX, y: motionY }}
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			transition={{ delay: props.delay }}
		>
			<Diamond type={props.type} />
		</motion.div>
	);
};

export const Orbit = observer(() => {
	const context = useGachaContext();

	return (
		<div className={styles.root}>
			<AnimatePresence>
				{context.orbiter.all.map((item) => (
					<OrbitItem
						key={item.key}
						x={item.x}
						y={item.y}
						type={item.type}
						delay={item.delay}
					/>
				))}
			</AnimatePresence>
		</div>
	);
});
