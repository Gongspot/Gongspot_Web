import type { ReactNode } from "react";

interface MyPageItemProps {
    icon: ReactNode;
    title: string;
    value: string;
    onClick?: () => void;
}

const MyPageItem = ({ icon, title, value, onClick }: MyPageItemProps) => {
    return (
        <div
            className="w-full flex flex-col items-center bg-white 
            border border-[#E5E5E5] rounded-[0.938rem] py-[0.75rem] text-[0.75rem]"
            onClick={onClick}
        >
            <div className="flex items-center justify-center mb-[0.438rem]">
            {icon}
            </div>
            <h3>{title}</h3>
            <span className="text-[#4CB1F1]">{value}</span>
        </div>
    );
};

export default MyPageItem;