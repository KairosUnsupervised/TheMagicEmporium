import { Icon } from "@tme/library/src/item/icon";
import { generateIconUrl } from "@tme/library/src/misc/generateIconUrl";
import type { TieredModifier } from "@tme/library/src/modifiers/blueprints/TieredModifier";
import {
	type Flavor,
	ModifierType,
} from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointSwap } from "../BreakpointSwap";
import { DiffText } from "../DiffText";
import styles from "./TieredModifierDisplay.module.css";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export interface TieredModifierDisplayProps {
	modifier: TieredModifier;
	data: unknown;
}

interface TieredBodyProps {
	flavor: Flavor;
	previousFlavor: Flavor | null;
	tierIndex: number;
	tierTotal: number;
}

const TieredBody = (props: TieredBodyProps) => {
	return (
		<div className={styles.grid}>
			<div className={styles.iconWrapper}>
				<img src={generateIconUrl(Icon.Tiered)} alt="Icon" />
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
				<div className={styles.title}>
					<DiffText
						text={props.flavor.title}
						previousText={
							props.previousFlavor ? props.previousFlavor.title : null
						}
					/>
				</div>
				<div className={styles.description}>
					<DiffText
						text={props.flavor.description}
						previousText={
							props.previousFlavor ? props.previousFlavor.description : null
						}
					/>
				</div>
				{props.flavor.disclaimer && (
					<div className={styles.disclaimer}>
						<DiffText
							text={props.flavor.disclaimer}
							previousText={
								props.previousFlavor
									? (props.previousFlavor.disclaimer ?? "")
									: null
							}
						/>
					</div>
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

	const items = tiers.map((tier, i) => (previousIndex: number | null) => (
		<TieredBody
			flavor={tier.flavor}
			previousFlavor={
				previousIndex !== null ? tiers[previousIndex].flavor : null
			}
			tierIndex={i}
			tierTotal={tiers.length}
		/>
	));

	return (
		<BreakpointSwap
			key={props.modifier.identifier}
			items={items}
			defaultActiveIndex={activeIndex}
			type={ModifierType.Tiered}
		/>
	);
};
