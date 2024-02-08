import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from "../../api/API";

export const getAllRequests = createAsyncThunk(
    'requests/all',
    async function (data, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(
                `${API.GET_REQUESTS}/${data.period_id}/`,
                {
                    method: 'get',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("PP-manager-accessToken")
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка сервера!");
            }

            response = await response.json()
            dispatch(setRequests(response))

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    requests: [],
    isLoading: true
};

const requestsSlice = createSlice({
        name: 'requests',
        initialState: initialState,
        reducers: {
            setRequests(state, action) {
                state.requests = action.payload
                state.isLoading = false;
            },
            removeRequests(state) {
                state.requests = []
                state.isLoading = true;
            }
        },
        extraReducers: builder => builder
            .addCase(getAllRequests.rejected, (state, action) => {
                throw new Error(action.payload);
            })
    })
;

export const {setRequests, removeRequests} = requestsSlice.actions;

export default requestsSlice.reducer;
