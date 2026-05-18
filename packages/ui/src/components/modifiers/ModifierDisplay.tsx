import { Modifier } from "@tme/library/src/modifiers/Modifier";
import { UniqueModifier } from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import { IndependentModifier } from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import { LinearModifier } from "@tme/library/src/modifiers/blueprints/LinearModifier";
import { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import { UniqueModifierDisplay } from "./unique/UniqueModifierDisplay";
import { IndependentModifierDisplay } from "./independent/IndependentModifierDisplay";
import { LinearModifierDisplay } from "./linear/LinearModifierDisplay";
import { TieredModifierDisplay } from "./tiered/TieredModifierDisplay";

export interface ModifierDisplayProps {
	modifier: Modifier;
	data: unknown;
}

export const ModifierDisplay = (props: ModifierDisplayProps) => {
	if (props.modifier instanceof UniqueModifier) {
		return (
			<UniqueModifierDisplay modifier={props.modifier} data={props.data} />
		);
	}
	if (props.modifier instanceof IndependentModifier) {
		return (
			<IndependentModifierDisplay modifier={props.modifier} data={props.data} />
		);
	}
	if (props.modifier instanceof LinearModifier) {
		return (
			<LinearModifierDisplay modifier={props.modifier} data={props.data} />
		);
	}
	if (props.modifier instanceof TieredModifier) {
		return (
			<TieredModifierDisplay modifier={props.modifier} data={props.data} />
		);
	}
	return null;
};
