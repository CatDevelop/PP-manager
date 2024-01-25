import React from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import {TeamprojectProjectsPage} from "./pages/TeamprojectProjectsPage";
import {TeamprojectProjectPage} from "./pages/TeamprojectProjectPage";
import {TeamprojectUsersPage} from "./pages/TeamprojectUsersPage";
import {TeamprojectUserPage} from "./pages/TeamprojectUserPage";

export const teamprojectRoutes = [
    {
        element: <MainLayout/>,
        children: [
            {
                path: 'teamproject/projects',
                element: <TeamprojectProjectsPage/>
            },
            // {
            //     path: 'teamproject/projects/:id',
            //     element: <TeamprojectProjectPage/>
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
