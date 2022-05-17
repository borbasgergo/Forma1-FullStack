import {Dispatch, FC, SetStateAction} from "react";
import {TField} from "../CommonType/TField";



type props = {

    setter: Dispatch<SetStateAction<any>>

    field: TField

}

export const Input: FC<props> = ({field, setter}) => {

    return (
        <>
            <input type={field.type}
                   name={field.name}
                   placeholder={field.name}
                   className={field.css}
                   onChange={(e) => setter(e.target.value)}/>
        </>
    )

}