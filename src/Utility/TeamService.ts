import {IDependencyMarker} from "../Interface/IDependencyMarker";
import {Http} from "./HTTP";
import {Json} from "./JSON";
import {HttpHelper} from "./HttpHelper";
import {TGetAllTeam} from "../CommonType/TGetAllTeam";
import {TTeam} from "../CommonType/TTeam";
import {TGetOneTeam} from "../CommonType/TGetOneTeam";
import {TDeleteTeam} from "../CommonType/TDeleteTeam";


export class TeamService implements IDependencyMarker{

    private readonly _http: Http
    private readonly _json: Json

    constructor(http: Http, json: Json) {
        this._http = http
        this._json = json
    }

    async getAll() : Promise<TGetAllTeam> {

        const path = this._json.JSONData.TEAM.GET_ALL.URL
        const method = this._json.JSONData.TEAM.GET_ALL.METHOD
        const response = await this._http.fetchHttp(path, method)

        try {
            const jsonData = await HttpHelper.doPredefinedSteps(response)
            console.log(jsonData)

            if(jsonData.data === 0) {
                throw new Error("No team in db")
            }
            let teams: TTeam[] = []

            jsonData.data.forEach((team: TTeam) => {
                teams.push(team)
            })

            return {
                data: {
                    teams
                }

            }
        } catch (error: any) {
            console.log(error)
            return {
                error: {
                    isError: true,
                    msg: error.message
                }
            }
        }

    }

    async create(name: string,
                 dof: string,
                 championship: number,
                 signedUp: boolean)
        : Promise<TGetOneTeam> {

        const path = this._json.JSONData.TEAM.CREATE.URL
        const method = this._json.JSONData.TEAM.CREATE.METHOD
        const response = await this._http.fetchHttp(path, method, {
            name,
            dateOfFoundation: dof,
            championship,
            isSignedUp: signedUp
        })

        try {
            const jsonData = await HttpHelper.doPredefinedSteps(response)
            console.log(jsonData)

            let team: TTeam = jsonData.data

            return {
                data: {
                    team
                }

            }

        } catch (error: any) {
            console.log(error)
            return {
                error: {
                    isError: true,
                    msg: error.message
                }
            }
        }

    }

    async getOne(id?:number) : Promise<TGetOneTeam> {
        if(!id) {
            return {
                error: {
                    isError: true,
                    msg: "Bad param!"
                }
            }
        }
        const path = this._json.JSONData.TEAM.GET_ONE.URL+id
        const method = this._json.JSONData.TEAM.GET_ONE.METHOD
        const response = await this._http.fetchHttp(path, method)

        try {
            const jsonData = await HttpHelper.doPredefinedSteps(response)
            console.log(jsonData)

            let team: TTeam = jsonData.data

            return {
                data: {
                    team
                }
            }

        } catch (error: any) {
            console.log(error)
            return {
                error: {
                    isError: true,
                    msg: error.message
                }
            }
        }
    }

    async delete(id: number) : Promise<TDeleteTeam> {
        const path = this._json.JSONData.TEAM.DELETE.URL+id
        const method = this._json.JSONData.TEAM.DELETE.METHOD
        const response = await this._http.fetchHttp(path, method)

        try {
            const jsonData = await HttpHelper.doPredefinedSteps(response)
            console.log(jsonData)

            let team: TTeam = jsonData.data

            return {
                error: {
                    isError: false
                }
            }

        } catch (error: any) {
            console.log(error)
            return {
                error: {
                    isError: true,
                    msg: error.message
                }
            }
        }
    }


}