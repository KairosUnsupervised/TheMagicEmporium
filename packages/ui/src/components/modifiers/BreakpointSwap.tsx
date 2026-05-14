import { useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointDisplay } from "./BreakpointDisplay";
import styles from "./BreakpointSwap.module.css";

export interface BreakpointSwapProps {
	type: ModifierType;
	items: ComponentChildren[];
	defaultActiveIndex: number;
}

export const BreakpointSwap = (props: BreakpointSwapProps) => {
	const [temporaryActiveIndex, setTemporaryActiveIndex] = useState<number | null>(null);
	const [slideKey, setSlideKey] = useState(0);
	const [slideClass, setSlideClass] = useState(styles.slideInRight);

	if (props.items.length <= 1) {
		return <>{props.items[0]}</>;
	}

	const currentIndex = temporaryActiveIndex ?? props.defaultActiveIndex;

	const onSelect = (index: number) => {
		setSlideClass(index > currentIndex ? styles.slideInRight : styles.slideInLeft);
		setSlideKey(k => k + 1);
		setTemporaryActiveIndex(index);
	};

	return (
		<div style="position:relative;">
			<div key={slideKey} class={slideClass}>
				{props.items[currentIndex]}
			</div>
			<div style="position:absolute;top:22px;right:4px;z-index:10;">
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
