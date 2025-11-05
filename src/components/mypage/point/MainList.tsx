import { Link } from 'react-router-dom';
import next from '../../../assets/next.svg';

const MainList = () => {
    return (
        <>
            <Link
                to="/mypage/point/charge"
                className="flex items-center justify-between pt-[1.125rem] px-[1.75rem] my-[1.125rem] 
                text-[0.938rem]"
            >
                포인트 충전하기
                <img src={next} alt="다음" />
            </Link>
            <div className="h-[0.063rem] w-full border-b border-[#B1B8C154]" />
            <Link
                to="/mypage/point/detail"
                className="flex items-center justify-between px-[1.75rem] my-[1.125rem] 
                text-[0.938rem]"
            >
                포인트 내역
                <img src={next} alt="다음" />
            </Link>
            <div className="h-[0.063rem] w-full border-b border-[#B1B8C154]" />
        </>
    );
};

export default MainList;