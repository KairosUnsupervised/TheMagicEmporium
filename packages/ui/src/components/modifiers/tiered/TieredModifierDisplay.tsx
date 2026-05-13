import { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import { BreakpointStack } from "../BreakpointStack";

export interface TieredModifierDisplayProps {
	modifier: TieredModifier;
	data: unknown;
}

const COLOR = "#b88ce8";
const SHADOW = "rgba(184,140,232,.45)";
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const TieredBody = (props: TieredModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.data);
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data) as { min: number; value: number };
	const tiers = (props.modifier.schema as unknown as { tiers: { min: number }[] }).tiers;
	const sortedTiers = [...tiers].sort((a, b) => a.min - b.min);
	const activeTierIndex = sortedTiers.reduce((best, tier, i) => activeBreakpoint.value >= tier.min ? i : best, 0);

	return (
		<div style="display:grid;grid-template-columns:40px 1fr auto;gap:14px;padding:14px 4px 16px;align-items:start;">
			<div style="padding-top:6px;">
				<svg width="36" height="36" viewBox="0 0 32 32">
					<defs>
						<radialGradient id="tiered-halo" cx="0.5" cy="0.5" r="0.5">
							<stop offset="0%" stopColor="#b88ce8" stopOpacity="0.9" />
							<stop offset="60%" stopColor="#b88ce8" stopOpacity="0.18" />
							<stop offset="100%" stopColor="#b88ce8" stopOpacity="0" />
						</radialGradient>
					</defs>
					<circle cx="16" cy="16" r="15" fill="url(#tiered-halo)" />
					<polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="#553a78" stroke="#b88ce8" strokeWidth="1.2" />
					<polygon points="16,8 23,12 23,20 16,24 9,20 9,12" fill="#b88ce8" opacity="0.7" />
					<polygon points="16,3 27,9.5 16,16 5,9.5" fill="#fff" opacity="0.18" />
				</svg>
			</div>
			<div>
				<div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.34em;color:#b88ce8;text-shadow:0 0 10px rgba(184,140,232,.45);">
					TIERED
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
			<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;padding-top:8px;">
				<div style="display:inline-flex;align-items:center;gap:6px;">
					{sortedTiers.map((_, i) =>
						i === activeTierIndex ? (
							<svg key={i} width="10" height="10" viewBox="0 0 10 10">
								<polygon points="5,0 10,5 5,10 0,5" fill={COLOR} style={`filter:drop-shadow(0 0 4px ${COLOR}aa)`} />
							</svg>
						) : (
							<svg key={i} width="10" height="10" viewBox="0 0 10 10">
								<polygon points="5,0.6 9.4,5 5,9.4 0.6,5" fill="none" stroke={COLOR} strokeWidth="0.8" opacity="0.5" />
							</svg>
						),
					)}
				</div>
				<span style={`font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.28em;color:${COLOR};opacity:0.85;`}>
					{ROMAN[activeTierIndex]} / {ROMAN[sortedTiers.length - 1]}
				</span>
			</div>
		</div>
	);
};

export const TieredModifierDisplay = (props: TieredModifierDisplayProps) => {
	const breakpoints = (props.modifier.schema as unknown as { breakpoints: { min: number }[] }).breakpoints;
	const sorted = [...breakpoints].sort((a, b) => a.min - b.min);
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data);
	const activeIndex = sorted.findIndex(bp => bp.min === activeBreakpoint.min);

	const items = sorted.map(bp => <TieredBody modifier={props.modifier} data={{ float: bp.min }} />);

	return <BreakpointStack items={items} activeIndex={activeIndex} />;
};
