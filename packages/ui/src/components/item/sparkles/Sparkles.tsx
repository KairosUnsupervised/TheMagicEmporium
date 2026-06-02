import { animate } from "animejs";
import { useEffect, useRef } from "react";

interface SparkleSpec {
	x: number;
	y: number;
	size: number;
	delay: number;
	duration: number;
	loopDelay: number;
	rotation: number;
	color: string;
}

const SPARKLE_COLORS = [
	"#FFFFFF",
	"#E8E8F0",
	"#C0C0D8",
	"#FF44CC",
	"#E020A0",
	"#AA44FF",
	"#7B2FBE",
];

export interface SparklesProps {
	amount: number;
}

export const Sparkles = (props: SparklesProps) => {
	const sparkleRefs = useRef<(HTMLDivElement | null)[]>([]);
	const sparkles = useRef<SparkleSpec[]>(
		Array.from({ length: props.amount }, () => ({
			x: Math.random() * 88 + 6,
			y: Math.random() * 88 + 6,
			size: 6 + Math.random() * 9,
			delay: Math.random() * 3200,
			duration: 2000 + Math.random() * 1500,
			loopDelay: 900 + Math.random() * 3200,
			rotation: 20 + Math.random() * 35,
			color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
		})),
	).current;

	useEffect(() => {
		const animations = sparkles.map((spec, i) => {
			const el = sparkleRefs.current[i];
			if (!el) return null;
			return animate(el, {
				opacity: [0, 0.5, 0.45, 0],
				scale: [0, 1.3, 1.05, 0],
				rotate: [0, spec.rotation],
				duration: spec.duration,
				delay: spec.delay,
				loopDelay: spec.loopDelay,
				loop: true,
				ease: "inOutSine",
			});
		});

		return () => {
			for (const anim of animations) {
				anim?.pause();
			}
		};
	}, []);

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				pointerEvents: "none",
				overflow: "hidden",
				zIndex: 20,
			}}
		>
			{sparkles.map((spec, i) => (
				<div
					key={i}
					ref={(el) => {
						sparkleRefs.current[i] = el;
					}}
					style={{
						position: "absolute",
						left: `${spec.x}%`,
						top: `${spec.y}%`,
						opacity: 0,
						willChange: "transform, opacity",
						filter: `drop-shadow(0 0 ${Math.ceil(spec.size / 3)}px ${spec.color})`,
					}}
				>
					<svg
						width={spec.size}
						height={spec.size}
						viewBox="0 0 10 10"
						style={{ display: "block" }}
						aria-hidden="true"
					>
						<path
							d="M5 0 L5.9 3.8 L10 5 L5.9 6.2 L5 10 L4.1 6.2 L0 5 L4.1 3.8 Z"
							fill={spec.color}
						/>
					</svg>
				</div>
			))}
		</div>
	);
};
