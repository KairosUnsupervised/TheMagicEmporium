import { namespace } from "@tme/shared/src/namespaceConfig";
import type { Registry } from "./registry/Registry";

export interface CoreApi {
	Registry: Registry;
}

export const getCoreApi = (): CoreApi | undefined => {
	return game.modules.get(namespace.core.id)?.api as CoreApi | undefined;
};
