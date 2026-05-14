import {UniqueModifier} from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import {ModifierType} from "@tme/library/src/modifiers/modifier.schema";
import {BreakpointSwap} from "../BreakpointSwap";
import styles from "./UniqueModifierDisplay.module.css";
import icon from "./Icon.svg";

export interface UniqueModifierDisplayProps {
	modifier: UniqueModifier;
	data: unknown;
}

const UniqueBody = (props: UniqueModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.data);

	return (
		<div class={styles.grid}>
			<div class={styles.iconWrapper}>
				<img src={icon} alt="Icon" />
			</div>
			<div>
				<div class={styles.label}>
					UNIQUE
				</div>
				<div class={styles.title}>
					{flavor.title}
				</div>
				<div class={styles.description}>
					{flavor.description}
				</div>
				{flavor.disclaimer && (
					<div class={styles.disclaimer}>
						{flavor.disclaimer}
					</div>
				)}
			</div>
		</div>
	);
};

export const UniqueModifierDisplay = (props: UniqueModifierDisplayProps) => {
	const breakpoints = (props.modifier.schema as unknown as { breakpoints: { min: number }[] }).breakpoints;
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data);
	const activeIndex = breakpoints.findIndex(bp => bp.min === activeBreakpoint.min);

	const items = breakpoints.map(bp => <UniqueBody modifier={props.modifier} data={{float: bp.min}}/>);

	return <BreakpointSwap items={items} defaultActiveIndex={activeIndex} type={ModifierType.Unique}/>;
};
