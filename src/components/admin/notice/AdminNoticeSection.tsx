import { Link } from "react-router-dom";
import Category from "./Category";

interface Notice {
  id: number;
  title: string;
  date: string;
  category: string;
}

interface NoticeSectionProps {
  notices: Notice[];
}

const AdminNoticeSection = ({ notices }: NoticeSectionProps) => {
    return (
        <>
            {notices.map((item) => (
                <div key={item.id}>
                    <div className="flex items-center justify-between px-[1.25rem] my-[1.125rem] w-full">
                        <div className="flex items-center">
                            <div className="mr-[0.375rem]">
                                <Category text={item.category} />
                            </div>
                            <Link to={`/admin/notices/${item.id}`}>
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