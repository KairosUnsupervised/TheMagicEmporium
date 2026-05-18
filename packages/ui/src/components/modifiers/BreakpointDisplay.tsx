import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import styles from "./BreakpointDisplay.module.css";

export interface BreakpointDisplayProps {
	type: ModifierType;
	length: number;
	defaultActiveIndex: number;
	temporaryActiveIndex: number | null;
	onSelect?: (index: number) => void;
}

export const BREAKPOINT_CONFIG = {
	[ModifierType.Unique]: {
		color: "#ee7e3e",
		shadow: "rgba(238,126,62,.45)",
		shape: "circle" as const,
		size: 7,
		gap: 5,
	},
	[ModifierType.Independent]: {
		color: "#5db4e8",
		shadow: "rgba(93,180,232,.45)",
		shape: "circle" as const,
		size: 7,
		gap: 5,
	},
	[ModifierType.Tiered]: {
		color: "#b88ce8",
		shadow: "rgba(184,140,232,.45)",
		shape: "diamond" as const,
		size: 10,
		gap: 6,
	},
	[ModifierType.Linear]: {
		color: "#5db4e8",
		shadow: "rgba(93,180,232,.45)",
		shape: "circle" as const,
		size: 7,
		gap: 5,
	},
};

export const BreakpointDisplay = (props: BreakpointDisplayProps) => {
	const { color, shadow, shape, size, gap } = BREAKPOINT_CONFIG[props.type];

	const dots = Array.from({ length: props.length }).map((_, index) => {
		const active = index === props.defaultActiveIndex;
		const preview = index === props.temporaryActiveIndex;
		const chevronClass = preview ? styles.chevron : styles.chevronHidden;

		const dot = (() => {
			if (shape === "diamond") {
				if (active)
					return (
						<svg
							class={styles.dot}
							width={size}
							height={size}
							viewBox="0 0 10 10"
						>
							<polygon
								points="5,0 10,5 5,10 0,5"
								fill={color}
								class={styles.glow}
								style={`--bp-glow:${color}aa`}
							/>
						</svg>
					);
				if (index < props.defaultActiveIndex)
					return (
						<svg
							class={styles.dot}
							width={size}
							height={size}
							viewBox="0 0 10 10"
							style={"opacity: 0.6;"}
						>
							<polygon points="5,0 10,5 5,10 0,5" fill={color} />
						</svg>
					);
				return (
					<svg
						class={styles.dot}
						width={size}
						height={size}
						viewBox="0 0 10 10"
					>
						<polygon
							points="5,0.6 9.4,5 5,9.4 0.6,5"
							fill="none"
							stroke={color}
							strokeWidth="0.8"
							opacity="0.5"
						/>
					</svg>
				);
			}
			if (active)
				return (
					<svg class={styles.dot} width={size} height={size} viewBox="0 0 7 7">
						<circle
							cx="3.5"
							cy="3.5"
							r="3"
							fill={color}
							class={styles.glow}
							style={`--bp-glow:${shadow}`}
						/>
					</svg>
				);
			return (
				<svg class={styles.dot} width={size} height={size} viewBox="0 0 7 7">
					<circle
						cx="3.5"
						cy="3.5"
						r="2.5"
						fill="none"
						stroke={color}
						strokeWidth="0.8"
						opacity="0.45"
					/>
				</svg>
			);
		})();

		return (
			<div
				key={`${index}-${active}-${preview}`}
				class={styles.slot}
				onClick={() => props.onSelect?.(index)}
			>
				<svg class={chevronClass} width="9" height="5" viewBox="0 0 9 5">
					<polyline
						points="1,1 4.5,4 8,1"
						fill="none"
						stroke={color}
						strokeWidth="1.2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{dot}
				<svg class={chevronClass} width="9" height="5" viewBox="0 0 9 5">
					<polyline
						points="1,4 4.5,1 8,4"
						fill="none"
						stroke={color}
						strokeWidth="1.2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		);
	});

	return (
		<div class={styles.container} style={`--bp-gap:${gap}px`}>
			{dots}
		</div>
	);
};
