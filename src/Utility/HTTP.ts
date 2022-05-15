import {Json} from "./JSON";
import {Url} from "./URL";
import {IHttpService} from "./IHttpService";

export type CheckJwtReturn = {
    Id: number,
    username: string,
    isError: boolean
} | {
    isError: boolean,
    error: string
}


export class Http {

    private readonly json: Json;
    private readonly url: Url;
    private readonly httpService: IHttpService

    constructor(
        json: Json,
        url: Url,
        httpService: IHttpService
    ) {
        this.json = json
        this.url = url
        this.httpService = httpService
    }


    public async fetch_checkJwt(): Promise<CheckJwtReturn> {
        console.log(this.json)
        const path = this.json.JSONData.CHECK_JWT_URL.URL_STRING
        const method = this.json.JSONData.CHECK_JWT_URL.METHOD
        const url = this.url.BuildURL(path)

        try {
            const response = await fetch(url, {method})
            this.httpService.checkResponseForNull(response)
            const jsonData = await this.httpService.getJsonResponse(response)
            this.httpService.checkJsonDataForError(jsonData)

            return {
                Id: jsonData.data.Id,
                username: jsonData.data.username,
                isError: false
            }

        } catch(error: any) {
            return {
                isError: true,
                error: error.message
            }
        }

    }
}