import { LinearModifier } from "@tme/library/src/modifiers/blueprints/LinearModifier";

export interface LinearModifierDisplayProps {
	modifier: LinearModifier;
	data: unknown;
}

const COLOR = "#5dd49a";
const SHADOW = "rgba(93,212,154,.45)";

export const LinearModifierDisplay = (props: LinearModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.data);
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data) as { min: number; value: number };

	return (
		<div style="position:relative;">
			<div style="display:grid;grid-template-columns:40px 1fr auto;gap:14px;padding:14px 4px 16px;align-items:start;">
				<div style="padding-top:6px;">
					<svg width="36" height="36" viewBox="0 0 32 32">
						<defs>
							<radialGradient id="linear-halo" cx="0.5" cy="0.5" r="0.5">
								<stop offset="0%" stopColor="#5dd49a" stopOpacity="0.9" />
								<stop offset="60%" stopColor="#5dd49a" stopOpacity="0.18" />
								<stop offset="100%" stopColor="#5dd49a" stopOpacity="0" />
							</radialGradient>
						</defs>
						<circle cx="16" cy="16" r="15" fill="url(#linear-halo)" />
						<polygon points="4,26 16,18 28,26 28,29 16,21 4,29" fill="#5dd49a" opacity="0.45" />
						<polygon points="4,20 16,12 28,20 28,23 16,15 4,23" fill="#5dd49a" opacity="0.75" />
						<polygon points="4,14 16,6 28,14 28,17 16,9 4,17" fill="#5dd49a" />
						<polygon points="13,4 16,2 19,4 16,6" fill="#fff" opacity="0.85" />
					</svg>
				</div>
				<div>
					<div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.34em;color:#5dd49a;text-shadow:0 0 10px rgba(93,212,154,.45);">
						LINEAR
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
					<span style={`font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:600;font-size:26px;line-height:1;color:${COLOR};text-shadow:0 0 14px ${SHADOW};`}>
						+{activeBreakpoint.value}
					</span>
				</div>
			</div>
		</div>
	);
};
