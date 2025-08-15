import { Outlet } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import ScrollToTop from "../components/ScrollToTop";

const PublicLayout = () => {
    return (
        <div className="font-sans bg-[#EFF7FB] h-[100dvh] flex flex-col">
            <ScrollToTop />
            <div className="flex-1 min-h-0">
            <Outlet />
            </div>
            <BottomNavBar />
        </div>
    );
};

export default PublicLayout;