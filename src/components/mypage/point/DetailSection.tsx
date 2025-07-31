import { useEffect, useState } from "react";
import DetailItem from "./DetailItem";
import { getPointHistory } from "../../../apis/mypage/point";
import type { PointHistoryResult } from "../../../types/mypage";

const DetailSection = () => {
    const [chargeList, setChargeList] = useState<PointHistoryResult[]>([]);
    
        useEffect(() => {
            const fetchPoint = async () => {
                try {
                    const data = await getPointHistory();
                    if (data.isSuccess) {
                        setChargeList(data.result.result);
                    }
                } catch (e) {
                    console.error("Error fetching total points:", e);
                }
            };
            fetchPoint();
        }, []);
        
    return (
        <div>
            {chargeList.map((item, idx) => (
                <DetailItem key={idx} point={item.updatedPoint} text={item.content} date={item.date} />
            ))}
        </div>
    );
};

export default DetailSection;