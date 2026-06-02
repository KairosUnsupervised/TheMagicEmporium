import type { Icon } from "../item/icon";

export const generateIconUrl = (icon: Icon) => {
	return `/modules/${game.world.id}/icons/${icon}`;
};
