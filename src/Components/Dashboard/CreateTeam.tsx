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
        <div>

            <div>
                <h4>
                    Name of the team
                </h4>
                <input type="text" name="name" placeholder="Name..." onChange={(e) => {
                    setName(e.target.value)
                }}/>
            </div>
            <div>
                <h4>
                    Is the team signed up for the race year?
                </h4>
                <select
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

            <div>
                <h4>Date of foundation</h4>
                <div>
                    <DatePicker
                        value={dof.toString()}
                        onChange={(date:Date) => setDof(
                            `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,"0")}-${date.getDate().toString().padStart(2, "0")}`
                        )}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
            </div>
            <div>
                Championships

                <input type="number"
                       pattern='[0-9]'
                       onChange={(e) => setChampions(Number(e.target.value))}/>
            </div>
            <div>

                <button onClick={() => createTeam()}>Create</button>
            </div>

        </div>
    )

}