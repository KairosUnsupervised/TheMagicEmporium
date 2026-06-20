import { Icon } from "@tme/library/src/item/icon";
import { generateIconUrl } from "@tme/library/src/misc/generateIconUrl";
import type { UniqueModifier } from "@tme/library/src/modifiers/blueprints/UniqueModifier";
import { ModifierType } from "@tme/library/src/modifiers/modifier.schema";
import { BreakpointSwap } from "../BreakpointSwap";
import { DiffText } from "../DiffText";
import styles from "./UniqueModifierDisplay.module.css";

export interface UniqueModifierDisplayProps {
	modifier: UniqueModifier;
	float: number;
}

interface UniqueBodyProps {
	modifier: UniqueModifier;
	float: number;
	previousFloat: number | null;
}

const UniqueBody = (props: UniqueBodyProps) => {
	const flavor = props.modifier.getDescription(props.float);
	const previousFlavor =
		props.previousFloat != null
			? props.modifier.getDescription(props.previousFloat)
			: null;

	return (
		<div className={styles.grid}>
			<div className={styles.iconWrapper}>
				<img src={generateIconUrl(Icon.Unique)} alt="Icon" />
			</div>
			<div>
				<div className={styles.label}>UNIQUE</div>
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

export const UniqueModifierDisplay = (props: UniqueModifierDisplayProps) => {
	const breakpoints = (
		props.modifier.schema as unknown as { breakpoints: { min: number }[] }
	).breakpoints;
	const activeBreakpoint = props.modifier.float.getBreakpoint(props.float);
	const activeIndex = breakpoints.findIndex(
		(bp) => bp.min === activeBreakpoint.min,
	);

	const items = breakpoints.map((bp) => (previousIndex: number | null) => (
		<UniqueBody
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
			type={ModifierType.Unique}
		/>
	);
};
