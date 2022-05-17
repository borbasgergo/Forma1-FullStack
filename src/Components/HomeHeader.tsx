import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {MenuItem} from "./Dashboard/Header/MenuItem";


export const HomeHeader: FC = () => {

    const navigate = useNavigate()

    const redirectTo = (url: string) => {
        navigate("/"+url)
    }

    const menu = [
        {
            id:0,
            name: "Login",
            toUrl: "login"
        },
        {
            id: 1,
            name: "Register",
            toUrl: "register"
        }
    ]

    return (
        <div className="flex bg-blue-400 h-full">
            <MenuItem redirectToFn={redirectTo} menu={menu} />
        </div>

    )


}