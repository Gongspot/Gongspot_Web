import { LOCAL_STORAGE_KEY } from "../constants/key";

class TokenStorage {

    static setToken = (token: string): void => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
        } catch (error) {
            console.error("Failed to set token to localStorage:", error);
        }
    };

    static getToken = (): string | null => {
    try {
        return localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    } catch (error) {
        console.error("Failed to get token from localStorage:", error);
        return null;
    }
    };

    static removeToken = (): void => {
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        } catch (error) {
            console.error("Failed to remove token from localStorage:", error);
        }
    };
};

export default TokenStorage;