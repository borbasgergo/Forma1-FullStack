import {FC, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {DependencyContainerContext} from "../../Context/DependencyContainerContext";
import {TeamService} from "../../Utility/TeamService";

export const DeleteTeam: FC<{ id: number }> = ({id}) => {

    const navigate = useNavigate()

    const dc = useContext(DependencyContainerContext)

    const teamService = dc.get<TeamService>("TeamService")


    const deleteTeam = async () => {
        await teamService.delete(id)
        navigate("/app/")
    }
    return (
        <div className=""
             key={id}>
            <div
                className="mt-2 mx-auto"
                onClick={() => deleteTeam()}
            >
                <span className="rounded hover:bg-red-500 hover:cursor-pointer bg-red-800 text-gray-200 p-1">Delete</span>
            </div>
        </div>
    )
}