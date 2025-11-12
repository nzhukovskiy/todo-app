import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
})

axiosApi.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token');
        // if (token) {
            config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwucnUiLCJpYXQiOjE3NjI5NDc1NDcsImV4cCI6MTc2MzgxMTU0N30.1afz-U-0bpnyaCJ8WRT_ftWXULDYqAsPFzg351Qw7p4`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export { axiosApi }