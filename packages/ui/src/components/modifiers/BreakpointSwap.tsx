import { useEffect, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointDisplay } from "./BreakpointDisplay";

export interface BreakpointSwapProps {
	type: ModifierType;
	items: ComponentChildren[];
	defaultActiveIndex: number;
}

const makeTransitionStyles = (name: string, dir: number) => `
	@keyframes bp-swap-out { to { transform: translateX(${-36 * dir}px) scale(0.95); opacity: 0; } }
	@keyframes bp-swap-in { from { transform: translateX(${36 * dir}px) scale(0.95); opacity: 0; } }
	::view-transition-old(${name}) { animation: bp-swap-out 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
	::view-transition-new(${name}) { animation: bp-swap-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
`;

// TODO Upgrade to REACT and react view transition component
export const BreakpointSwap = (props: BreakpointSwapProps) => {
	const [temporaryActiveIndex, setTemporaryActiveIndex] = useState<
		number | null
	>(null);
	const vtName = useRef(
		`bp-swap-${Math.random().toString(36).slice(2)}`,
	).current;
	const styleEl = useRef<HTMLStyleElement | null>(null);

	console.log("RERENDER");

	useEffect(() => {
		const el = document.createElement("style");
		document.head.appendChild(el);
		styleEl.current = el;
		return () => el.remove();
	}, []);

	if (props.items.length <= 1) {
		return <>{props.items[0]}</>;
	}

	const currentIndex = temporaryActiveIndex ?? props.defaultActiveIndex;

	const onSelect = (index: number) => {
		const dir = index > currentIndex ? 1 : -1;

		if (styleEl.current) {
			styleEl.current.textContent = makeTransitionStyles(vtName, dir);
		}

		if (!document.startViewTransition) {
			setTemporaryActiveIndex(index);
			return;
		}

		document.startViewTransition(async () => {
			setTemporaryActiveIndex(index);
			await new Promise<void>((resolve) => setTimeout(resolve));
		});
	};

	return (
		<div style="position:relative;">
			<div style={{ viewTransitionName: vtName } as never}>
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
