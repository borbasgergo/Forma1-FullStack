import React, {FC, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DependencyContainerContext} from "../../Context/DependencyContainerContext";
import {TeamService} from "../../Utility/TeamService";
import {Loading} from "../Loading";
import {TTeam} from "../../CommonType/TTeam";
import {ErrorDiv} from "../Error";
import {TeamItem} from "./TeamItem";
import {DeleteTeam} from "./DeleteTeam"
import {HttpHelper} from "../../Utility/HttpHelper";
import {TGetOneTeam} from "../../CommonType/TGetOneTeam";


/*
*
* For Url: "/app/:id"
*
* */
export const TeamContainer: FC = () => {

    const params = useParams()

    const dc = useContext(DependencyContainerContext)

    const [loading, setLoading] = useState(true)
    const [team, setTeam] = useState<TTeam>()
    const [error, setError] = useState<any[]>([])

    const teamService = dc.get<TeamService>("TeamService")

    const dataFetch = async () => {
        return await teamService.getOne(Number(params.id))
    }

    useEffect(() => {

        dataFetch()
            .then(response => {
                if(response.error?.isError) throw new Error(response.error.msg)

                setTeam(response.data!.team)
            })
            .catch( err => {
                setError([...error, {
                    message: err.message
                }])
            })
            .finally( () => {
                setLoading(false)
            })

    }, [params.id])

    return (
        <div className="flex">
            {
                loading ? <Loading /> : team &&
                    (
                        <div className="mx-auto flex flex-col">
                            <TeamItem team={team!} />
                            <DeleteTeam  id={team.id}/>
                        </div>
                    )
            }
            {
                error.length > 0 && <ErrorDiv errors={error} />
            }

        </div>

    )

}