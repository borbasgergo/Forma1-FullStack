import {createContext, Dispatch, SetStateAction} from "react";
import {User} from "../Entity/User";
import {storageFunction} from "../Function/localStorage";



export const UserContext = createContext<{
    user: User,
    setUser?: Dispatch<SetStateAction<User>>
}>({
    user: storageFunction.getUser(),
    setUser: undefined
})