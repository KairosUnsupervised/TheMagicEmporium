import { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointSwap } from "../BreakpointSwap";
import styles from "./TieredModifierDisplay.module.css";
import icon from "./Icon.svg";
import {namespace} from "@tme/shared/src/namespaceConfig";
import {Icon} from "@tme/library/src/item/icon";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export interface TieredModifierDisplayProps {
	modifier: TieredModifier;
	data: unknown;
}

interface TieredBodyProps extends TieredModifierDisplayProps {
	tierIndex: number;
	tierTotal: number;
}

const TieredBody = (props: TieredBodyProps) => {
	const flavor = props.modifier.getDescription(props.data);
	const iconSrc = (typeof game !== "undefined" && game?.world?.id)
		? `worlds/${game.world.id}/data/${namespace.core.id}/icons/${Icon.Tiered}`
		: icon;

	return (
		<div class={styles.grid}>
			<div class={styles.iconWrapper}>
				<img src={iconSrc} alt="Icon" />
			</div>
			<div>
				<div class={styles.labelRow}>
					<div class={styles.label}>
						TIERED
					</div>
					<span class={styles.tier}>
						{ROMAN[props.tierIndex]}<span class={styles.tierSep}>/</span>{ROMAN[props.tierTotal - 1]}
					</span>
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

export const TieredModifierDisplay = (props: TieredModifierDisplayProps) => {
	const breakpoints = (props.modifier.schema as unknown as { breakpoints: { min: number }[] }).breakpoints;
	const activeBreakpoint = props.modifier.dataManager.getBreakpoint(props.data);
	const activeIndex = breakpoints.findIndex(bp => bp.min === activeBreakpoint.min);

	const items = breakpoints.map((bp, i) => (
		<TieredBody modifier={props.modifier} data={{ float: bp.min }} tierIndex={i} tierTotal={breakpoints.length} />
	));

	return <BreakpointSwap items={items} defaultActiveIndex={activeIndex} type={ModifierType.Tiered} />;
};
