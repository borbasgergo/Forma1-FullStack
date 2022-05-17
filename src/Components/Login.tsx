import React, {Dispatch, FC, SetStateAction, useContext, useState} from "react";
import {Input} from "./Input";
import {storageFunction} from "../Function/localStorage";
import {DependencyContainerContext} from "../Context/DependencyContainerContext";
import {UserService} from "../Utility/UserService";
import {UserContext} from "../Context/UserContext";
import {useNavigate} from "react-router-dom";
import {ErrorDiv} from "./Error";


export const Login: FC = () => {


    const dpc = useContext(DependencyContainerContext)

    const userService = dpc.get<UserService>("UserService")

    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()

    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("")

    const [localError, setLocalError] = useState<any[]>([])

    const doLogin = async () => {
        try {
            const response = await userService.login(username, password)
            console.log(response)

            if(response.isError) {
                setLocalError( [...localError, {
                    message: response.errorMsg
                }])
                return
            }

            setUser!(storageFunction.setUser(
                {
                    id: response.id,
                    jwt: response.token,
                    username: username,
                    isLoggedIn: true
                }
            ))

            navigate("/app/")


        } catch (e: any) {
            setLocalError( [...localError, {
                message: e.message
            }])
        }
    }

    return (
        <>
            {
                localError.length > 0 && <ErrorDiv errors={localError} />
            }
            <Input setter={setUsername}
                   field={{
                       id: 0,
                       name: "username",
                       type: "text",
                       css: "p-1 border border-2 border-gray-400 w-full mb-2 rounded-2xl shadow shadow-sm"
                    }}
            />

            <Input setter={setPassword}
                   field={{
                       id: 1,
                       name: "password",
                       type: "password",
                       css: "p-1 border border-2 border-gray-400 w-full mb-2 rounded-2xl shadow shadow-sm"
                    }}
            />
            <button onClick={() => doLogin()}>Log In</button>
        </>
    )

}