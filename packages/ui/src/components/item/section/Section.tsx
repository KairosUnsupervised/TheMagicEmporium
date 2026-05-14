import { type AppliedModifier } from "@tme/library/src/modifiers/Modifier";
import { ModifierDisplay } from "../../modifiers/ModifierDisplay";
import styles from "./Section.module.css";

export interface SectionProps {
	title: string;
	modifiers: AppliedModifier[];
}

export const Section = (props: SectionProps) => {
	if (props.modifiers.length === 0) return null;

	return (
		<div>
			<div class={styles.header}>
				<div class={styles.rule}>
					<div class={styles.ruleLine} />
					<div class={styles.ruleLineFaint} />
				</div>
				<div class={styles.titleWrapper}>
					<svg width="10" height="10" viewBox="0 0 10 10">
						<polygon points="5,0 10,5 5,10 0,5" fill="#d4a64a" />
					</svg>
					<span class={styles.title}>
						{props.title}
					</span>
					<svg width="10" height="10" viewBox="0 0 10 10">
						<polygon points="5,0 10,5 5,10 0,5" fill="#d4a64a" />
					</svg>
				</div>
				<div class={styles.rule}>
					<div class={styles.ruleLine} />
					<div class={styles.ruleLineFaint} />
				</div>
			</div>
			{props.modifiers.map((applied, i) => (
				<div key={i} class={styles.item}>
					{i > 0 && <div class={styles.divider} />}
					<ModifierDisplay modifier={applied.modifier} data={applied.data} />
				</div>
			))}
		</div>
	);
};
