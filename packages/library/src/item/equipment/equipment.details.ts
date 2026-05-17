import {Tag} from '../tag.types';
import {Equipment} from './equipment.types';
import {equipmentAdjectives} from './equipment.adjectives';
import {ActivitySchema} from "../../effects/activity/activity.schema";
import {Icon} from "../icon";
import {Item5e} from "@tme/shared/src/types/item5e";
import {DeepPartial} from "@tme/shared/src/helpers/deepPartial.types";

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
	icon: Icon;
	foundry: {
		type: FoundryType;
		system: DeepPartial<Item5e["system"]>;
		activities?: ActivitySchema[]
	};
}

const defaultAttackActivities: ActivitySchema[] = [{type: "attack", sort: -100000}];

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
		tags: [Tag.Armor, Tag.ArmorLight, Tag.ArmorWithArmorClass, Tag.ArmorStealthDisadvantage],
		icon: Icon.Padded,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 8
				},
				type: {value: 'light', baseItem: 'padded'},
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
		tags: [Tag.Armor, Tag.ArmorLight, Tag.ArmorWithArmorClass],
		icon: Icon.Leather,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 10
				},
				type: {value: 'light', baseItem: 'leather'},
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
		tags: [Tag.Armor, Tag.ArmorLight, Tag.ArmorWithArmorClass],
		icon: Icon.StuddedLeather,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 13
				},
				type: {value: 'light', baseItem: 'studded'},
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
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass],
		icon: Icon.Hide,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 12
				},
				type: {value: 'medium', baseItem: 'hide'},
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
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass],
		icon: Icon.ChainShirt,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 20
				},
				type: {value: 'medium', baseItem: 'chainshirt'},
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
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass, Tag.ArmorStealthDisadvantage],
		icon: Icon.ScaleMail,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 45
				},
				type: {value: 'medium', baseItem: 'scalemail'},
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
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass],
		icon: Icon.Breastplate,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 20
				},
				type: {value: 'medium', baseItem: 'breastplate'},
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
		tags: [Tag.Armor, Tag.ArmorMedium, Tag.ArmorWithArmorClass, Tag.ArmorStealthDisadvantage],
		icon: Icon.HalfPlate,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 40
				},
				type: {value: 'medium', baseItem: 'halfplate'},
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
		tags: [Tag.Armor, Tag.ArmorHeavy, Tag.ArmorWithArmorClass, Tag.ArmorStealthDisadvantage],
		icon: Icon.RingMail,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 40
				},
				type: {value: 'heavy', baseItem: 'ringmail'},
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
		tags: [Tag.Armor, Tag.ArmorHeavy, Tag.ArmorWithArmorClass, Tag.ArmorStealthDisadvantage],
		icon: Icon.ChainMail,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 55
				},
				type: {value: 'heavy', baseItem: 'chainmail'},
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
		tags: [Tag.Armor, Tag.ArmorHeavy, Tag.ArmorWithArmorClass, Tag.ArmorStealthDisadvantage],
		icon: Icon.Splint,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 60
				},
				type: {value: 'heavy', baseItem: 'splint'},
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
		tags: [Tag.Armor, Tag.ArmorHeavy, Tag.ArmorWithArmorClass, Tag.ArmorStealthDisadvantage],
		icon: Icon.Plate,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 65
				},
				type: {value: 'heavy', baseItem: 'plate'},
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
		icon: Icon.CommonClothes,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 3
				},
				type: {value: 'clothing', baseItem: ''},
			},
		},
	},
	[Equipment.FineClothes]: {
		title: 'Fine Clothes',
		adjectives: equipmentAdjectives.armorWithoutArmorClass,
		short: 'Fine',
		value: 3,
		tags: [Tag.Armor, Tag.ArmorClothes],
		icon: Icon.FineClothes,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 6
				},
				type: {value: 'clothing', baseItem: ''},
			},
		},
	},
	[Equipment.NobleClothes]: {
		title: 'Noble Clothes',
		adjectives: equipmentAdjectives.armorWithoutArmorClass,
		short: 'Noble',
		value: 10,
		tags: [Tag.Armor, Tag.ArmorClothes],
		icon: Icon.NobleClothes,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 7
				},
				type: {value: 'clothing', baseItem: ''},
			},
		},
	},
	[Equipment.RoyalClothes]: {
		title: 'Royal Clothes',
		adjectives: equipmentAdjectives.armorWithoutArmorClass,
		short: 'Royal',
		value: 30,
		tags: [Tag.Armor, Tag.ArmorClothes],
		icon: Icon.RoyalClothes,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 9
				},
				type: {value: 'clothing', baseItem: ''},
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
		icon: Icon.Shield,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 6
				},
				type: {value: 'shield', baseItem: 'shield'},
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
		icon: Icon.Ring,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 0.1
				},
				type: {value: 'trinket', baseItem: '', label: 'Trinket'},
			},
		},
	},
	[Equipment.Amulet]: {
		title: 'Amulet',
		adjectives: equipmentAdjectives.accessory,
		short: null,
		value: 30,
		tags: [Tag.Accessory],
		icon: Icon.Amulet,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 1
				},
				type: {value: 'trinket', baseItem: '', label: 'Trinket'},
			},
		},
	},
	[Equipment.Relic]: {
		title: 'Relic',
		adjectives: equipmentAdjectives.accessory,
		short: null,
		value: 50,
		tags: [Tag.Accessory],
		icon: Icon.Relic,
		foundry: {
			type: FoundryType.Equipment,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'trinket', baseItem: '', label: 'Trinket'},
			},
		},
	},
	// Simple Melee Weapons
	[Equipment.Club]: {
		title: 'Club',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.Club,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'simpleM', baseItem: 'club'},
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
					base: {
						number: 1,
						denomination: 4,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
	[Equipment.Dagger]: {
		title: 'Dagger',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.Dagger,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 1
				},
				type: {value: 'simpleM', baseItem: 'dagger'},
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
					base: {
						number: 1,
						denomination: 4,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Greatclub]: {
		title: 'Greatclub',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.GreatClub,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 10
				},
				type: {value: 'simpleM', baseItem: 'greatclub'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
	[Equipment.Handaxe]: {
		title: 'Handaxe',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.Handaxe,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'simpleM', baseItem: 'handaxe'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Javelin]: {
		title: 'Javelin',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.Javelin,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'simpleM', baseItem: 'javelin'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.LightHammer]: {
		title: 'Light Hammer',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 2,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.LightHammer,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'simpleM', baseItem: 'lighthammer'},
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
					base: {
						number: 1,
						denomination: 4,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
	[Equipment.Mace]: {
		title: 'Mace',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.Mace,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 4
				},
				type: {value: 'simpleM', baseItem: 'mace'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
	[Equipment.Quarterstaff]: {
		title: 'Quarterstaff',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.Quarterstaff,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 4
				},
				type: {value: 'simpleM', baseItem: 'quarterstaff'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['bludgeoning']
					},
					versatile: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
	[Equipment.Sickle]: {
		title: 'Sickle',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.Sickle,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'simpleM', baseItem: 'sickle'},
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
					base: {
						number: 1,
						denomination: 4,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Spear]: {
		title: 'Spear',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponMelee],
		icon: Icon.Spear,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 3
				},
				type: {value: 'simpleM', baseItem: 'spear'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['piercing']
					},
					versatile: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['piercing']
					}
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
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponRanged],
		icon: Icon.CrossbowLight,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 5
				},
				type: {value: 'simpleR', baseItem: 'lightcrossbow'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Dart]: {
		title: 'Dart',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponRanged],
		icon: Icon.Dart,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 0.25
				},
				type: {value: 'simpleR', baseItem: 'dart'},
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
					base: {
						number: 1,
						denomination: 4,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Shortbow]: {
		title: 'Shortbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 25,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponRanged],
		icon: Icon.Shortbow,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'simpleR', baseItem: 'shortbow'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Sling]: {
		title: 'Sling',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponSimple, Tag.WeaponRanged],
		icon: Icon.Sling,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'simpleR', baseItem: 'sling'},
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
					base: {
						number: 1,
						denomination: 4,
						bonus: 0,
						types: ['bludgeoning']
					}
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
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Battleaxe,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 4
				},
				type: {value: 'martialM', baseItem: 'battleaxe'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['slashing']
					},
					versatile: {
						number: 1,
						denomination: 10,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Flail]: {
		title: 'Flail',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Flail,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'martialM', baseItem: 'flail'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
	[Equipment.Glaive]: {
		title: 'Glaive',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 20,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Glaive,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 6
				},
				type: {value: 'martialM', baseItem: 'glaive'},
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
					base: {
						number: 1,
						denomination: 10,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Greataxe]: {
		title: 'Greataxe',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 30,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.GreatAxe,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 7
				},
				type: {value: 'martialM', baseItem: 'greataxe'},
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
					base: {
						number: 1,
						denomination: 12,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Greatsword]: {
		title: 'Greatsword',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 50,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Greatsword,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 6
				},
				type: {value: 'martialM', baseItem: 'greatsword'},
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
					base: {
						number: 2,
						denomination: 6,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Halberd]: {
		title: 'Halberd',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 20,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Halberd,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 6
				},
				type: {value: 'martialM', baseItem: 'halberd'},
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
					base: {
						number: 1,
						denomination: 10,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Lance]: {
		title: 'Lance',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Lance,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 6
				},
				type: {value: 'martialM', baseItem: 'lance'},
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
					base: {
						number: 1,
						denomination: 12,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Longsword]: {
		title: 'Longsword',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 15,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Longsword,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 3
				},
				type: {value: 'martialM', baseItem: 'longsword'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['slashing']
					},
					versatile: {
						number: 1,
						denomination: 10,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Maul]: {
		title: 'Maul',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Maul,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 10
				},
				type: {value: 'martialM', baseItem: 'maul'},
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
					base: {
						number: 2,
						denomination: 6,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
	[Equipment.Morningstar]: {
		title: 'Morningstar',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 15,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Morningstar,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 4
				},
				type: {value: 'martialM', baseItem: 'morningstar'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Pike]: {
		title: 'Pike',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Pike,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 18
				},
				type: {value: 'martialM', baseItem: 'pike'},
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
					base: {
						number: 1,
						denomination: 10,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Rapier]: {
		title: 'Rapier',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 25,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Rapier,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'martialM', baseItem: 'rapier'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Scimitar]: {
		title: 'Scimitar',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 25,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Scimitar,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 3
				},
				type: {value: 'martialM', baseItem: 'scimitar'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['slashing']
					}
				},
			},
		},
	},
	[Equipment.Shortsword]: {
		title: 'Shortsword',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 10,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Shortsword,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'martialM', baseItem: 'shortsword'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Trident]: {
		title: 'Trident',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Trident,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 4
				},
				type: {value: 'martialM', baseItem: 'trident'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['piercing']
					},
					versatile: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.WarPick]: {
		title: 'War pick',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 5,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.WarPick,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'martialM', baseItem: 'warpick'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Warhammer]: {
		title: 'Warhammer',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 15,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Warhammer,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'martialM', baseItem: 'warhammer'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['bludgeoning']
					},
					versatile: {
						number: 1,
						denomination: 10,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
	[Equipment.Whip]: {
		title: 'Whip',
		adjectives: equipmentAdjectives.meleeWeapon,
		short: null,
		value: 2,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponMelee],
		icon: Icon.Whip,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 3
				},
				type: {value: 'martialM', baseItem: 'whip'},
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
					base: {
						number: 1,
						denomination: 4,
						bonus: 0,
						types: ['slashing']
					}
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
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		icon: Icon.Blowgun,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 1
				},
				type: {value: 'martialR', baseItem: 'blowgun'},
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
					base: {
						number: 0,
						denomination: 0,
						bonus: 1,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.CrossbowHand]: {
		title: 'Hand Crossbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 75,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		icon: Icon.CrossbowHand,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 3
				},
				type: {value: 'martialR', baseItem: 'handcrossbow'},
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
					base: {
						number: 1,
						denomination: 6,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.CrossbowHeavy]: {
		title: 'Heavy Crossbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 50,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		icon: Icon.CrossbowHeavy,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 18
				},
				type: {value: 'martialR', baseItem: 'heavycrossbow'},
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
					base: {
						number: 1,
						denomination: 10,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Longbow]: {
		title: 'Longbow',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 50,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		icon: Icon.Longbow,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 2
				},
				type: {value: 'martialR', baseItem: 'longbow'},
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
					base: {
						number: 1,
						denomination: 8,
						bonus: 0,
						types: ['piercing']
					}
				},
			},
		},
	},
	[Equipment.Net]: {
		title: 'Net',
		adjectives: equipmentAdjectives.rangedWeapon,
		short: null,
		value: 1,
		tags: [Tag.Weapon, Tag.WeaponMartial, Tag.WeaponRanged],
		icon: Icon.Net,
		foundry: {
			type: FoundryType.Weapon,
			activities: defaultAttackActivities,
			system: {
				weight: {
					value: 3
				},
				type: {value: 'martialR', baseItem: 'net'},
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
					base: {
						number: 0,
						denomination: 0,
						bonus: 0,
						types: ['bludgeoning']
					}
				},
			},
		},
	},
};
