import axios from 'axios';
import TokenStorage from '../utils/TokenStorage';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = TokenStorage.getToken();

        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers.accessToken = accessToken; 
        }

        return config;
    },

    (error) => Promise.reject(error),
);