import {configureStore} from '@reduxjs/toolkit';
import teamprojectReducer from "./slices/teamprojectSlice";
import projectsReducer from "./slices/projectsSlice";

export const store = configureStore({
    reducer: {
        teamproject: teamprojectReducer,
        projects: projectsReducer
    },
});
