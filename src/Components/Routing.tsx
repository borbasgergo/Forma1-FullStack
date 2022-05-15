import {FC, useContext} from "react";
import {useRoutes} from "react-router-dom";
import {makeRoutes} from "../Function/makeRoutes";
import {UserContext} from "../Context/UserContext";

export const Routing: FC = () => {

    const user = useContext(UserContext)

    const routing = useRoutes(makeRoutes(user.isLoggedIn))

    return (
        <>
            {routing}
        </>
    )
}