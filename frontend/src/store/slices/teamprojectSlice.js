import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from "../../api/API";
import {getAllProjects} from "./projectsSlice";


export const parseProjects = createAsyncThunk(
    'teamproject/parse',
    async function (data, {rejectWithValue, dispatch}) {
        try {
            if (!data.token)
                throw new Error("Необходимо вставить Bearer-токен!");

            let response = await fetch(
                API.PARSE_PROJECTS,
                {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("PP-manager-accessToken")
                    },
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                if (response.status === 401)
                    throw new Error("Неверный Bearer токен!");
                throw new Error("Ошибка сервера!");
            }

            response = await response.json()
            dispatch(getAllProjects({year: data.year, term: data.term}))

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createReport = createAsyncThunk(
    'teamproject/report',
    async function (data, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                "http://94.241.139.33:5000/api/teamproject/report",
                {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("PP-manager-accessToken")
                    },
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка сервера!");
            }

            response = await response.json()
            // localStorage.setItem("PP-analyze-projects", JSON.stringify(response))
            // dispatch(setTeamproject(response))

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    projects: [],
    isLoading: true
};

const teamprojectSlice = createSlice({
        name: 'teamproject',
        initialState: initialState,
        reducers: {
            setTeamproject(state, action) {
                state.projects = action.payload
                state.isLoading = false;
            },
            removeTeamproject(state) {
                state.projects = []
                state.isLoading = true;
            },
        },
        extraReducers: builder => builder
            .addCase(parseProjects.rejected, (state, action) => {
                throw new Error(action.payload);
            })
            .addCase(createReport.rejected, (state, action) => {
                throw new Error(action.payload);
            })
    })
;

export const {setTeamproject, removeTeamproject} = teamprojectSlice.actions;

export default teamprojectSlice.reducer;
