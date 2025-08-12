import { Link } from "react-router-dom";
import Category from "./Category";
import type { NoticeAdmin } from "../../../types/admin";

interface NoticeSectionProps {
  notices: NoticeAdmin[];
}

const typeMap: Record<string, string> = {
  B: "배너",
  N: "일반",
};

const AdminNoticeSection = ({ notices }: NoticeSectionProps) => {
    return (
        <>
            {notices.map((item) => (
                <div key={item.notificationId}>
                    <div className="flex items-center justify-between px-[1.25rem] my-[1.125rem] w-full">
                        <div className="flex items-center">
                            <div className="mr-[0.375rem]">
                                <Category text={typeMap[item.type]} />
                            </div>
                            <Link to={`/admin/notices/${item.notificationId}`}>
                                <span>{item.title}</span>
                            </Link>
                        </div>
                        <p className="text-[#8F9098]">{item.date}</p>
                    </div>
                    <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
                </div>
            ))}
        </>
    );
};

export default AdminNoticeSection;