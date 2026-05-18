import { useContext } from "preact/hooks";
import { AbstractItemContext } from "./AbstractItemContextProvider";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";

export const useAbstractItemContext = (): { abstractItem: AbstractItem } => {
	return useContext(AbstractItemContext);
};
