import React from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import {PartnersPassportsPage} from "./pages/PartnersPassportsPage";
import {PartnersRequestsPage} from "./pages/PartnersRequestsPage";

export const partnersRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: 'partners/requests',
                element: <PartnersRequestsPage/>
            },
            {
                path: 'partners/passports',
                element: <PartnersPassportsPage/>
            },
            // {
            //     path: 'teamproject/projects/:id',
            //     element: <AnalyticPage/>
            // },
            //
            // {
            //     path: 'teamproject/users',
            //     element: <TeamprojectUsersPage/>
            // },
            // {
            //     path: 'teamproject/users/:id',
            //     element: <TeamprojectUserPage/>
            // },
        ]
    },
]
