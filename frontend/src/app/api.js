import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000', headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const token = () => API.get('/token');
export const login = (formdata) => API.post('/login', formdata);
export const logout = () => API.delete('/logout');