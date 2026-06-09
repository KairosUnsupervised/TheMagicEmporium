import { createContext, type ReactNode } from "react";
import { type Gacha, gacha } from "./library/Gacha";

interface GachaContextProviderProps {
	children: ReactNode;
}

// Having gacha as context isn't really needed but its useful for testing
export const GachaContext = createContext<Gacha>(gacha);

export const GachaContextProvider = (props: GachaContextProviderProps) => {
	return <>{props.children}</>;
};
