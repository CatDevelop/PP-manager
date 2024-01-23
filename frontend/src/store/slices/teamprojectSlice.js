import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


export const parseProjects = createAsyncThunk(
    'teamproject/parse',
    async function (data, {rejectWithValue, dispatch}) {
        try {
            if (!data.token)
                throw new Error("Необходимо вставить Bearer-токен!");

            let returnResult = []
            let myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + data.token);

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };

            let periods = await fetch("https://teamproject.urfu.ru/api/v2/periods", requestOptions)
                .then(response => response.json())
                .then(result => result)
                .catch(error => console.log('error', error));

            let projects = []

            for (const period of periods.periods) {
                let localProjects = await fetch(
                    "https://teamproject.urfu.ru/api/v2/workspaces?status=any&year=" + period.year + "&semester=" + period.term + "&size=10000&page=1", requestOptions)
                    .then(response => response.json())
                    .then(result => result)
                    .catch(error => console.log('error', error))
                console.log(period, projects.length)
                projects.push(...localProjects.items)
            }

            let i = 0
            for (const project of projects) {
                let details = {}
                let results = {}
                let documents = {}
                let team = {}
                console.log(i)
                i += 1;

                await fetch("https://teamproject.urfu.ru/api/v2/workspaces/" + project.id + "/documents/results", requestOptions)
                    .then(response => response.json())
                    .then(result => documents = result)
                    .catch(error => console.log('error', error));

                await fetch("https://teamproject.urfu.ru/api/v2/workspaces/" + project.id + "/details", requestOptions)
                    .then(response => response.json())
                    .then(result => details = result)
                    .catch(error => console.log('error', error));

                await fetch("https://teamproject.urfu.ru/api/v2/workspaces/" + project.id + "/result", requestOptions)
                    .then(response => response.json())
                    .then(result => results = result)
                    .catch(error => console.log('error', error));

                await fetch("https://teamproject.urfu.ru/api/v2/workspaces/" + project.id + "/team", requestOptions)
                    .then(response => response.json())
                    .then(result => team = result)
                    .catch(error => console.log('error', error));

                returnResult.push({project, details, results, documents, team})
            }
            // return returnResult;





















            // let response = await fetch(
            //     "https://pp-manager.vercel.app/api/teamproject",
            //     {
            //         method: 'post',
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify(data)
            //     }
            // );
            //
            // if (!response.ok) {
            //     throw new Error("Ошибка сервера!");
            // }
            //
            // response = await response.json()
            localStorage.setItem("PP-analyze-projects", JSON.stringify(returnResult))
            dispatch(setTeamproject(returnResult))

            return returnResult;
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
    })
;

export const {setTeamproject, removeTeamproject} = teamprojectSlice.actions;

export default teamprojectSlice.reducer;
