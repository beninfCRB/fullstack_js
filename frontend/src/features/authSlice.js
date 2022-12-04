import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import * as api from '../app/api.js'
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useSelector } from "react-redux";


const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLogout: false,
    token: null,
}

export const login = createAsyncThunk('auth/login', async ({ values, navigate, toast }) => {
    try {
        const response = await api.login(values)
        toast.dismiss()
        toast.success('Login Berhasil')
        navigate('/dashboard')
        return response.data.Authorization
    } catch (error) {
        if (error.response) {
            toast.dismiss()
            toast.error("Username atau Password Salah")
        }
    }
})

export const logout = createAsyncThunk('auth/logout', async ({ navigate, toast }) => {
    try {
        const response = await api.logout()
        toast.dismiss()
        toast.success('Logout Berhasil')
        navigate('/')
        return response.data
    } catch (error) {
        if (error.response) {
            toast.dismiss()
            toast.error("Username atau Password Salah")
        }
    }
})


axios.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    const { user, token } = useSelector((state) => state.auth)
    if (user.exp * 1000 < currentDate.getTime()) {
        const response = token
        config.headers.Authorization = `Bearer ${response.data.Authorization}`
        return response.data.Authorization
    }
    return config;
}, (error) => {
    return Promise.reject(error.message)
})

export const refreshToken = createAsyncThunk('auth/token', async () => {
    try {
        const response = await api.token()
        return response.data.Authorization
    } catch (error) {
        if (error.response) {
            return Promise.reject(error.message)
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
            state.isError = false
            state.isLoading = true
            if (isRejected(login)) {
                state.isLoading = false
            }
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.token = action.payload
            state.user = jwt_decode(action.payload)
            // state.exp = jwt_decode(action.payload).exp
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = action.payload.message
        },
        [logout.pending]: (state, action) => {
            state.isLoading = true
        },
        [logout.fulfilled]: (state, action) => initialState,
        [refreshToken.pending]: (state, action) => {
            state.isError = false
            state.isLoading = true
        },
        [refreshToken.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.token = action.payload
            state.user = jwt_decode(action.payload)
            // state.exp = jwt_decode(action.payload).exp
        },
        [refreshToken.rejected]: (state, action) => initialState
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;