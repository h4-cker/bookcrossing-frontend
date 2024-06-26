import axios from "axios";
import {BASE_URL} from "../../config.jsx";

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})