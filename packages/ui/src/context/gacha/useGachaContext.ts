import { useContext } from "react";
import { GachaContext } from "./GachaContextProvider";
import type { Gacha } from "./library/Gacha";

export const useGachaContext = (): Gacha => {
	return useContext(GachaContext);
};
