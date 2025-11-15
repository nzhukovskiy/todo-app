import axios from "axios";
import {toast} from "react-toastify";
import type {AuthContextDataType} from "../context/auth-context.tsx";

const axiosApi = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
})

export const setupInterceptors = (authContext: AuthContextDataType) => {
    const requestInterceptor = axiosApi.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    const responseInterceptor = axiosApi.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401 && error.response.data.message === "Invalid token") {
                authContext.logout().then();
            }
            else {
                toast(error.response.data.message, {type: "error"});
            }
            return Promise.reject(error);
        }
    )

    return { requestInterceptor, responseInterceptor };
}


export { axiosApi }