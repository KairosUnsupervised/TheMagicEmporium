import { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import {
	Flavor,
	ModifierType,
} from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointSwap } from "../BreakpointSwap";
import styles from "./TieredModifierDisplay.module.css";
import icon from "./Icon.svg";
import { namespace } from "@tme/shared/src/namespaceConfig";
import { Icon } from "@tme/library/src/item/icon";

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
		<div class={styles.grid}>
			<div class={styles.iconWrapper}>
				<img src={iconSrc} alt="Icon" />
			</div>
			<div>
				<div class={styles.labelRow}>
					<div class={styles.label}>TIERED</div>
					<span class={styles.tier}>
						{ROMAN[props.tierIndex]}
						<span class={styles.tierSep}>/</span>
						{ROMAN[props.tierTotal - 1]}
					</span>
				</div>
				<div class={styles.title}>{props.flavor.title}</div>
				<div class={styles.description}>{props.flavor.description}</div>
				{props.flavor.disclaimer && (
					<div class={styles.disclaimer}>{props.flavor.disclaimer}</div>
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
