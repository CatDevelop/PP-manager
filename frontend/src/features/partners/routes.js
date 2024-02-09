import React from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import {PartnersPassportsPage} from "./pages/PartnersPassportsPage";
import {PartnersRequestsPage} from "./pages/PartnersRequestsPage";
import {PartnersCustomerCompaniesPage} from "./pages/PartnersCusomerCompaniesPage";

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
            {
                path: 'partners/customer-companies',
                element: <PartnersCustomerCompaniesPage/>
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
