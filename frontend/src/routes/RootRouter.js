import {useRoutes} from 'react-router-dom';
import LandingLayout from "../components/LandingLayout/LandingLayout";
import {landingRoutes} from "../features/landing/routes";
import {teamprojectRoutes} from "../features/teamproject/routes";

const routes = [
    {
        path: '',
        element: <LandingLayout/>,
        children: [
            ...landingRoutes,
        ]
    },
    ...teamprojectRoutes
];

export const RootRouter = () => useRoutes(routes);
