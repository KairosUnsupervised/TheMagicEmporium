import { Tag } from './tag.types';
import { Equipment } from './equipment.types';
import { equipmentAdjectives } from './equipment.adjectives';

enum FoundryType {
	Weapon = 'weapon',
	Equipment = 'equipment',
}

interface EquipmentDetail {
	title: string;
	altTitles?: string[];
	adjectives: string[];
	short: string | null;
	value: number;
	tags: Tag[];
	weight: number;
	foundry: {
		img: string;
		type: FoundryType;
		system: object;
	};
}

export const equipmentDetails: {
	[key in Equipment]: EquipmentDetail;
} = {
	// Light
	[Equipment.PaddedArmor]: {
		title: 'Padded Armor',
		altTitles: [
			'Padded Armor',
			'Quilted Armor',
			'Stuffed Jerkin',
			'Padded Tunic',
			'Reinforced Doublet',
			'Cushioned Garb',
			'Layered Protection Wear',
			'Stuffed Gambeson',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: 'Padded',
		value: 5,
		weight: 8,
		tags: [Tag.Armor, Tag.ArmorLight, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'light', baseItem: 'padded' },
				armor: {
					value: 11,
					dex: null,
				},
				properties: ['stealthDisadvantage'],
			},
		},
	},
	[Equipment.LeatherArmor]: {
		title: 'Leather Armor',
		altTitles: [
			'Leather',
			'Leather Armor',
			'Hardened Leather',
			'Boiled Leather',
			'Supple Hide Coat',
			'Leather Jerkin',
			'Tanned Hide Armor',
			'Cured Leather Protection',
			'Tooled Leather Suit',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: 'Leather',
		value: 10,
		weight: 10,
		tags: [Tag.Armor, Tag.ArmorLight, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'light', baseItem: 'leather' },
				armor: {
					value: 11,
					dex: null,
				},
			},
		},
	},
	[Equipment.StuddedLeatherArmor]: {
		title: 'Studded Leather Armor',
		altTitles: [
			'Studded Leather Armor',
			'Studded Armor',
			'Riveted Leather',
			'Reinforced Coat',
			'Metal-Studded Jerkin',
			'Nail-Reinforced Leather',
			'Spiked Leather Armor',
			'Buckled Leather Protection',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: 'Studded Leather',
		value: 45,
		weight: 13,
		tags: [Tag.Armor, Tag.ArmorLight, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'light', baseItem: 'studded' },
				armor: {
					value: 12,
					dex: null,
				},
			},
		},
	},
	// Medium
	[Equipment.HideArmor]: {
		title: 'Hide Armor',
		altTitles: [
			'Hide Armor',
			'Hide',
			'Beast Hide Coat',
			'Cured Hide Protection',
			'Hide Garb',
			'Hide Jerkin',
			'Hide Suit',
			'Beast Hide',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: 'Hide',
		value: 10,
		weight: 12,
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'medium', baseItem: 'hide' },
				armor: {
					value: 12,
					dex: 2,
				},
			},
		},
	},
	[Equipment.ChainShirt]: {
		title: 'Chain Shirt',
		altTitles: [
			'Chain Shirt',
			'Chain',
			'Mail Shirt',
			'Chainmail Vest',
			'Interlocked Chain',
			'Iron Link Armor',
			'Chain Mail Tunic',
			'Linked Metal Shirt',
			'Woven Chain Garment',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: null,
		value: 50,
		weight: 20,
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'medium', baseItem: 'chainshirt' },
				armor: {
					value: 13,
					dex: 2,
				},
			},
		},
	},
	[Equipment.ScaleMail]: {
		title: 'Scale Mail',
		altTitles: [
			'Scale Mail',
			'Scale',
			'Scaled Armor',
			'Dragon Scale Coat',
			'Overlapping Scales',
			'Scale Plating',
			'Scaled Hide Armor',
			'Segmented Scale Suit',
			'Lacquered Scale Armor',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: null,
		value: 50,
		weight: 45,
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'medium', baseItem: 'scalemail' },
				armor: {
					value: 14,
					dex: 2,
				},
				properties: ['stealthDisadvantage'],
			},
		},
	},
	[Equipment.Breastplate]: {
		title: 'Breastplate',
		altTitles: [
			'Breastplate',
			'Steel Breastplate',
			'Cuirass',
			'Armored Chest Plate',
			'Chest Guard',
			'Fitted Metal Plate',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: null,
		value: 400,
		weight: 20,
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'medium', baseItem: 'breastplate' },
				armor: {
					value: 14,
					dex: 2,
				},
			},
		},
	},
	[Equipment.HalfPlate]: {
		title: 'Half Plate',
		altTitles: [
			'Half Plate',
			'Half Plate Armor',
			'Segmented Plate',
			'Partial Plate Suit',
			'Upper Body Plate',
			'Composite Plate Armor',
			'Sectioned Plate Guard',
			'Hybrid Plate Protection',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: null,
		value: 750,
		weight: 40,
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'medium', baseItem: 'halfplate' },
				armor: {
					value: 15,
					dex: 2,
				},
				properties: ['stealthDisadvantage'],
			},
		},
	},
	[Equipment.RingMail]: {
		title: 'Ring Mail',
		altTitles: [
			'Ring Mail',
			'Ringed Armor',
			'Iron Ring Coat',
			'Reinforced Ring Suit',
			'Riveted Ring Armor',
			'Ring-Plated Garment',
			'Heavy Ring Protection',
			'Banded Ring Mail',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: null,
		value: 30,
		weight: 40,
		tags: [Tag.Armor, Tag.ArmorHeavy, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'heavy', baseItem: 'ringmail' },
				armor: {
					value: 14,
					dex: 0,
				},
				properties: ['stealthDisadvantage'],
			},
		},
	},
	[Equipment.ChainMail]: {
		title: 'Chain Mail',
		altTitles: [
			'Chain Mail',
			'Chain',
			'Full Chainmail',
			'Interlocked Chain Suit',
			'Heavy Chain Armor',
			'Mesh Chain Coat',
			'Iron Chain Mail',
			'Linked Chain Protection',
			'Comprehensive Chain Suit',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: null,
		value: 75,
		weight: 55,
		tags: [Tag.Armor, Tag.ArmorHeavy, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'heavy', baseItem: 'chainmail' },
				armor: {
					value: 16,
					dex: 0,
				},
				properties: ['stealthDisadvantage'],
				strength: 13,
			},
		},
	},
	[Equipment.SplintArmor]: {
		title: 'Splint Armor',
		altTitles: [
			'Splint Armor',
			'Splint',
			'Splinted Plate',
			'Banded Plate Armor',
			'Reinforced Splints',
			'Segmented Splint Suit',
			'Strip Plate Armor',
			'Overlapping Splint Plates',
			'Riveted Strip Armor',
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: 'Splint',
		value: 200,
		weight: 60,
		tags: [Tag.Armor, Tag.ArmorHeavy, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'heavy', baseItem: 'splint' },
				armor: {
					value: 17,
					dex: 0,
				},
				properties: ['stealthDisadvantage'],
				strength: 15,
			},
		},
	},
	[Equipment.PlateArmor]: {
		title: 'Plate Armor',
		altTitles: [
			'Plate Armor',
			'Full Plate',
			'Polished Plate Suit',
			'Steel Plate Armor',
			'Gleaming Full Plate',
			'Complete Plate Protection',
			'Reinforced Plate Suit',
			"Champion's Plate Armor",
		],
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: 'Plate',
		value: 1500,
		weight: 65,
		tags: [Tag.Armor, Tag.ArmorHeavy, Tag.ArmorWithArmorClass],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'heavy', baseItem: 'plate' },
				armor: {
					value: 18,
					dex: 0,
				},
				properties: ['stealthDisadvantage'],
				strength: 15,
			},
		},
	},
	// Armor Clothes
	[Equipment.CommonerClothes]: {
		title: 'Commoner Clothes',
		adjectives: equipmentAdjectives.armorWithoutArmorClass,
		short: 'Commoner',
		value: 1,
		tags: [Tag.Armor, Tag.ArmorClothes],
		weight: 3,
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'clothing', baseItem: '' },
			},
		},
	},
	[Equipment.FineClothes]: {
		title: 'Fine Clothes',
		adjectives: equipmentAdjectives.armorWithoutArmorClass,
		short: 'Fine',
		value: 3,
		tags: [Tag.Armor, Tag.ArmorClothes],
		weight: 6,
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'clothing', baseItem: '' },
			},
		},
	},
	[Equipment.NobleClothes]: {
		title: 'Noble Clothes',
		adjectives: equipmentAdjectives.armorWithoutArmorClass,
		short: 'Noble',
		value: 10,
		tags: [Tag.Armor, Tag.ArmorClothes],
		weight: 7,
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'clothing', baseItem: '' },
			},
		},
	},
	[Equipment.RoyalClothes]: {
		title: 'Royal Clothes',
		adjectives: equipmentAdjectives.armorWithoutArmorClass,
		short: 'Royal',
		value: 30,
		tags: [Tag.Armor, Tag.ArmorClothes],
		weight: 9,
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'clothing', baseItem: '' },
			},
		},
	},
	// Shield
	[Equipment.Shield]: {
		title: 'Shield',
		adjectives: equipmentAdjectives.armorWithArmorClass,
		short: null,
		value: 10,
		tags: [Tag.Armor],
		weight: 6,
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'shield', baseItem: 'shield' },
				armor: {
					value: 2,
					dex: null,
					magicalBonus: null,
				},
			},
		},
	},
	// Accessories
	[Equipment.Ring]: {
		title: 'Ring',
		adjectives: equipmentAdjectives.accessory,
		short: null,
		value: 15,
		tags: [Tag.Accessory],
		weight: 0.1,
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'trinket', baseItem: '', label: 'Trinket' },
			},
		},
	},
	[Equipment.Amulet]: {
		title: 'Amulet',
		adjectives: equipmentAdjectives.accessory,
		short: null,
		value: 30,
		tags: [Tag.Accessory],
		weight: 1,
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'trinket', baseItem: '', label: 'Trinket' },
			},
		},
	},
	[Equipment.Relic]: {
		title: 'Relic',
		adjectives: equipmentAdjectives.accessory,
		short: null,
		value: 50,
		tags: [Tag.Accessory],
		weight: 2,
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Equipment,
			system: {
				type: { value: 'trinket', baseItem: '', label: 'Trinket' },
			},
		},
	},
	// Simple Melee Weapons
	[Equipment.Club]: {
		title: 'Club',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'club' },
				properties: ['lgt'],
				ability: 'dex',
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d4[bludgeoning] + @mod', 'bludgeoning']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Dagger]: {
		title: 'Dagger',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 2,
		weight: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'dagger' },
				properties: ['fin', 'lgt', 'thr'],
				ability: 'dex',
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 20,
					long: 60,
					units: 'ft',
				},
				damage: {
					parts: [['1d4[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Greatclub]: {
		title: 'Greatclub',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		weight: 10,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'greatclub' },
				properties: ['two'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d8 + @mod', 'bludgeoning']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Handaxe]: {
		title: 'Handaxe',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'handaxe' },
				properties: ['lgt', 'thr'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 20,
					long: 60,
					units: 'ft',
				},
				damage: {
					parts: [['1d6 + @mod', 'slashing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Javelin]: {
		title: 'Javelin',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'javelin' },
				properties: ['thr'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 30,
					long: 120,
					units: 'ft',
				},
				damage: {
					parts: [['1d6 + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.LightHammer]: {
		title: 'Light Hammer',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 2,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'lighthammer' },
				properties: ['lgt', 'thr'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 20,
					long: 60,
					units: 'ft',
				},
				damage: {
					parts: [['1d4 + @mod', 'bludgeoning']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Mace]: {
		title: 'Mace',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		weight: 4,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'mace' },
				properties: [],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d6 + @mod', 'bludgeoning']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Quarterstaff]: {
		title: 'Quarterstaff',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		weight: 4,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'quarterstaff' },
				properties: ['ver'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d6 + @mod', 'bludgeoning']],
					versatile: '1d8 + @mod',
				},
			},
		},
	},
	[Equipment.Sickle]: {
		title: 'Sickle',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'sickle' },
				properties: ['lgt'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d4 + @mod', 'slashing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Spear]: {
		title: 'Spear',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		weight: 3,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleM', baseItem: 'spear' },
				properties: ['thr', 'ver'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 20,
					long: 60,
					units: 'ft',
				},
				damage: {
					parts: [['1d6[piercing] + @mod', 'piercing']],
					versatile: '1d8[piercing] + @mod',
				},
			},
		},
	},
	// Simple Ranged Weapon
	[Equipment.CrosswbowLight]: {
		title: 'Light Crossbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 25,
		weight: 5,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleR', baseItem: 'lightcrossbow' },
				properties: ['amm', 'lod', 'two'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 80,
					long: 320,
					units: 'ft',
				},
				damage: {
					parts: [['1d8[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Dart]: {
		title: 'Dart',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 1,
		weight: 0.25,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleR', baseItem: 'dart' },
				properties: ['fin', 'thr'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 20,
					long: 60,
					units: 'ft',
				},
				damage: {
					parts: [['1d4[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Shortbow]: {
		title: 'Shortbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 25,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleR', baseItem: 'shortbow' },
				properties: ['amm', 'two'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 80,
					long: 320,
					units: 'ft',
				},
				damage: {
					parts: [['1d6[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Sling]: {
		title: 'Sling',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 1,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'simpleR', baseItem: 'sling' },
				properties: ['amm'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 30,
					long: 120,
					units: 'ft',
				},
				damage: {
					parts: [['1d4[bludgeoning] + @mod', 'bludgeoning']],
					versatile: '',
				},
			},
		},
	},
	// Martial Melee Weapons
	[Equipment.Battleaxe]: {
		title: 'Battleaxe',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		weight: 4,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'battleaxe' },
				properties: ['ver'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d8 + @mod', 'slashing']],
					versatile: '1d10 + @mod',
				},
			},
		},
	},
	[Equipment.Flail]: {
		title: 'Flail',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'flail' },
				properties: [],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d8 + @mod', 'bludgeoning']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Glaive]: {
		title: 'Glaive',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 20,
		weight: 6,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'glaive' },
				properties: ['hvy', 'rch', 'two'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 10,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d10 + @mod', 'slashing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Greataxe]: {
		title: 'Greataxe',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 30,
		weight: 7,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'greataxe' },
				properties: ['hvy', 'two'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d12 + @mod', 'slashing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Greatsword]: {
		title: 'Greatsword',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 50,
		weight: 6,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'greatsword' },
				properties: ['hvy', 'two'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['2d6 + @mod', 'slashing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Halberd]: {
		title: 'Halberd',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 20,
		weight: 6,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'halberd' },
				properties: ['hvy', 'two', 'rch'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 10,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d10 + @mod', 'slashing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Lance]: {
		title: 'Lance',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		weight: 6,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'lance' },
				properties: ['rch', 'spc'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 10,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d12 + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Longsword]: {
		title: 'Longsword',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 15,
		weight: 3,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'longsword' },
				properties: ['ver'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d8 + @mod', 'slashing']],
					versatile: '1d10 + @mod',
				},
			},
		},
	},
	[Equipment.Maul]: {
		title: 'Maul',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		weight: 10,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'maul' },
				properties: ['hvy', 'two'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['2d6[bludgeoning] + @mod', 'bludgeoning']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Morningstar]: {
		title: 'Morningstar',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 15,
		weight: 4,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'morningstar' },
				properties: [],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d8[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Pike]: {
		title: 'Pike',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		weight: 18,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'pike' },
				properties: ['hvy', 'rch', 'two'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 10,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d10[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Rapier]: {
		title: 'Rapier',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 25,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'rapier' },
				properties: ['fin'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d8[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Scimitar]: {
		title: 'Scimitar',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 25,
		weight: 3,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'scimitar' },
				properties: ['fin', 'lgt'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d6[slashing] + @mod', 'slashing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Shortsword]: {
		title: 'Shortsword',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'shortsword' },
				properties: ['fin', 'lgt'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d6[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Trident]: {
		title: 'Trident',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		weight: 4,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'trident' },
				properties: ['thr', 'ver'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 20,
					long: 60,
					units: 'ft',
				},
				damage: {
					parts: [['1d6[piercing] + @mod', 'piercing']],
					versatile: '1d8[piercing] + @mod',
				},
			},
		},
	},
	[Equipment.WarPick]: {
		title: 'War pick',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'warpick' },
				properties: [],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d8[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Warhammer]: {
		title: 'Warhammer',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 15,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'warhammer' },
				properties: ['ver'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d8[bludgeoning] + @mod', 'bludgeoning']],
					versatile: '1d10[bludgeoning] + @mod',
				},
			},
		},
	},
	[Equipment.Whip]: {
		title: 'Whip',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 2,
		weight: 3,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialM', baseItem: 'whip' },
				properties: ['fin', 'rch'],
				actionType: 'mwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 10,
					long: null,
					units: 'ft',
				},
				damage: {
					parts: [['1d4[slashing] + @mod', 'slashing']],
					versatile: '',
				},
			},
		},
	},
	// Martial Ranged Weapons
	[Equipment.Blowgun]: {
		title: 'Blowgun',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		weight: 1,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialR', baseItem: 'blowgun' },
				properties: ['amm', 'lod'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 25,
					long: 100,
					units: 'ft',
				},
				damage: {
					parts: [['+ @mod + 1', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.CrossbowHand]: {
		title: 'Hand Crossbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 75,
		weight: 3,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialR', baseItem: 'handcrossbow' },
				properties: ['amm', 'lod', 'lgt'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 30,
					long: 120,
					units: 'ft',
				},
				damage: {
					parts: [['1d6[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.CrossbowHeavy]: {
		title: 'Heavy Crossbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 50,
		weight: 18,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialR', baseItem: 'heavycrossbow' },
				properties: ['amm', 'hvy', 'lod', 'two'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 100,
					long: 400,
					units: 'ft',
				},
				damage: {
					parts: [['1d10[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Longbow]: {
		title: 'Longbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 50,
		weight: 2,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialR', baseItem: 'longbow' },
				properties: ['amm', 'hvy', 'two'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 150,
					long: 600,
					units: 'ft',
				},
				damage: {
					parts: [['1d8[piercing] + @mod', 'piercing']],
					versatile: '',
				},
			},
		},
	},
	[Equipment.Net]: {
		title: 'Net',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 1,
		weight: 3,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		foundry: {
			img: 'TODO.png',
			type: FoundryType.Weapon,
			system: {
				type: { value: 'martialR', baseItem: 'net' },
				properties: ['spc', 'thr'],
				ability: 'dex',
				actionType: 'rwak',
				activation: {
					type: 'action',
					cost: 1,
					condition: '',
				},
				range: {
					value: 5,
					long: 15,
					units: 'ft',
				},
				damage: {
					parts: [['+ @mod', 'bludgeoning']],
					versatile: '',
				},
			},
		},
	},
};
