import {createContext} from "react";
import {DependencyContainer} from "../Utility/DependencyContainer";


export const DependencyContainerContext =
    createContext<DependencyContainer>(new DependencyContainer())