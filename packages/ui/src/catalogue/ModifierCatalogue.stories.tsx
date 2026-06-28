import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "@tme/library/src/item/tag.types";
import { generateBackgroundUrl } from "@tme/library/src/misc/generateBackgroundUrl";
import type { Modifier } from "@tme/library/src/modifiers/Modifier";
import {
	ModifierType,
	Restriction,
} from "@tme/library/src/modifiers/modifier.schema";
import { registry } from "@tme/library/src/registry/Registry";
import { type JSX, useState } from "react";
import { ModifierDisplay } from "../components/modifiers/ModifierDisplay";

/**
 * A full modifier catalogue. Modifiers are read straight from the global
 * registry (populated in .storybook/preview.ts) and split into three stories by
 * slot restriction — Primary, Secondary, Tertiary — each grouped by modifier
 * type internally. Use the `float` control to scrub every modifier across its
 * breakpoints.
 */
interface ModifierCatalogueArgs {
	float: number;
}

const meta = {
	title: "Catalog/Modifiers",
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	argTypes: {
		float: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
	},
	args: { float: 1 },
} satisfies Meta<ModifierCatalogueArgs>;

export default meta;

type Story = StoryObj<ModifierCatalogueArgs>;

const typeOrder: ModifierType[] = [
	ModifierType.Unique,
	ModifierType.Linear,
	ModifierType.Independent,
	ModifierType.Tiered,
];

const typeLabel: Record<ModifierType, string> = {
	[ModifierType.Unique]: "Unique",
	[ModifierType.Linear]: "Linear",
	[ModifierType.Independent]: "Independent",
	[ModifierType.Tiered]: "Tiered",
};

const restrictionLabel: Record<Restriction, string> = {
	[Restriction.Primary]: "PRIMARY",
	[Restriction.Secondary]: "SECONDARY",
	[Restriction.Tertiary]: "TERTIARY",
};

const allModifiers = (): Modifier[] => {
	return Object.values(registry.mapped).filter(
		(modifier: Modifier): boolean => {
			return !modifier.identifier.startsWith("INTERNAL_");
		},
	);
};

const modifiersFor = (restriction: Restriction): Modifier[] => {
	return allModifiers().filter((modifier: Modifier): boolean => {
		return modifier.application.restriction === restriction;
	});
};

type Category = "all" | "none" | "weapons" | "armor" | "accessory";

const categoryOrder: Category[] = [
	"all",
	"none",
	"weapons",
	"armor",
	"accessory",
];

const categoryLabel: Record<Category, string> = {
	all: "ALL",
	none: "NO RESTRICTION",
	weapons: "WEAPONS",
	armor: "ARMOR",
	accessory: "ACCESSORY",
};

const categoryTags: Record<"weapons" | "armor" | "accessory", Tag[]> = {
	weapons: [
		Tag.Weapon,
		Tag.WeaponSimple,
		Tag.WeaponMartial,
		Tag.WeaponMelee,
		Tag.WeaponRanged,
	],
	armor: [
		Tag.Armor,
		Tag.ArmorWithArmorClass,
		Tag.ArmorLight,
		Tag.ArmorMedium,
		Tag.ArmorHeavy,
		Tag.ArmorClothes,
		Tag.ArmorStealthDisadvantage,
	],
	accessory: [Tag.Accessory],
};

/**
 * Filters by a modifier's whitelist directly: "none" matches modifiers with no
 * whitelist (generally available), while weapons/armor/accessory match only
 * modifiers that explicitly whitelist a tag of that category.
 */
const isEligible = (modifier: Modifier, category: Category): boolean => {
	if (category === "all") {
		return true;
	}
	const whitelist = modifier.application.whitelistedBy;
	if (category === "none") {
		return whitelist.length === 0;
	}
	return whitelist.some((tag: Tag): boolean => {
		return categoryTags[category].includes(tag);
	});
};

type BadgeVariant = "whitelist" | "blacklist";

interface ConditionBadge {
	emoji: string;
	text: string;
	variant: BadgeVariant;
}

/**
 * Maps a single tag to a badge. Weapons, armor, and accessories get a dedicated
 * emoji; everything else falls back to a placeholder that names the raw tag in
 * its popover. The verb reflects whether the tag is required (whitelist) or
 * excluded (blacklist).
 */
