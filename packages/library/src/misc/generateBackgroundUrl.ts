import {namespace} from "@tme/shared/src/namespaceConfig";

export const generateBackgroundUrl = (background: string) => {

    return background.replaceAll(
        "{backgroundPath}",
        `/data/${namespace.core.id}/backgrounds`,
    );
}
