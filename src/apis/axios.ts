import axios from 'axios';
import AccessTokenStorage from '../utils/AccessTokenStorage';
import RefreshTokenStorage from '../utils/RefreshTokenStorage';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

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

let refreshPromise: Promise<string> | null = null;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 재시도 하지 않은 요청 처리
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // refresh 재발급 시 401 에러 발생한 경우, 로그아웃 처리
            if (originalRequest.url.startsWith("/auth/reissue")) {
                AccessTokenStorage.removeToken();
                RefreshTokenStorage.removeToken();

                window.location.href = "/";
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            // 리프레시 요청이 진행 중인 경우, Promise 재사용
            if (!refreshPromise) {
                // refresh 요청 실행 후, Promise를 전역 변수에 할당
                refreshPromise = (async () => {
                    try {
                        const refreshToken = RefreshTokenStorage.getToken();

                        const { data } = await axiosInstance.post(
                            "/auth/reissue", {}, {
                                headers: {
                                    "Refresh-Token": refreshToken,
                                },
                            }
                        );

                        AccessTokenStorage.setToken(data.result.accessToken);
                        RefreshTokenStorage.setToken(data.result.refreshToken);

                        return data.result.accessToken;
                    } catch (error) {
                        AccessTokenStorage.removeToken();
                        RefreshTokenStorage.removeToken();
                        throw error;
                    } finally {
                        refreshPromise = null;
                    }
                })();
            }

            try {
                const newAccessToken = await refreshPromise;
                // 원본 요청 헤더 갱신 후 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance.request(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    },
);