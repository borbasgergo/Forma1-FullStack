import {FC, useContext, useEffect, useState} from "react";
import { UserContext } from "../UserContext";
import {Loading} from "../../Components/Loading";

import {CheckJwtReturn} from "../../Utility/HTTP";
import {User} from "../../Entity/User";
import {DependencyContainerContext} from "../DependencyContainerContext";
import {UserService} from "../../Utility/UserService";
import {storageFunction} from "../../Function/localStorage";
import {useNavigate} from "react-router-dom";


type Props = {
    children: JSX.Element
}

export const AuthProvider: FC<Props> = ( {children}) => {

    const dependencyContainer = useContext(DependencyContainerContext)

    const userService = dependencyContainer.get<UserService>("UserService")

    const [user, setUser] = useState<User>(storageFunction.getUser())
    console.log("USER: "+ user.isLoggedIn)

    const [loading, setLoading] = useState<boolean>(true)


    useEffect( () => {

        const dataFetch = async () => {
            setLoading(true)
            return await userService.checkJwt(user.username, user.jwt)
        }

        dataFetch()
            .then((result: CheckJwtReturn) => {
                if(result.isError) {
                    throw new Error()
                }
                setUser(storageFunction.setUser(
                    {
                        id: result.Id,
                        username: result.username,
                        isLoggedIn: true,
                        jwt: storageFunction.getUser().jwt,

                    }
                ))
            })
            .catch((error:Error) => {
                console.log(error)
                setUser(storageFunction.setUser(
                    {
                        isLoggedIn: false
                    }
                ))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <UserContext.Provider value={ {user, setUser} }>
            {
                loading ? <Loading /> : children
            }
        </UserContext.Provider>
    )

}