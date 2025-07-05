import MyPageItem from "./MyPageItem";
import heart from '../../assets/heart.svg';
import notice from '../../assets/notice.svg';

interface PMyPageItemSectionProps {
    point: number;
}

const MyPageItemSection = ({ point }: PMyPageItemSectionProps) => (
    <div className="flex bg-[#EFF7FB] px-[1.625rem] py-[1.625rem] items-center justify-between space-x-[1.625rem]">
        <MyPageItem
            icon={
                <div className="w-[1.375rem] h-[1.375rem] rounded-full bg-[#4CB1F1] flex items-center justify-center">
                    <span className="text-[0.813rem] text-white">P</span>
                </div>
            }
            title="보유 포인트"
            value={`${point}P`}
        />
        <MyPageItem
            icon={
                <img src={heart} alt="찜한 공간" className="w-[1.375rem] h-[1.375rem]" />
            }
            title="찜한 공간"
            value="보기"
        />
        <MyPageItem
            icon={
                <img src={notice} alt="공지사항" className="w-[1.375rem] h-[1.375rem]" />
            }
            title="공지사항"
            value="보기"
        />
    </div>
);

export default MyPageItemSection;