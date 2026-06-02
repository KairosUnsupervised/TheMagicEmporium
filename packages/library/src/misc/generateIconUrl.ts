import type { Icon } from "../item/icon";
import {namespace} from "@tme/shared/src/namespaceConfig";

export const generateIconUrl = (icon: Icon) => {
	return `/modules/${namespace.core.id}/icons/${icon}`;
};
