import { Icon } from "@tme/library/src/item/icon";
import type { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import {
	type Flavor,
	ModifierType,
} from "@tme/library/src/modifiers/modifier.schema";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { BreakpointSwap } from "../BreakpointSwap";
import icon from "./Icon.svg";
import styles from "./TieredModifierDisplay.module.css";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export interface TieredModifierDisplayProps {
	modifier: TieredModifier;
	data: unknown;
}

interface TieredBodyProps {
	flavor: Flavor;
	tierIndex: number;
	tierTotal: number;
}

const TieredBody = (props: TieredBodyProps) => {
	const iconSrc =
		typeof game !== "undefined" && game?.world?.id
			? `worlds/${game.world.id}/data/${namespace.core.id}/icons/${Icon.Tiered}`
			: icon;

	return (
		<div className={styles.grid}>
			<div className={styles.iconWrapper}>
				<img src={iconSrc} alt="Icon" />
			</div>
			<div>
				<div className={styles.labelRow}>
					<div className={styles.label}>TIERED</div>
					<span className={styles.tier}>
						{ROMAN[props.tierIndex]}
						<span className={styles.tierSep}>/</span>
						{ROMAN[props.tierTotal - 1]}
					</span>
				</div>
				<div className={styles.title}>{props.flavor.title}</div>
				<div className={styles.description}>{props.flavor.description}</div>
				{props.flavor.disclaimer && (
					<div className={styles.disclaimer}>{props.flavor.disclaimer}</div>
				)}
			</div>
		</div>
	);
};

export const TieredModifierDisplay = (props: TieredModifierDisplayProps) => {
	const schema = props.modifier.schema as unknown as {
		tiers: { min: number; flavor: Flavor }[];
	};
	const tiers = [...schema.tiers].sort((a, b) => a.min - b.min);

	const activeValue = props.modifier.dataManager.getBreakpoint(
		props.data,
	).value;
	const activeIndex = tiers.reduce(
		(best, tier, i) => (activeValue >= tier.min ? i : best),
		0,
	);

	const items = tiers.map((tier, i) => (
		<TieredBody flavor={tier.flavor} tierIndex={i} tierTotal={tiers.length} />
	));

	return (
		<BreakpointSwap
			items={items}
			defaultActiveIndex={activeIndex}
			type={ModifierType.Tiered}
		/>
	);
};
