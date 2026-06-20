import { IndependentModifier } from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import { LinearModifier } from "@tme/library/src/modifiers/blueprints/LinearModifier";
import { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import { UniqueModifier } from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import type { Modifier } from "@tme/library/src/modifiers/Modifier";
import { IndependentModifierDisplay } from "./independent/IndependentModifierDisplay";
import { LinearModifierDisplay } from "./linear/LinearModifierDisplay";
import { TieredModifierDisplay } from "./tiered/TieredModifierDisplay";
import { UniqueModifierDisplay } from "./unique/UniqueModifierDisplay";

export interface ModifierDisplayProps {
	modifier: Modifier;
	float: number;
}

export const ModifierDisplay = (props: ModifierDisplayProps) => {
	if (props.modifier instanceof UniqueModifier) {
		return (
			<UniqueModifierDisplay modifier={props.modifier} float={props.float} />
		);
	}
	if (props.modifier instanceof IndependentModifier) {
		return (
			<IndependentModifierDisplay
				modifier={props.modifier}
				float={props.float}
			/>
		);
	}
	if (props.modifier instanceof LinearModifier) {
		return (
			<LinearModifierDisplay modifier={props.modifier} float={props.float} />
		);
	}
	if (props.modifier instanceof TieredModifier) {
		return (
			<TieredModifierDisplay modifier={props.modifier} float={props.float} />
		);
	}
	return null;
};
