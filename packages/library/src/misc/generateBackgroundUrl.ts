import { namespace } from "@tme/shared/src/namespaceConfig";

export const generateBackgroundUrl = (background: string) => {
	return background.replaceAll(
		"{backgroundPath}",
		`/modules/${namespace.core.id}/backgrounds`,
	);
};
