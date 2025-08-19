import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedLayout = () => {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to="/home" replace />;
    }
 
    return <Outlet />;
};

export default ProtectedLayout;