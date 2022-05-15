import {createContext} from "react";
import {Http} from "../Utility/HTTP";
import {Json} from "../Utility/JSON";
import {Url} from "../Utility/URL";
import {HttpService} from "../Utility/HttpService";


const fileName = "urls.json"

const json = new Json().setup(fileName)

const url = new Url(
    json.JSONData.HTTP_MODE,
    json.JSONData.HOST,
    json.JSONData.PORT
)
const httpService = new HttpService()
const http = new Http(
    json,
    url,
    httpService
)

export const HttpContext = createContext<Http>(http)