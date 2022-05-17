import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {MenuItem} from "./MenuItem";
import {LogOutItem} from "./LogOutItem";


export const AppHeader: FC = () => {

    const navigate = useNavigate()

    const redirectTo = (url: string) => {
        navigate("/app/"+url)
    }

    const menu = [
        {
            id:0,
            name: "Home",
            toUrl: ""
        },
        {
            id: 1,
            name: "Create",
            toUrl: "create"
        }
    ]

    return (
        <div className="flex bg-blue-400 h-full">
            <LogOutItem />
            <MenuItem redirectToFn={redirectTo} menu={menu} />
        </div>

    )


}