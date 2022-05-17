import {FC, useContext, useEffect, useState} from "react";
import {UserContext} from "../../Context/UserContext";
import {DependencyContainerContext} from "../../Context/DependencyContainerContext";
import {TeamService} from "../../Utility/TeamService";
import {Loading} from "../Loading";
import {TTeam} from "../../CommonType/TTeam";
import {TeamItem} from "./TeamItem";

/*
*
* For Url: "/app/"
*
* */

export const ListOfTeams: FC = () => {

    const teamService = useContext(DependencyContainerContext)
        .get<TeamService>("TeamService")

    const [teams, setTeams] = useState<TTeam[]>([])

    const [loading, setLoading] = useState(true)

    const dataFetch = async () => {

        setLoading(true)
        return await teamService.getAll()

    }

    useEffect(() => {
        dataFetch()
            .then(response => {
                if(response.error?.isError) {
                    throw new Error(response.error.msg)
                }

                setTeams(response.data!.teams)

            })
            .catch(
                error => {
                    console.log(error)
                }
            )
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div className="flex">
            {
                loading ? <Loading/> : teams.length === 0 ? <div>No teams in db, create one! </div> :
                    teams.map(team => (
                        <TeamItem team={team}/>
                    ))
            }
        </div>
    )
}