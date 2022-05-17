import {FC} from "react";
import {LogOutItem} from "./LogOutItem";

type props = {
    redirectToFn: (url:string) => void,
    menu: {
        id: number,
        name: string,
        toUrl: string
    }[]
}
export const MenuItem: FC<props> = ({redirectToFn, menu}) => {


    return (
        <div className="pl-8 flex">
            {
                menu.map(m => (

                    <div className="my-auto ml-4 p-2 rounded
                                    hover:cursor-pointer hover:bg-blue-200"
                         key={m.id}
                         onClick={() => redirectToFn(m.toUrl)}
                    >
                        {m.name}
                    </div>

                ))
            }
        </div>
    )
}