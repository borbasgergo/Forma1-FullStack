import {IDependencyMarker} from "../Interface/IDependencyMarker";

export class Json implements IDependencyMarker {

    public JSONData: any;

    public setup(filename: string) {
        this.JSONData = this.loadJson(filename)
        return this
    }

    private loadJson(filename: string) {
        let data = require("../"+filename);
        return data
    }


}