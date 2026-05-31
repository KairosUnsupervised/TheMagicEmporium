export interface Flavor {
	title: string;
	description: string;
	disclaimer: string | null;
	background: string | null;
}

export const flavorSchema = {
	title: "Flavor",
	description:
		"Display text and optional visual configuration for a modifier or breakpoint tier",
	examples: [
		{
			title: "Bloodthirsty",
			description:
				"On direct creature kill, you gain advantage on your next attack",
		},
		{
			title: "Relentlessly Determined",
			description:
				"You can reroll 1-3's on your weapon induced damage dice, up to 3 rerolls",
			background: "%BACKGROUNDS%/tertiary/determined.jpg",
		},
	],
	type: "object",
	required: ["title", "description"],
	properties: {
		title: {
			description:
				"The display name shown in the UI. Use the base modifier name only — no suffixes, roman numerals, or amounts. For multi-tier modifiers, prefix higher tiers with an escalating adjective (e.g. 'Embracement' → 'Vital Embracement' → 'Transcendent Embracement')",
			type: "string",
		},
		description: {
			description:
				"The body text explaining the modifier's effect. Supports {amount} interpolation in Linear modifiers. Never end with a period — the UI does not use sentence-ending punctuation",
			type: "string",
		},
		disclaimer: {
			description:
				"Optional small-print shown beneath the description, e.g. to clarify edge cases. Never end with a period",
			type: ["string", "null"],
			default: null,
		},
		background: {
			description:
				"Path to the background image used in the item card display. Supports %BACKGROUNDS% interpolation for module images",
			type: ["string", "null"],
			default: null,
		},
	},
};
