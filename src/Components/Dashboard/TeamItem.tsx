import {FC, useContext} from "react";
import {TTeam} from "../../CommonType/TTeam";
import {useNavigate} from "react-router-dom";

type props = {
    team: TTeam
}

export const TeamItem: FC<props> = ({team}) => {

    const navigate = useNavigate()

    const redirectTo = () => {
        navigate("/app/"+team.id)
    }

    return (
        <div className="flex flex-col bg-amber-300 mx-auto
                        h-32
                        m-2 p-3 rounded-2xl
                        hover:bg-amber-400 cursor-pointer
                        "
             key={team.id}
            onClick={() => redirectTo()}
        >
            <div className="flex mx-auto flex-col my-auto">
                <div className="">
                    Name: {team.name}
                </div>
                <div>
                    Victories: {team.championship}
                </div>
                <div>
                    Date of foundation: {team.dateOfFoundation.toString()}
                </div>
            </div>

        </div>
    )
}