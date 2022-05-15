import {IHttpService} from "./IHttpService";

export class HttpService implements IHttpService {

    checkJsonDataForError(jsonData: any): void {
        if (jsonData.error) throw Error(jsonData.data.message)
    }

    checkResponseForNull(response?: Response): void {
        if(!response) {
            throw Error("Url couldn't be fetched")
        }
    }

    getJsonResponse(from: Response): Promise<any> {
        return from.json()
    }

}