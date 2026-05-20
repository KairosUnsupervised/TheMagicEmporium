import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { useContext } from "preact/hooks";
import { AbstractItemContext } from "./AbstractItemContextProvider";

export const useAbstractItemContext = (): { abstractItem: AbstractItem } => {
	return useContext(AbstractItemContext);
};
