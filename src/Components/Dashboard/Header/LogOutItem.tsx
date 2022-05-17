import {FC, useContext} from "react";
import {storageFunction} from "../../../Function/localStorage";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../../Context/UserContext";


export const LogOutItem: FC = () => {

    const {setUser} = useContext(UserContext)

    const logOut = () => {
        setUser!(storageFunction.logOut())
    }
    return (
        <>
            <span className="my-auto bg-red-200 text-gray-700
                            p-1 rounded-2xl hover:bg-red-500
                            hover:cursor-pointer"
                  onClick={() => logOut()}
            >
                Log out

            </span>
        </>
    )
}