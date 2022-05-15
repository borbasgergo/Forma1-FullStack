import {createContext} from "react";
import {User} from "../Entity/User";
import {defaultUser} from "../Entity/DefaultUser";



export const UserContext = createContext<User>(defaultUser)