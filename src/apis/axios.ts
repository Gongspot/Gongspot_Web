import axios, { type InternalAxiosRequestConfig } from 'axios';
import AccessTokenStorage from '../utils/AccessTokenStorage';
import RefreshTokenStorage from '../utils/RefreshTokenStorage';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface FailedRequest {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token?: string) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = AccessTokenStorage.getToken();

        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers.accessToken = accessToken; 
        }
        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustomAxiosRequestConfig = error.config;

        // 재시도 하지 않은 요청 처리
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // refresh 재발급 시 401 에러 발생한 경우, 로그아웃 처리
            if (originalRequest.url?.startsWith("/auth/reissue")) {
                AccessTokenStorage.removeToken();
                RefreshTokenStorage.removeToken();
                window.location.href = "/";

                return Promise.reject(error);
            }

            // 다른 요청이 토큰 재발급 중인 경우, 큐에 추가
            if (isRefreshing) {

                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((newToken) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        originalRequest.headers.accessToken = newToken;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }
            isRefreshing = true;

            // refresh 요청 실행 후, Promise를 전역 변수에 할당
            try {
                const refreshToken = RefreshTokenStorage.getToken();
                const { data } = await axiosInstance.post(
                    "/auth/reissue", {}, {
                        headers: {
                            "Refresh-Token": refreshToken,
                        },
                    }
                );

                if (!data.isSuccess) {
                    throw new Error("Failed to refresh token");
                }
                
                AccessTokenStorage.setToken(data.result.accessToken);
                RefreshTokenStorage.setToken(data.result.refreshToken);
                processQueue(undefined, data.result.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.result.accessToken}`;
                originalRequest.headers.accessToken = data.result.accessToken;

                return axiosInstance(originalRequest);
            } catch (error) {
                processQueue(error, undefined);
                AccessTokenStorage.removeToken();
                RefreshTokenStorage.removeToken();
                window.location.href = '/';
                
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    },
);