import {FC} from "react";


interface error {
    message: string
}

type Props = {
    errors: error[]
}
export const ErrorDiv:FC<Props> = ({errors}) => {
    return (
        <div>
        {
            errors.map(error =>
                 (
                    <div>
                        {error.message}
                    </div>
                )
            )
        }
        </div>
    )
}