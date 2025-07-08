import { Outlet } from "react-router-dom";
import MyPointSection from "../components/point/MyPointSection";
import TopHeader from "../components/TopHeader";

const point = 56;

const PointLayout = () => {
    return (
    <div className="flex flex-col h-screen w-full bg-[#EFF7FB]">
        <TopHeader title="나의 포인트" backButton={true} />
        <MyPointSection point={point} />
        <div 
            className="flex-1 bg-white border border-[#B1B8C154] rounded-tl-[1.25rem] rounded-tr-[1.25rem]"
            style={{ boxShadow: '0px -2px 10px 0px #0000000D' }}>
            <Outlet />

        </div>
    </div>
    );
};

export default PointLayout;