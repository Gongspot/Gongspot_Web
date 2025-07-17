import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
/*     
    추후 관리자 계정 연결
    const { user } = useAuth();

    if (user.id !== 1) {
        return <Navigate to={"/"} replace />;
    }
 */
    return <Outlet />;
};

export default ProtectedLayout;