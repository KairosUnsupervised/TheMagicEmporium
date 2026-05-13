import { UniqueModifier } from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import { BreakpointStack } from "../BreakpointStack";

export interface UniqueModifierDisplayProps {
	modifier: UniqueModifier;
	data: unknown;
}

const COLOR = "#ee7e3e";
const SHADOW = "rgba(238,126,62,.45)";

const UniqueBody = (props: UniqueModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.data);
	const breakpoints = (props.modifier.schema as unknown as { breakpoints: { min: number }[] }).breakpoints;
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data);
	const activeIndex = breakpoints.findIndex(bp => bp.min === activeBreakpoint.min);

	return (
		<div style="display:grid;grid-template-columns:40px 1fr auto;gap:14px;padding:14px 4px 16px;align-items:start;">
			<div style="padding-top:6px;">
				<svg width="36" height="36" viewBox="0 0 32 32">
					<defs>
						<radialGradient id="uniq-halo" cx="0.5" cy="0.5" r="0.5">
							<stop offset="0%" stopColor="#ee7e3e" stopOpacity="0.9" />
							<stop offset="60%" stopColor="#ee7e3e" stopOpacity="0.18" />
							<stop offset="100%" stopColor="#ee7e3e" stopOpacity="0" />
						</radialGradient>
					</defs>
					<circle cx="16" cy="16" r="15" fill="url(#uniq-halo)" />
					<polygon points="16,4 28,16 16,28 4,16" fill="#7a3a14" stroke="#ee7e3e" strokeWidth="1.2" />
					<polygon points="16,9 23,16 16,23 9,16" fill="#ee7e3e" />
					<polygon points="16,12 19,16 16,20 13,16" fill="#fff" opacity="0.85" />
				</svg>
			</div>
			<div>
				<div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.34em;color:#ee7e3e;text-shadow:0 0 10px rgba(238,126,62,.45);">
					UNIQUE
				</div>
				<div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:22px;color:#ece4cf;margin:3px 0 6px;">
					{flavor.title}
				</div>
				<div style="font-size:12.5px;line-height:1.55;color:#a89e84;font-weight:300;">
					{flavor.description}
				</div>
				{flavor.disclaimer && (
					<div style="font-size:11px;line-height:1.5;color:#6e6757;font-style:italic;margin-top:6px;font-weight:300;">
						{flavor.disclaimer}
					</div>
				)}
			</div>
			{breakpoints.length > 1 && (
				<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;padding-top:8px;">
					<div style="display:inline-flex;align-items:center;gap:5px;">
						{breakpoints.map((_, i) =>
							i === activeIndex ? (
								<svg key={i} width="7" height="7" viewBox="0 0 7 7">
									<circle cx="3.5" cy="3.5" r="3" fill={COLOR} style={`filter:drop-shadow(0 0 4px ${SHADOW})`} />
								</svg>
							) : (
								<svg key={i} width="7" height="7" viewBox="0 0 7 7">
									<circle cx="3.5" cy="3.5" r="2.5" fill="none" stroke={COLOR} strokeWidth="0.8" opacity="0.45" />
								</svg>
							),
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export const UniqueModifierDisplay = (props: UniqueModifierDisplayProps) => {
	const breakpoints = (props.modifier.schema as unknown as { breakpoints: { min: number }[] }).breakpoints;
	const sorted = [...breakpoints].sort((a, b) => a.min - b.min);
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data);
	const activeIndex = sorted.findIndex(bp => bp.min === activeBreakpoint.min);

	const items = sorted.map(bp => <UniqueBody modifier={props.modifier} data={{ float: bp.min }} />);

	return <BreakpointStack items={items} activeIndex={activeIndex} />;
};
