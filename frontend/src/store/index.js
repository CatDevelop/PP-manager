import {configureStore} from '@reduxjs/toolkit';
import teamprojectReducer from "./slices/teamprojectSlice";
import projectsReducer from "./slices/projectsSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
    reducer: {
        teamproject: teamprojectReducer,
        projects: projectsReducer,
        project: projectReducer
    },
});
