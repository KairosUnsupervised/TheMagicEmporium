import { Icon } from "@tme/library/src/item/icon";
import { generateIconUrl } from "@tme/library/src/misc/generateIconUrl";
import type { IndependentModifier } from "@tme/library/src/modifiers/blueprints/IndependentModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointSwap } from "../BreakpointSwap";
import { DiffText } from "../DiffText";
import styles from "./IndependentModifierDisplay.module.css";

export interface IndependentModifierDisplayProps {
	modifier: IndependentModifier;
	float: number;
}

interface IndependentBodyProps {
	modifier: IndependentModifier;
	float: number;
	previousFloat: number | null;
}

const IndependentBody = (props: IndependentBodyProps) => {
	const flavor = props.modifier.getDescription(props.float);
	const previousFlavor =
		props.previousFloat != null
			? props.modifier.getDescription(props.previousFloat)
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
	const activeBreakpoint = props.modifier.float.getBreakpoint(props.float);
	const activeIndex = breakpoints.findIndex(
		(bp) => bp.min === activeBreakpoint.min,
	);

	const items = breakpoints.map((bp) => (previousIndex: number | null) => (
		<IndependentBody
			modifier={props.modifier}
			float={bp.min}
			previousFloat={
				previousIndex !== null ? breakpoints[previousIndex].min : null
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
