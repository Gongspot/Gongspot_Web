import { LOCAL_STORAGE_KEY } from "../constants/key";

class RefreshTokenStorage {

    static setToken = (token: string): void => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);
        } catch (error) {
            console.error("Failed to set refresh token:", error);
        }
    };

    static getToken = (): string | null => {
    try {
        return localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
    } catch (error) {
        console.error("Failed to get refresh token:", error);
        return null;
    }
    };

    static removeToken = (): void => {
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        } catch (error) {
            console.error("Failed to remove refresh token:", error);
        }
    };
};

export default RefreshTokenStorage;