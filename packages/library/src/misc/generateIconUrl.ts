import { namespace } from "@tme/shared/src/namespaceConfig";
import type { Icon } from "../item/icon";

export const generateIconUrl = (icon: Icon) => {
	return `/modules/${namespace.core.id}/icons/${icon}`;
};
