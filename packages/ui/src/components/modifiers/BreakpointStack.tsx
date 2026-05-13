import { useState, useRef } from "preact/hooks";
import type { ComponentChildren } from "preact";

export interface BreakpointStackProps {
	items: ComponentChildren[];
	activeIndex: number;
}

export const BreakpointStack = (props: BreakpointStackProps) => {
	const [hovered, setHovered] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const enter = () => {
		if (timeout.current) clearTimeout(timeout.current);
		setHovered(true);
	};

	const leave = () => {
		timeout.current = setTimeout(() => setHovered(false), 60);
	};

	if (props.items.length <= 1) {
		return <>{props.items[0]}</>;
	}

	const above = props.items.slice(0, props.activeIndex);
	const active = props.items[props.activeIndex];
	const below = props.items.slice(props.activeIndex + 1);

	return (
		<div style="position:relative;" onMouseEnter={enter} onMouseLeave={leave}>
			{above.length > 0 && (
				<div
					onMouseEnter={enter}
					style={`position:absolute;bottom:100%;left:0;right:0;z-index:20;background:#040510;border-bottom:1px solid rgba(255,255,255,0.07);opacity:${hovered ? 1 : 0};transform:translateY(${hovered ? 0 : 8}px);transition:opacity 0.2s ease,transform 0.2s ease;pointer-events:${hovered ? "auto" : "none"};`}
				>
					{above.map((item, i) => (
						<div key={i} style="opacity:0.45;">
							{item}
						</div>
					))}
				</div>
			)}
			<div style={`transform:${hovered ? "scale(1.03)" : "scale(1)"};transition:transform 0.18s ease;transform-origin:center;`}>
				{active}
			</div>
			{below.length > 0 && (
				<div
					onMouseEnter={enter}
					style={`position:absolute;top:100%;left:0;right:0;z-index:20;background:#040510;border-top:1px solid rgba(255,255,255,0.07);opacity:${hovered ? 1 : 0};transform:translateY(${hovered ? 0 : -8}px);transition:opacity 0.2s ease,transform 0.2s ease;pointer-events:${hovered ? "auto" : "none"};`}
				>
					{below.map((item, i) => (
						<div key={i} style="opacity:0.45;">
							{item}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
