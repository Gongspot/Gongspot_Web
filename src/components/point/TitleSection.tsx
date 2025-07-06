import { Link } from 'react-router-dom';
import back from '../../assets/back.svg';

interface TitleSectionProps {
    title: string;
}

const TitleSection = ({ title }: TitleSectionProps) => {
    return (
        <>
            <div
            className="relative flex items-center py-[1rem]"
            >
                <Link to="/mypage/point" className="flex items-center">
                    <img src={back} alt="이전" className="px-[1.438rem] absolute left-0" />
                </Link>
                <h1 className="mx-auto text-[0.938rem]">{title}</h1>
            </div>
            <div className="w-full border-[0.063rem] border-[#B1B8C154]" />
        </>
    );
};

export default TitleSection;