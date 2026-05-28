import { Icon } from "@tme/library/src/item/icon";
import type { UniqueModifier } from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { BreakpointSwap } from "../BreakpointSwap";
import icon from "./Icon.svg";
import styles from "./UniqueModifierDisplay.module.css";

export interface UniqueModifierDisplayProps {
	modifier: UniqueModifier;
	data: unknown;
}

const UniqueBody = (props: UniqueModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.data);
	const iconSrc =
		typeof game !== "undefined" && game?.world?.id
			? `worlds/${game.world.id}/data/${namespace.core.id}/icons/${Icon.Unique}`
			: icon;

	return (
		<div className={styles.grid}>
			<div className={styles.iconWrapper}>
				<img src={iconSrc} alt="Icon" />
			</div>
			<div>
				<div className={styles.label}>UNIQUE</div>
				<div className={styles.title}>{flavor.title}</div>
				<div className={styles.description}>{flavor.description}</div>
				{flavor.disclaimer && (
					<div className={styles.disclaimer}>{flavor.disclaimer}</div>
				)}
			</div>
		</div>
	);
};

export const UniqueModifierDisplay = (props: UniqueModifierDisplayProps) => {
	const breakpoints = (
		props.modifier.schema as unknown as { breakpoints: { min: number }[] }
	).breakpoints;
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data);
	const activeIndex = breakpoints.findIndex(
		(bp) => bp.min === activeBreakpoint.min,
	);

	const items = breakpoints.map((bp) => (
		<UniqueBody modifier={props.modifier} data={{ float: bp.min }} />
	));

	return (
		<BreakpointSwap
			items={items}
			defaultActiveIndex={activeIndex}
			type={ModifierType.Unique}
		/>
	);
};
