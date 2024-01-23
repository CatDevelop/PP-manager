import {configureStore} from '@reduxjs/toolkit';
import teamprojectReducer from "./slices/teamprojectSlice";

export const store = configureStore({
    reducer: {
        teamproject: teamprojectReducer
    },
});
