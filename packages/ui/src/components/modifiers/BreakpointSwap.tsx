import type { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import {
	type ReactNode,
	startTransition,
	useEffect,
	useRef,
	useState,
	ViewTransition,
} from "react";
import { BreakpointDisplay } from "./BreakpointDisplay";

export interface BreakpointSwapProps {
	type: ModifierType;
	items: ReactNode[];
	defaultActiveIndex: number;
}

const makeTransitionStyles = (name: string, dir: number) => `
	@keyframes bp-swap-out { to { transform: translateX(${-36 * dir}px) scale(0.95); opacity: 0; } }
	@keyframes bp-swap-in { from { transform: translateX(${36 * dir}px) scale(0.95); opacity: 0; } }
	::view-transition-old(${name}) { animation: bp-swap-out 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
	::view-transition-new(${name}) { animation: bp-swap-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
`;

export const BreakpointSwap = (props: BreakpointSwapProps) => {
	const [temporaryActiveIndex, setTemporaryActiveIndex] = useState<
		number | null
	>(null);
	const vtName = useRef(
		`bp-swap-${Math.random().toString(36).slice(2)}`,
	).current;
	const styleEl = useRef<HTMLStyleElement | null>(null);

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
		startTransition(() => {
			setTemporaryActiveIndex(index);
		});
	};

	return (
		<div style={{ position: "relative" }}>
			<ViewTransition name={vtName}>{props.items[currentIndex]}</ViewTransition>
			<div
				style={{ position: "absolute", top: "22px", right: "4px", zIndex: 10 }}
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
