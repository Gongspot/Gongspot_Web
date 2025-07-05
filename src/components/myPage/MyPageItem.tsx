import type { ReactNode } from "react";

interface MyPageItemProps {
    icon: ReactNode;
    title: string;
    value: string;
    onClick?: () => void;
}

const MyPageItem = ({ icon, title, value, onClick }: MyPageItemProps) => {
    return (
        <div className="flex flex-col items-center text-[0.75rem] bg-white
            rounded-[0.938rem] border border-[#E5E5E5] py-[0.75rem] w-full"
            onClick={onClick}
        >
            <div className="mb-[0.438rem] flex items-center justify-center">
                {icon}
            </div>
            <h3>{title}</h3>
            <span className="text-[#4CB1F1]">{value}</span>
        </div>
    );
};

export default MyPageItem;