import { Icon } from "@tme/library/src/item/icon";
import { generateIconUrl } from "@tme/library/src/misc/generateIconUrl";
import type { IndependentModifier } from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointSwap } from "../BreakpointSwap";
import { DiffText } from "../DiffText";
import styles from "./IndependentModifierDisplay.module.css";

export interface IndependentModifierDisplayProps {
	modifier: IndependentModifier;
	data: unknown;
}

interface IndependentBodyProps {
	modifier: IndependentModifier;
	data: unknown;
	previousData: unknown;
}

const IndependentBody = (props: IndependentBodyProps) => {
	const flavor = props.modifier.getDescription(props.data);
	const previousFlavor =
		props.previousData != null
			? props.modifier.getDescription(props.previousData)
			: null;

	return (
		<div className={styles.grid}>
			<div className={styles.iconWrapper}>
				<img src={generateIconUrl(Icon.Independent)} alt={"Icon"} />
			</div>
			<div>
				<div className={styles.label}>INDEPENDENT</div>
				<div className={styles.title}>
					<DiffText
						text={flavor.title}
						previousText={previousFlavor ? previousFlavor.title : null}
					/>
				</div>
				<div className={styles.description}>
					<DiffText
						text={flavor.description}
						previousText={previousFlavor ? previousFlavor.description : null}
					/>
				</div>
				{flavor.disclaimer && (
					<div className={styles.disclaimer}>
						<DiffText
							text={flavor.disclaimer}
							previousText={
								previousFlavor ? (previousFlavor.disclaimer ?? "") : null
							}
						/>
					</div>
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

	const items = breakpoints.map((bp) => (previousIndex: number | null) => (
		<IndependentBody
			modifier={props.modifier}
			data={{ float: bp.min }}
			previousData={
				previousIndex !== null
					? { float: breakpoints[previousIndex].min }
					: null
			}
		/>
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
