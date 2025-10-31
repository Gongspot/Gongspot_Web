import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MyPageItemProps {
    link: string;
    icon: ReactNode;
    title: string;
    value: string;
}

const MyPageItem = ({ link, icon, title, value }: MyPageItemProps) => {
    const content = (
        <>
            <div className="flex items-center justify-center mb-[0.438rem]">
                {icon}
            </div>
            <span>{title}</span>
            <span className="text-[#4CB1F1]">{value}</span>
        </>
    );


    return (
        <Link
            to={link}
            className="w-full flex flex-col items-center bg-white 
                border border-[#E5E5E5] rounded-[0.938rem] py-[0.75rem] text-[0.75rem]"
        >
            {content}
        </Link>
    );
};

export default MyPageItem;