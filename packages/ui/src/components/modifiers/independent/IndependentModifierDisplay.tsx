import { IndependentModifier } from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointSwap } from "../BreakpointSwap";
import styles from "./IndependentModifierDisplay.module.css";
import icon from "./Icon.svg";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { Icon } from "@tme/library/src/item/icon";

export interface IndependentModifierDisplayProps {
	modifier: IndependentModifier;
	data: unknown;
}

const IndependentBody = (props: IndependentModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.data);
	const iconSrc =
		typeof game !== "undefined" && game?.world?.id
			? `worlds/${game.world.id}/data/${namespace.core.id}/icons/${Icon.Independent}`
			: icon;

	return (
		<div class={styles.grid}>
			<div class={styles.iconWrapper}>
				<img src={iconSrc} alt={"Icon"} />
			</div>
			<div>
				<div class={styles.label}>INDEPENDENT</div>
				<div class={styles.title}>{flavor.title}</div>
				<div class={styles.description}>{flavor.description}</div>
				{flavor.disclaimer && (
					<div class={styles.disclaimer}>{flavor.disclaimer}</div>
				)}
			</div>
		</div>
	);
};

export const IndependentModifierDisplay = (
	props: IndependentModifierDisplayProps,
) => {
	const breakpoints = (
		props.modifier.schema as unknown as { breakpoints: { min: number }[] }
	).breakpoints;
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data);
	const activeIndex = breakpoints.findIndex(
		(bp) => bp.min === activeBreakpoint.min,
	);

	const items = breakpoints.map((bp) => (
		<IndependentBody modifier={props.modifier} data={{ float: bp.min }} />
	));

	return (
		<BreakpointSwap
			items={items}
			defaultActiveIndex={activeIndex}
			type={ModifierType.Independent}
		/>
	);
};
