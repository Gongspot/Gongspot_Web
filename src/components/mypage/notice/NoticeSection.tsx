import { useEffect, useState } from "react";
import { getNotice } from "../../../apis/mypage/notice";
import type { Notice } from "../../../types/mypage";
import { Link } from "react-router-dom";

const NoticeSection = () => {
    const [notice, setNotice] = useState<Notice[] | null>(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const data = await getNotice();
                if (data.isSuccess) {
                    setNotice(data.result.notificationList);
                }
            } catch (e) {
                console.error("Error fetching notices:", e);
            }
        };
        fetchNotice();
    }, []);

    return (
        <>
            {notice?.map((item: Notice) => (
                <Link 
                    to={`/mypage/notices/${item.notificationId}`} 
                    key={item.notificationId} 
                    className="block"
                >
                    <div
                    className="flex items-center justify-between px-[1.75rem] my-[1.125rem] 
                    text-[0.938rem] text-black"
                    >
                        {item.title}
                        <p className="text-[#8F9098]">{item.date}</p>
                    </div>
                    <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
                </Link>
            ))}
        </>
    );
};

export default NoticeSection;