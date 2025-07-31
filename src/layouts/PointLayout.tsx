import { Outlet } from "react-router-dom";
import MyPointSection from "../components/mypage/point/MyPointSection";
import TopHeader from "../components/TopHeader";
import { useEffect, useState } from "react";
import { getPoint } from "../apis/mypage/point";

const PointLayout = () => {
    const [point, setPoint] = useState(0);

    useEffect(() => {
        const fetchPoint = async () => {
            try {
                const data = await getPoint();
                if (data.isSuccess) {
                    setPoint(data.result.totalPoints);
                }
            } catch (e) {
                setPoint(-1);
                console.error("Error fetching total points:", e);
            }
        };
        fetchPoint();
    }, []);
    
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