import React, {useContext} from "react";
import {UserContext} from "../Context/UserContext";

export const HomePage = () => {

    const user  = useContext(UserContext);

    return (
        <div className="flex flex-col">
            <div className="h-16 bg-gray-300">
                header
            </div>
            <div>
                {user.username}
            </div>
        </div>
    );
}