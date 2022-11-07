import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../app/api.js'
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    token: null,
    exp: null
}

export const login = createAsyncThunk('/login', async ({ formValue, navigate, toast }) => {
    try {
        const response = await api.login(formValue)
        toast.success('Login Berhasil')
        navigate('/dashboard')
        return response.data.accessToken
    } catch (error) {
        toast.error(error.message)
    }
})

export const logout = createAsyncThunk('/logout', async ({ navigate, toast }) => {
    try {
        const response = await api.logout()
        toast.success('Logout Berhasil')
        navigate('/')
        return response.data
    } catch (error) {
        toast.error(error.message)
    }
})


axios.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    const { exp } = useSelector((state) => state.auth)
    if (exp * 1000 < currentDate.getTime()) {
        const response = await api.token()
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
        return response.data.accessToken
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})

export const refreshToken = createAsyncThunk('/logout', async ({ navigate }) => {
    try {
        const response = await api.token()
        return response.data.accessToken
    } catch (error) {
        if (error.response) {
            navigate('/')
        }
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.token = action.payload
            state.user = jwt_decode(action.payload)
            state.exp = jwt_decode(action.payload).exp
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = action.payload.message;
        },
        [logout.pending]: (state, action) => {
            state.isLoading = true
        },
        [logout.fulfilled]: (state, action) => initialState,
        [refreshToken.fulfilled]: (state, action) => {
            state.token = action.payload
            state.user = jwt_decode(action.payload)
            state.exp = jwt_decode(action.payload).exp
        },
        [refreshToken.rejected]: (state, action) => {
            state.isError = true
        }
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;