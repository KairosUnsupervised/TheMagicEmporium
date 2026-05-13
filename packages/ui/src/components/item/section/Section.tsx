import { type AppliedModifier } from "@tme/library/src/modifiers/Modifier";
import { ModifierDisplay } from "../../modifiers/ModifierDisplay";

export interface SectionProps {
	title: string;
	modifiers: AppliedModifier[];
}

export const Section = (props: SectionProps) => {
	if (props.modifiers.length === 0) return null;

	return (
		<div>
			<div style="display:flex;align-items:center;gap:14px;padding:4px 0;margin:10px 0 18px;">
				<div style="flex:1;height:20px;display:flex;flex-direction:column;justify-content:center;gap:3px;">
					<div style="height:1px;background:linear-gradient(90deg,rgba(212,166,74,0),#8a6a2c 40%,#e8c87a 50%,#8a6a2c 60%,rgba(212,166,74,0));" />
					<div style="height:1px;opacity:0.4;background:linear-gradient(90deg,rgba(212,166,74,0),#8a6a2c 40%,#e8c87a 50%,#8a6a2c 60%,rgba(212,166,74,0));" />
				</div>
				<div style="display:flex;align-items:center;gap:10px;padding:0 4px;white-space:nowrap;">
					<svg width="10" height="10" viewBox="0 0 10 10">
						<polygon points="5,0 10,5 5,10 0,5" fill="#d4a64a" />
					</svg>
					<span style="font-family:'Cinzel',serif;font-weight:600;font-size:12px;letter-spacing:0.42em;color:#f3dca0;text-shadow:0 0 14px rgba(212,166,74,.55);">
						{props.title}
					</span>
					<svg width="10" height="10" viewBox="0 0 10 10">
						<polygon points="5,0 10,5 5,10 0,5" fill="#d4a64a" />
					</svg>
				</div>
				<div style="flex:1;height:20px;display:flex;flex-direction:column;justify-content:center;gap:3px;">
					<div style="height:1px;background:linear-gradient(90deg,rgba(212,166,74,0),#8a6a2c 40%,#e8c87a 50%,#8a6a2c 60%,rgba(212,166,74,0));" />
					<div style="height:1px;opacity:0.4;background:linear-gradient(90deg,rgba(212,166,74,0),#8a6a2c 40%,#e8c87a 50%,#8a6a2c 60%,rgba(212,166,74,0));" />
				</div>
			</div>
			{props.modifiers.map((applied, i) => (
				<div key={i} style="position:relative;">
					{i > 0 && (
						<div style="position:absolute;left:54px;right:0;top:0;height:1px;background:linear-gradient(90deg,rgba(212,166,74,0),rgba(212,166,74,.25) 30%,rgba(212,166,74,.25) 70%,rgba(212,166,74,0));" />
					)}
					<ModifierDisplay modifier={applied.modifier} data={applied.data} />
				</div>
			))}
		</div>
	);
};
