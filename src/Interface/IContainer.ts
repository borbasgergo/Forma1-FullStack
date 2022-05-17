import {IDependencyMarker} from "./IDependencyMarker";

export interface IContainer {

    get<T extends IDependencyMarker>(by: string): T

}