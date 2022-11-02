import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decoded from "jwt-decode"

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const refreshToken = createAsyncThunk('user/refreshToken', async (user, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/token')
        const decoded = jwt_decoded(response.data.accessToken)
        console.log(decoded)
        return decoded
    } catch (error) {
        if (error.response) {
            console.log(error.message)
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(refreshToken.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.loading = false
            state.isError = true
            state.message = action.payload
        })
    }
});

export const { reset } = authSlice.actions
export default authSlice.reducer