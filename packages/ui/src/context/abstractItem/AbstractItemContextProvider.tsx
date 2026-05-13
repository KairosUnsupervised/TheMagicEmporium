import {AbstractItem} from "@tme/library/src/item/AbstractItem";
import * as React from "preact/compat";

interface AbstractItemContextProviderProps {
    abstractItem: AbstractItem
    children: React.ReactNode;
}

export const AbstractItemContext = React.createContext<{ abstractItem: AbstractItem }>({
    abstractItem: new AbstractItem()
});

export const AbstractItemContextProvider = (props: AbstractItemContextProviderProps) => {


    return (<AbstractItemContext.Provider value={{abstractItem: props.abstractItem}}>
        {props.children}
    </AbstractItemContext.Provider>);
}
