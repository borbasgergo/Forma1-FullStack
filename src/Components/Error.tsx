import {FC} from "react";


type Props = {
    message: string
}
export const ErrorDiv:FC<Props> = ({message}) => {
    return (
        <div>
            Reason: {message}
        </div>
    )
}