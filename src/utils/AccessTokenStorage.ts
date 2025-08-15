import { LOCAL_STORAGE_KEY } from "../constants/key";

class AccessTokenStorage {
    static setToken = (token: string): void => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
        } catch (error) {
            console.error("Failed to set access token:", error);
        }
    };

    static getToken = (): string | null => {
    try {
        return localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    } catch (error) {
        console.error("Failed to get access token:", error);
        return null;
    }
    };

    static removeToken = (): void => {
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        } catch (error) {
            console.error("Failed to remove access token:", error);
        }
    };
};

export default AccessTokenStorage;