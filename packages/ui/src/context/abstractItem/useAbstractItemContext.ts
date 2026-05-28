import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { useContext } from "react";
import { AbstractItemContext } from "./AbstractItemContextProvider";

export const useAbstractItemContext = (): { abstractItem: AbstractItem } => {
	return useContext(AbstractItemContext);
};
