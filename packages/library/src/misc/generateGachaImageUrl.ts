import { namespace } from "@tme/shared/src/namespaceConfig";

export enum GachaImage {
	Background = "background.jpg",
}

export const generateGachaImageUrl = (image: GachaImage) => {
	return `modules/${namespace.core.id}/gacha/${image}`;
};
