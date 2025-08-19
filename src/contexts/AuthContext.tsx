import { createContext, type PropsWithChildren, useContext, useState } from "react";

interface AuthContextType {
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
    isAdmin: false,
    setIsAdmin: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    return (
        <AuthContext.Provider
            value={{ isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }
    return context;
};