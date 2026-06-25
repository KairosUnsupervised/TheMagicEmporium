import { Icon } from "@tme/library/src/item/icon";
import { generateIconUrl } from "@tme/library/src/misc/generateIconUrl";
import type { LinearModifier } from "@tme/library/src/modifiers/blueprints/LinearModifier";
import styles from "./LinearModifierDisplay.module.css";

export interface LinearModifierDisplayProps {
	modifier: LinearModifier;
	float: number;
}

export const LinearModifierDisplay = (props: LinearModifierDisplayProps) => {
	const flavor = props.modifier.getDescription(props.float);
	const activeBreakpoint = props.modifier.float.getBreakpoint(props.float) as {
		min: number;
		value: number;
	};

	return (
		<div className={styles.root}>
			<div className={styles.grid}>
				<div className={styles.iconWrapper}>
					<img src={generateIconUrl(Icon.Linear)} alt="Icon" />
				</div>
				<div>
					<div className={styles.label}>LINEAR</div>
					<div className={styles.titleRow}>
						<div className={styles.title}>{flavor.title}</div>
						<span className={styles.value}>+{activeBreakpoint.value}</span>
					</div>
					<div className={styles.description}>{flavor.description}</div>
					{flavor.disclaimer && (
						<div className={styles.disclaimer}>{flavor.disclaimer}</div>
					)}
				</div>
			</div>
		</div>
	);
};
