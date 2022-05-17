import {IDependencyMarker} from "../Interface/IDependencyMarker";
import {CheckJwtReturn, Http} from "./HTTP";
import {Json} from "./JSON";
import {HttpHelper} from "./HttpHelper";
import {TLogin} from "../CommonType/TLogin";


export class UserService implements IDependencyMarker{


    private readonly _http: Http
    private readonly _json: Json

    constructor(http: Http, json: Json) {
        this._json = json
        this._http = http
    }

    async checkJwt(
        username?: string,
        jwt?: string
    ): Promise<CheckJwtReturn> {

        if(!username || !jwt ) {
            return {
                isError: true,
                error: "No user!"
            }
        }

        const path = this._json.JSONData.CHECK_JWT.URL
        const method = this._json.JSONData.CHECK_JWT.METHOD
        const response = await this._http.fetchHttp(path, method, {username, jwt})


        try {
            const jsonData = await HttpHelper.doPredefinedSteps(response)
            console.log(jsonData)

            return {
                Id: jsonData.data.user.id,
                username: jsonData.data.user.username,
                jwt: jsonData.data.jwt,
                isError: false
            }
        } catch (error: any) {
            console.log(error)
            return {
                isError: true,
                error: error.message
            }
        }
    }

    async login(
        username: string,
        password: string
    ) : Promise<TLogin> {

        const path = this._json.JSONData.LOGIN.URL
        const method = this._json.JSONData.LOGIN.METHOD
        const response = await this._http.fetchHttp(path, method, {username, password})

        try {
            const jsonData = await HttpHelper.doPredefinedSteps(response)

            return {
                token: jsonData.data.token,
                isError: false
            }
        } catch(error: any) {
            return {
                token: undefined,
                isError: true,
                errorMsg: error.msg
            }
        }
    }

    async register(
        username: string,
        password: string
    ) : Promise<TLogin> {

        const path = this._json.JSONData.REGISTER.URL
        const method = this._json.JSONData.REGISTER.METHOD
        const response = await this._http.fetchHttp(path, method, {username, password})

        try {
            const jsonData = await HttpHelper.doPredefinedSteps(response)

            return {
                token: jsonData.data.token,
                isError: false
            }
        } catch(error: any) {
            return {
                token: undefined,
                isError: true,
                errorMsg: error.msg
            }
        }
    }
}