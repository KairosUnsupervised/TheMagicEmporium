import {gacha, type Gacha} from "./library/Gacha";
import {createContext, ReactNode} from "react";

interface GachaContextProviderProps {
	children: ReactNode;
}

// Having gacha as context isn't really needed but its useful for testing
export const GachaContext = createContext<Gacha>(gacha);

export const GachaContextProvider = (props: GachaContextProviderProps) => {

	return (
		<>
			{props.children}
		</>
	);
};
