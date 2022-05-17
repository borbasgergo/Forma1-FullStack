import {IHttpService} from "../Interface/IHttpService";
import {TError} from "../CommonType/TError";
import {TData} from "../CommonType/TData";

export class HttpHelper {

    public static checkJsonDataForError(jsonData: any): void {
        if (jsonData.error) throw Error("Error")
    }

    public static checkResponseForNull(response?: Response): void {
        if(!response) {
            throw Error("Url couldn't be fetched")
        }
    }

    public static getJsonResponse(from: Response): Promise<any> {
        return from.json()
    }

    public static async doPredefinedSteps(response: Response) : Promise<any> {
        HttpHelper.checkResponseForNull(response)
        const jsonData = await HttpHelper.getJsonResponse(response)
        HttpHelper.checkJsonDataForError(jsonData)

        return jsonData
    }

}