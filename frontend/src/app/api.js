import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const login = (formdata) => API.post('/login', formdata);
export const logout = () => API.delete('/logout');
export const token = () => API.get('/token');