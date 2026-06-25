import { namespace } from "@tme/shared/src/namespaceConfig";
import {
	Field,
	type GachaItem5e,
	GachaItemType,
	LockOperation,
	type WishFlag,
} from "@tme/shared/src/types/GachaItem5e";

export const wishOfCelestialMandateFixture: GachaItem5e<WishFlag> = {
	id: "fixture-wish-of-celestial-mandate",
	img: "modules/the-magic-emporium/gacha/wishes/wishOfCelestialMandate.jpg",
	name: "Wish of Celestial Mandate",
	isOwner: true,
	system: {
		quantity: 99,
		description: {
			value:
				"Spoken into the void between stars. Unlocks all possibilities again",
		},
	},
	flags: {
		[namespace.gacha.id]: {
			type: GachaItemType.Wish,
			id: "wish-of-celestial-mandate",
			operations: [
				{ field: Field.PickAmount, op: LockOperation.Unlock },
				{ field: Field.RevealAmount, op: LockOperation.Unlock },
				{ field: Field.FloatLuck, op: LockOperation.Unlock },
				{ field: Field.RarityLuck, op: LockOperation.Unlock },
				{ field: Field.VisibilityLevel, op: LockOperation.Unlock },
				{ field: Field.EquipmentWhitelist, op: LockOperation.Unlock },
			],
		},
	},
	update: async (data) => {
		if (data.system?.quantity !== undefined) {
			wishOfCelestialMandateFixture.system.quantity = data.system.quantity;
		}
	},
	delete: async () => {},
};
