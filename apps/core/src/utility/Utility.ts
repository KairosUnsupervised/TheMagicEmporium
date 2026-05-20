import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details.ts";
import { Tag } from "@tme/library/src/item/tag.types.ts";
import { Restriction } from "@tme/library/src/modifiers/modifier.schema.ts";
import { registry } from "@tme/library/src/registry/Registry.ts";

export class Utility {
	private registry = registry;

	private modifiersOverview = () => {
		const byRestriction = (tag?: Tag) => ({
			primary: this.getModifiers(Restriction.Primary, tag),
			secondary: this.getModifiers(Restriction.Secondary, tag),
			tertiary: this.getModifiers(Restriction.Tertiary, tag),
		});
		const universal = (restriction: Restriction) =>
			this.registry.weighted.filter((modifier) => {
				return (
					modifier.application.restriction === restriction &&
					modifier.application.whitelistedBy.length === 0
				);
			});
		return {
			all: byRestriction(),
			universal: {
				primary: universal(Restriction.Primary),
				secondary: universal(Restriction.Secondary),
				tertiary: universal(Restriction.Tertiary),
			},
			weapons: byRestriction(Tag.Weapon),
			armor: byRestriction(Tag.Armor),
			accessories: byRestriction(Tag.Accessory),
		};
	};

	public modifiersTable = () => {
		const overview = this.modifiersOverview();
		const rows = Object.entries(overview).map(([category, data]) => ({
			Category: category,
			Primary: data.primary.length,
			Secondary: data.secondary.length,
			Tertiary: data.tertiary.length,
			Total: data.primary.length + data.secondary.length + data.tertiary.length,
		}));
		console.table(rows);
	};

	public tagsTable = () => {
		const overview = this.tagsOverview();
		const lookup = (data: ReturnType<typeof this.countTags>, tag: string) =>
			data.tags.find(([t]) => t === tag)?.[1] ?? 0;

		const allTags = Array.from(
			new Set([
				...overview.equipment.tags.map(([t]) => t),
				...overview.whitelist.tags.map(([t]) => t),
				...overview.blacklist.tags.map(([t]) => t),
				...overview.apply.tags.map(([t]) => t),
			]),
		).sort();

		const rows = allTags.map((tag) => ({
			Tag: tag,
			Equipment: lookup(overview.equipment, tag),
			Whitelist: lookup(overview.whitelist, tag),
			Blacklist: lookup(overview.blacklist, tag),
			Apply: lookup(overview.apply, tag),
		}));
		console.table(rows);
	};

	private tagsOverview = () => {
		return {
			equipment: this.countTags(
				Object.values(equipmentDetails).flatMap((item) => item.tags),
			),
			whitelist: this.countTags(
				this.registry.weighted.flatMap(
					(modifier) => modifier.application.whitelistedBy,
				),
			),
			blacklist: this.countTags(
				this.registry.weighted.flatMap(
					(modifier) => modifier.application.blacklistedBy,
				),
			),
			apply: this.countTags(
				this.registry.weighted.flatMap(
					(modifier) => modifier.application.applies,
				),
			),
		};
	};

	private countTags = (
		tags: string[],
	): { total: number; tags: [string, number][] } => {
		const counts = tags.reduce<Record<string, number>>((out, tag) => {
			out[tag] = (out[tag] ?? 0) + 1;
			return out;
		}, {});
		return {
			total: tags.length,
			tags: Object.entries(counts).sort(([, a], [, b]) => b - a),
		};
	};

	private getModifiers = (restriction: Restriction, tag?: Tag) => {
		return this.registry.weighted.filter((modifier) => {
			const matchesRestriction =
				modifier.application.restriction === restriction;
			if (!tag) return matchesRestriction;
			return (
				matchesRestriction && modifier.application.whitelistedBy.includes(tag)
			);
		});
	};
}
