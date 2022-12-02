import axios from "axios";
import { useSelector } from "react-redux";

const API = axios.create({
    baseURL: 'http://localhost:5000', headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

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

export const token = () => API.get('/token');
export const login = (formdata) => API.post('/login', formdata);
export const logout = () => API.delete('/logout');