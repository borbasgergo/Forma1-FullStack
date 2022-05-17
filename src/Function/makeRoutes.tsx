
import {HomePage} from "../Components/HomePage";
import {Navigate, Outlet} from "react-router-dom";
import App from "../Components/Dashboard/App";
import {TeamContainer} from "../Components/Dashboard/TeamContainer";
import {ListOfTeams} from "../Components/Dashboard/ListOfTeams";
import {CreateTeamDiv} from "../Components/Dashboard/CreateTeam";
import {Login} from "../Components/Login";
import {Register} from "../Components/Register";

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
                        element: <ListOfTeams/>
                    },
                    {
                        path: "/app/:id",
                        element: <TeamContainer />
                    },
                    {
                        path: "/app/create",
                        element: <CreateTeamDiv />
                    }
                ]

            },

        ],
    },
    {
        path: '/',
        element: isLoggedIn ? <Navigate to="/app/" /> : <HomePage />,
        children: [
            {
                path: "/",
                element: <Outlet />,
                children: [
                    {
                        path: "/login",
                        element: <Login />
                    },
                    {
                        path: "/register",
                        element: <Register />
                    }
                ]
            }
        ]
    }
];