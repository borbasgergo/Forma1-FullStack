import {FC} from "react";
import { DependencyContainerContext } from "../DependencyContainerContext";
import {Json} from "../../Utility/JSON";
import {DependencyContainer} from "../../Utility/DependencyContainer";
import {TDependencyContainer} from "../../CommonType/TDependencyContainer";
import {Url} from "../../Utility/URL";
import {Http} from "../../Utility/HTTP";
import {UserService} from "../../Utility/UserService";
import {TeamService} from "../../Utility/TeamService";


type Props = {
    children: JSX.Element
}

export const DependencyContainerProvider: FC<Props> = ({
    children
}) => {

    const container = BuildContainer()

    return (
        <DependencyContainerContext.Provider value={container}>
            {children}
        </DependencyContainerContext.Provider>
    )
}


const BuildContainer = () : DependencyContainer => {

    const dependencyContainer = new DependencyContainer()

    dependencyContainer.set("Json", new Json().setup("urls.json"))

    RegisterUrl(dependencyContainer,
        dependencyContainer.get<Json>("Json"))


    dependencyContainer.set("Http", new Http(dependencyContainer))

    dependencyContainer.set("UserService", new UserService(
        dependencyContainer.get<Http>("Http"),
        dependencyContainer.get<Json>("Json")
    ))

    dependencyContainer.set("TeamService", new TeamService(
        dependencyContainer.get<Http>("Http"),
        dependencyContainer.get<Json>("Json")
    ))


    return dependencyContainer
}

const RegisterUrl = (to: DependencyContainer, json: Json) => {

    const url = new Url()

    url.host = json.JSONData.HOST
    url.port = json.JSONData.PORT
    url.http_mode = json.JSONData.HTTP_MODE

    to.set("Url", url)
}



