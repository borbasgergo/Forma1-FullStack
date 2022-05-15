import {FC, useContext, useEffect, useState} from "react";
import { UserContext } from "../UserContext";
import {defaultUser, User} from "../../Entity/User";
import urls from "../../urls.json"
import {Loading} from "../../Components/Loading";
import {HttpContext} from "../HttpContext";

import {CheckJwtReturn} from "../../Utility/HTTP";


type Props = {
    children: JSX.Element
}

export const AuthProvider: FC<Props> = ( { children }) => {

    const http = useContext(HttpContext)

    const [user, setUser] = useState<User>(defaultUser)

    const [loading, setLoading] = useState<boolean>(true)


    useEffect( () => {

        const dataFetch = async () => {
            return await http.fetch_checkJwt()
        }

        dataFetch()
            .then((result: CheckJwtReturn) => {
                console.log(result)
            })
            .catch((error:Error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    return (
        <UserContext.Provider value={user}>
            {
                loading ? <Loading /> : children
            }
        </UserContext.Provider>
    )

}