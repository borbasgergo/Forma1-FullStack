
import {HomePage} from "../Components/HomePage";
import {Navigate, Outlet} from "react-router-dom";
import App from "../Components/Dashboard/App";




export const makeRoutes = (isLoggedIn: boolean) => [
    {
        path: '/app',

        element: isLoggedIn ? <App /> :<Navigate to = "/" />,

        children: [
            {
                path: '/app', element: <Outlet/>,
                children: [
                    {
                        path: "/app/",
                        element: <>main</>
                    },
                    {
                        path: "/app/:id",
                        element: <>APPPPP</>
                    }
                ]

            },

        ],
    },
    {
        path: '/',
        element: <HomePage />
    },
];