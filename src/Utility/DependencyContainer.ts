import {TDependencyContainer} from "../CommonType/TDependencyContainer";
import {IDependencyMarker} from "../Interface/IDependencyMarker";
import {NoDependencyFound} from "../Exception/NoDependencyFound";

export class DependencyContainer{

    private DependencyContainer: TDependencyContainer = {}

    get Container() {
        return this.DependencyContainer
    }

    get <T extends IDependencyMarker>(by: string) : T {
        const dependency = this.DependencyContainer[by]

        if(dependency === undefined) {
            throw new NoDependencyFound("No dependency found!")
        }

        return dependency as T
    }

    set(name: string, obj: IDependencyMarker) {
        this.DependencyContainer[name] = obj
    }


}