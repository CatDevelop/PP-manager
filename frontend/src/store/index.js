import {configureStore} from '@reduxjs/toolkit';
import teamprojectReducer from "./slices/teamprojectSlice";
import projectsReducer from "./slices/projectsSlice";
import projectReducer from "./slices/projectSlice";
import authReducer from "./slices/authSlice";
import passportsReducer from "./slices/passportsSlice";
import passportReducer from "./slices/passportSlice";
import requestsReducer from "./slices/requestsSlice";
import analyticReducer from "./slices/analyticSlice";
import customerCompaniesReducer from "./slices/customerCompaniesSlice";
import customerUsersReducer from "./slices/customerUsersSlice";
import tagsReducer from "./slices/tagsSlice";
import studentsReducer from "./slices/studentsSlice";
import periodsReducer from "./slices/periodsSlice";
import studentReducer from "./slices/studentSlice";

export const store = configureStore({
    reducer: {
        teamproject: teamprojectReducer,
        projects: projectsReducer,
        requests: requestsReducer,
        students: studentsReducer,
        passports: passportsReducer,
        passport: passportReducer,
        project: projectReducer,
        auth: authReducer,
        analytic: analyticReducer,
        customerCompanies: customerCompaniesReducer,
        customerUsers: customerUsersReducer,
        tags: tagsReducer,
        periods: periodsReducer,
        student: studentReducer,
    },
});
