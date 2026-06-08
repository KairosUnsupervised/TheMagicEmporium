import * as React from "react";
import {Gacha} from "./library/Gacha";

interface GachaContextProviderProps {
	children: React.ReactNode;
}

export const GachaContext = React.createContext<Gacha>(new Gacha());

export const GachaContextProvider = (props: GachaContextProviderProps) => {

	// TODO Implement context once needed
	return (
		<>
			{props.children}
		</>
	);
};
