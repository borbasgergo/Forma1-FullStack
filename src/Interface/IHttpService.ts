
export interface IHttpService {

    checkResponseForNull(response?: Response): void

    getJsonResponse(from: Response): Promise<any>

    checkJsonDataForError(jsonData: any): void
}