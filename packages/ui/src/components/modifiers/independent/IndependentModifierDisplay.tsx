import {Icon} from "@tme/library/src/item/icon";
import type {IndependentModifier} from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import {ModifierType} from "@tme/library/src/modifiers/modifier.schema";
import {BreakpointSwap} from "../BreakpointSwap";
import styles from "./IndependentModifierDisplay.module.css";
import {generateIconUrl} from "@tme/library/src/misc/generateIconUrl";

export interface IndependentModifierDisplayProps {
	modifier: IndependentModifier;
	data: unknown;
}

const IndependentBody = (props: IndependentModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.data);

	return (
		<div className={styles.grid}>
			<div className={styles.iconWrapper}>
				<img src={generateIconUrl(Icon.Independent)} alt={"Icon"}/>
			</div>
			<div>
				<div className={styles.label}>INDEPENDENT</div>
				<div className={styles.title}>{flavor.title}</div>
				<div className={styles.description}>{flavor.description}</div>
				{flavor.disclaimer && (
					<div className={styles.disclaimer}>{flavor.disclaimer}</div>
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
		<IndependentBody modifier={props.modifier} data={{float: bp.min}}/>
	));

	return (
		<BreakpointSwap
			key={props.modifier.identifier}
			items={items}
			defaultActiveIndex={activeIndex}
			type={ModifierType.Independent}
		/>
	);
};
