import {FC, useContext, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {TeamService} from "../../Utility/TeamService";
import {DependencyContainerContext} from "../../Context/DependencyContainerContext";
import {useNavigate} from "react-router-dom";

export const CreateTeamDiv:FC= () => {

    const dbc = useContext(DependencyContainerContext)

    const teamService = dbc.get<TeamService>("TeamService")

    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [isSignedUp, setIsSignedUp] = useState<boolean>(false)
    const [dof, setDof] = useState<string>( "") //date of foundation
    const [champions, setChampions] = useState<number>(0)


    const createTeam = async () => {

        await teamService.create(name, dof, champions, isSignedUp)
        navigate("/app/")
    }

    return (
        <div className="flex flex-col mt-6">

            <div className="flex mx-auto">
                <h4 className="my-auto">
                    Name of the team
                </h4>
                <input
                    className="ml-2 p-1 border border-2 border-gray-400 my-auto rounded-2xl"
                    type="text"
                    name="name"
                    placeholder="Name..." onChange={(e) => {
                    setName(e.target.value)
                }}/>
            </div>
            <div className="flex mx-auto mt-4">
                <h4>
                    Is the team signed up for the race year?
                </h4>
                <select
                    className="ml-2"
                    value={isSignedUp.toString()}
                    onChange={(e) => {
                        if(e.target.value === "true") setIsSignedUp(true)

                        if(e.target.value === "false") setIsSignedUp(false)
                    }}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className="flex mx-auto mt-4">
                <h4>Date of foundation</h4>
                <div className="ml-2">
                    <DatePicker
                        className="border border-2 border-gray-400"
                        placeholderText="Click here"
                        value={dof.toString()}
                        onChange={(date:Date) => setDof(
                            `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,"0")}-${date.getDate().toString().padStart(2, "0")}`
                        )}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
            </div>
            <div className="flex mx-auto mt-4">
                <h4>Championships</h4>

                <input type="number"
                       className="border border-2 border-gray-400 ml-2"
                       placeholder="Enter number here"
                       pattern='[0-9]'
                       onChange={(e) => setChampions(Number(e.target.value))}/>
            </div>
            <div className="flex mx-auto mt-4">

                <button
                    className="bg-blue-400 p-2 rounded-2xl hover:bg-blue-800 hover:text-gray-200"
                    onClick={() => createTeam()}>Create Team</button>
            </div>

        </div>
    )

}