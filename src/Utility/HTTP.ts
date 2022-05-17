import {Json} from "./JSON";
import {Url} from "./URL";
import {IDependencyMarker} from "../Interface/IDependencyMarker";
import {HttpHelper} from "./HttpHelper";
import {DependencyContainer} from "./DependencyContainer";
import {storageFunction} from "../Function/localStorage";


export type CheckJwtReturn = {
    Id?: number,
    username?: string,
    isError: boolean,
    error?: string
    jwt?: string
}


export class Http implements IDependencyMarker{


    private readonly _DPContainer: DependencyContainer;
    private readonly _url: Url;

    constructor(
       dpc: DependencyContainer
    ) {
        this._DPContainer = dpc

        this._url = this._DPContainer.get("Url") as Url
    }

    public async fetchHttp(path: string, requestMethod: string, body?: any) {

        const url = this._url.BuildURL(path)

        return await fetch(url, {
            method: requestMethod,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + storageFunction.getUser().jwt
            },
            body: JSON.stringify(body)
        })
    }

}