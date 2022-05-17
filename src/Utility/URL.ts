import {IDependencyMarker} from "../Interface/IDependencyMarker";

export class Url implements IDependencyMarker{

    get port(): string {
        return this._port;
    }

    set port(value: string) {
        this._port = value;
    }

    get host(): string {
        return this._host;
    }

    set host(value: string) {
        this._host = value;
    }


    get http_mode(): string {
        return this._http_mode;
    }
    set http_mode(value: string) {
        this._http_mode = value;
    }

    private _http_mode!: string;
    private _host!: string;
    private _port!: string;

    /* constructor(
        http_mode: string, host: string, port: number
    ) {
        this.http_mode = http_mode;
        this.host = host;
        this.port = port;
    }*/


    public BuildURL(url: string) : string {
        return `${this.BuildHostPartOfUrl()}${url}`
    }

    public BuildHostPartOfUrl() : string {
        return `${this.http_mode}://${this.host}:${this.port}`
    }
}