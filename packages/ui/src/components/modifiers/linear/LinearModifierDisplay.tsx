import { Icon } from "@tme/library/src/item/icon";
import type { LinearModifier } from "@tme/library/src/modifiers/blueprints/LinearModifier";
import { namespace } from "@tme/shared/src/namespaceConfig";
import icon from "./Icon.svg";
import styles from "./LinearModifierDisplay.module.css";

export interface LinearModifierDisplayProps {
	modifier: LinearModifier;
	data: unknown;
}

export const LinearModifierDisplay = (props: LinearModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.data);
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(
		props.data,
	) as { min: number; value: number };
	const iconSrc =
		typeof game !== "undefined" && game?.world?.id
			? `worlds/${game.world.id}/data/${namespace.core.id}/icons/${Icon.Linear}`
			: icon;

	return (
		<div class={styles.root}>
			<div class={styles.grid}>
				<div class={styles.iconWrapper}>
					<img src={iconSrc} alt="Icon" />
				</div>
				<div>
					<div class={styles.label}>LINEAR</div>
					<div class={styles.titleRow}>
						<div class={styles.title}>{flavor.title}</div>
						<span class={styles.value}>+{activeBreakpoint.value}</span>
					</div>
					<div class={styles.description}>{flavor.description}</div>
					{flavor.disclaimer && (
						<div class={styles.disclaimer}>{flavor.disclaimer}</div>
					)}
				</div>
			</div>
		</div>
	);
};