const tagToBadge = (tag: Tag, variant: BadgeVariant): ConditionBadge => {
	const verb = variant === "whitelist" ? "Requires" : "Excludes";
	if (tag.startsWith("WEAPON")) {
		return { emoji: "⚔️", text: `${verb} a Weapon`, variant };
	}
	if (tag.startsWith("ARMOR")) {
		return { emoji: "🛡️", text: `${verb} Armor`, variant };
	}
	if (tag === Tag.Accessory) {
		return { emoji: "💍", text: `${verb} an Accessory`, variant };
	}
	return { emoji: "🏷️", text: `${verb} tag: ${tag}`, variant };
};

const conditionBadges = (modifier: Modifier): ConditionBadge[] => {
	const seen = new Set<string>();
	const badges: ConditionBadge[] = [];
	const collect = (tags: Tag[], variant: BadgeVariant): void => {
		tags.forEach((tag: Tag) => {
			const badge = tagToBadge(tag, variant);
			if (seen.has(badge.text)) {
				return;
			}
			seen.add(badge.text);
			badges.push(badge);
		});
	};
	collect(modifier.application.whitelistedBy, "whitelist");
	collect(modifier.application.blacklistedBy, "blacklist");
	return badges;
};

interface ConditionBadgeIconProps {
	badge: ConditionBadge;
}

const ConditionBadgeIcon = (props: ConditionBadgeIconProps): JSX.Element => {
	const [open, setOpen] = useState(false);
	const blacklist = props.badge.variant === "blacklist";
	const accent = blacklist ? "rgba(220,80,80,0.6)" : "rgba(212,166,74,0.45)";
	return (
		<span
			style={{
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: "26px",
				height: "26px",
				fontSize: "16px",
				lineHeight: 1,
				cursor: "default",
				borderRadius: "50%",
				border: `1px solid ${accent}`,
				background: blacklist ? "rgba(220,80,80,0.12)" : "rgba(212,166,74,0.1)",
			}}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			{props.badge.emoji}
			{open && (
				<span
					style={{
						position: "absolute",
						left: "50%",
						bottom: "calc(100% + 8px)",
						transform: "translateX(-50%)",
						whiteSpace: "nowrap",
						background: "#0c0f24",
						border: `1px solid ${blacklist ? "rgba(220,80,80,0.6)" : "rgba(212,166,74,0.4)"}`,
						color: blacklist ? "#f0b4b4" : "#f3dca0",
						padding: "5px 11px",
						borderRadius: "4px",
						fontFamily: "Cinzel Decorative, serif",
						fontSize: "11px",
						letterSpacing: "0.5px",
						zIndex: 10,
						pointerEvents: "none",
					}}
				>
					{props.badge.text}
				</span>
			)}
		</span>
	);
};

interface BackgroundThumbProps {
	url: string;
}

