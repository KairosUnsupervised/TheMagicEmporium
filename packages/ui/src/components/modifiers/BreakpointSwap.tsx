import type {ModifierType} from "@tme/library/src/modifiers/modifier.schema";
import {type ReactNode, startTransition, useRef, useState, ViewTransition,} from "react";
import {BreakpointDisplay} from "./BreakpointDisplay";

export interface BreakpointSwapProps {
	type: ModifierType;
	items: ReactNode[];
	defaultActiveIndex: number;
}

export const BreakpointSwap = (props: BreakpointSwapProps) => {

	const direction = useRef(1);
	const [temporaryActiveIndex, setTemporaryActiveIndex] = useState<
		number | null
	>(null);

	if (props.items.length <= 1) {
		return <>{props.items[0]}</>;
	}

	const currentIndex = temporaryActiveIndex ?? props.defaultActiveIndex;

	const onSelect = (index: number) => {
		direction.current = index > currentIndex ? 1 : -1;
		startTransition(() => {
			setTemporaryActiveIndex(index);
		})
	};

	return (
		<div>
			<ViewTransition
				onUpdate={(instance) => {
					const oldAnimation = instance.old.animate(
						[{opacity: 1, transform: "translateX(0)", scale: 1}, {
							opacity: 0,
							transform: `translateX(${-36 * direction.current}px)`,
							scale: 0.95
						}],
						{duration: 400, fill: "forwards", easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"}
					);
					const newAnimation = instance.new.animate(
						[{opacity: 0, transform: `translateX(${36 * direction.current}px)`, scale: 0.95}, {
							opacity: 1,
							transform: "translateX(0)",
							scale: 1
						}],
						{duration: 400, fill: "forwards", easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"}
					);
					return () => {
						oldAnimation.cancel();
						newAnimation.cancel();
					};
				}}
			>{props.items[currentIndex]}</ViewTransition>
			<div
				style={{position: "absolute", top: "22px", right: "4px", zIndex: 10}}
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
