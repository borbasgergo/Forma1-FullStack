import {FC, useContext, useState} from "react";
import {HttpContext} from "../HttpContext";


type Props = {
    children: JSX.Element
}
export const HttpProvider: FC<Props> = ({children}) => {

    const http = useContext(HttpContext)

    return (
        <HttpContext.Provider value={http} >
            { children }
        </HttpContext.Provider>
    )
}