const BackgroundThumb = (props: BackgroundThumbProps): JSX.Element => {
	const [open, setOpen] = useState(false);
	return (
		<span
			style={{ position: "relative", display: "inline-flex" }}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<span
				style={{
					display: "block",
					width: "42px",
					height: "70px",
					borderRadius: "3px",
					border: "1px solid rgba(212,166,74,0.45)",
					backgroundImage: `url(${props.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					cursor: "zoom-in",
				}}
			/>
			{open && (
				<span
					style={{
						position: "absolute",
						left: "50%",
						bottom: "calc(100% + 8px)",
						transform: "translateX(-50%)",
						display: "flex",
						gap: "10px",
						zIndex: 20,
						pointerEvents: "none",
					}}
				>
					<span
						style={{
							width: "210px",
							height: "350px",
							backgroundImage: `url(${props.url})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							border: "1px solid rgba(212,166,74,0.5)",
							borderRadius: "6px",
							boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
						}}
					/>
					<span
						style={{
							position: "relative",
							width: "210px",
							height: "350px",
							overflow: "hidden",
							backgroundImage: `url(${props.url})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							border: "1px solid rgba(212,166,74,0.5)",
							borderRadius: "6px",
							boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
						}}
					>
						<span
							style={{
								position: "absolute",
								inset: 0,
								backdropFilter: "blur(5px) brightness(0.3)",
								background:
									"radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(5,7,20,0.7) 100%)",
							}}
						/>
					</span>
				</span>
			)}
		</span>
	);
};

interface RestrictionCatalogueProps {
	restriction: Restriction;
	float: number;
}

const RestrictionCatalogue = (
	props: RestrictionCatalogueProps,
): JSX.Element => {
	const restriction = props.restriction;
	const float = props.float;
	const [category, setCategory] = useState<Category>("all");
	const modifiers = modifiersFor(restriction).filter(
		(modifier: Modifier): boolean => isEligible(modifier, category),
	);
	const total = allModifiers().length;

	return (
		<div
			style={{
				background: "#040510",
				padding: "40px",
				display: "flex",
				flexDirection: "column",
				gap: "48px",
			}}
		>
			<header
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "16px",
					borderBottom: "1px solid rgba(212,166,74,0.25)",
					paddingBottom: "24px",
				}}
			>
				<h1
					style={{
						margin: 0,
						fontFamily: "Cinzel Decorative, serif",
						fontSize: "64px",
						lineHeight: 1,
						letterSpacing: "4px",
						color: "#d4a64a",
					}}
				>
					{restrictionLabel[restriction]}
				</h1>
				<div style={{ display: "flex", gap: "8px" }}>
					{categoryOrder.map((option) => {
						const active = option === category;
						return (
							<button
								key={option}
								type="button"
								onClick={() => setCategory(option)}
								style={{
									fontFamily: "Cinzel Decorative, serif",
									fontSize: "12px",
									letterSpacing: "1px",
									padding: "8px 18px",
									borderRadius: "4px",
									cursor: "pointer",
									color: active ? "#040510" : "#d4a64a",
									background: active ? "#d4a64a" : "transparent",
									border: "1px solid rgba(212,166,74,0.5)",
								}}
							>
								{categoryLabel[option]}
							</button>
						);
					})}
				</div>
				<p
					style={{
						margin: 0,
						fontFamily: "Cinzel Decorative, serif",
						fontSize: "16px",
						letterSpacing: "1px",
						color: "rgba(255,255,255,0.6)",
					}}
				>
					<span style={{ color: "#d4a64a" }}>{modifiers.length}</span> shown
					<span style={{ margin: "0 10px", opacity: 0.4 }}>·</span>
					<span style={{ color: "#d4a64a" }}>{total}</span> modifiers total
				</p>
			</header>
			{typeOrder.map((type) => {
				const group = modifiers.filter(
					(modifier) => modifier.schema.type === type,
				);
				if (group.length === 0) {
					return null;
				}
				return (
					<section
						key={type}
						style={{ display: "flex", flexDirection: "column", gap: "16px" }}
					>
						<h2
							style={{
								margin: 0,
								fontFamily: "Cinzel Decorative, serif",
								fontSize: "16px",
								letterSpacing: "1px",
								textTransform: "uppercase",
								color: "#d4a64a",
							}}
						>
							{typeLabel[type]}
							<span
								style={{
									marginLeft: "10px",
									fontSize: "11px",
									color: "rgba(212,166,74,0.5)",
								}}
							>
								{group.length}
							</span>
						</h2>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "20px",
								alignItems: "flex-start",
							}}
						>
							{group.map((modifier) => {
								const badges = conditionBadges(modifier);
								const background = modifier.getBackground(float);
								const backgroundUrl = background
									? generateBackgroundUrl(background)
									: null;
								return (
									<div
										key={modifier.identifier}
										style={{
											display: "flex",
											alignItems: "flex-start",
											gap: "10px",
										}}
									>
										<div style={{ width: "460px" }}>
											<ModifierDisplay modifier={modifier} float={float} />
										</div>
										{backgroundUrl && (
											<div style={{ paddingTop: "12px" }}>
												<BackgroundThumb url={backgroundUrl} />
											</div>
										)}
										{badges.length > 0 && (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
													gap: "8px",
													paddingTop: "12px",
												}}
											>
												{badges.map((badge) => (
													<ConditionBadgeIcon key={badge.text} badge={badge} />
												))}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</section>
				);
			})}
		</div>
	);
};

/** Modifiers restricted to the PRIMARY slot. */
export const Primary: Story = {
	render: (args) => {
		return (
			<RestrictionCatalogue
				restriction={Restriction.Primary}
				float={args.float}
			/>
		);
	},
};

/** Modifiers restricted to the SECONDARY slot. */
export const Secondary: Story = {
	render: (args) => {
		return (
			<RestrictionCatalogue
				restriction={Restriction.Secondary}
				float={args.float}
			/>
		);
	},
};

/** Modifiers restricted to the TERTIARY slot. */
export const Tertiary: Story = {
	render: (args) => {
		return (
			<RestrictionCatalogue
				restriction={Restriction.Tertiary}
				float={args.float}
			/>
		);
	},
};
