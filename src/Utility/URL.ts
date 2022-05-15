
export class Url {

    private readonly http_mode: string;
    private readonly host: string;
    private readonly port: number;

    constructor(
        http_mode: string, host: string, port: number
    ) {
        this.http_mode = http_mode;
        this.host = host;
        this.port = port;
    }

    public BuildURL(url: string) : string {
        return `${this.BuildHostPartOfUrl()}${url}`
    }

    private BuildHostPartOfUrl() : string {
        return `${this.http_mode}://${this.host}:${this.port}`
    }
}