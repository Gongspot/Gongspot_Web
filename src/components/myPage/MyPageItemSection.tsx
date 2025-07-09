import MyPageItem from "./MyPageItem";
import heart from '../../assets/heart.svg';
import notice from '../../assets/notice.svg';

interface MyPageItemSectionProps {
    point: number;
}

const MyPageItemSection = ({ point }: MyPageItemSectionProps) => {
    return (
        <div className="flex items-center justify-between space-x-[1.625rem] bg-[#EFF7FB] px-[1.625rem] py-[1.625rem] font-medium">
            <MyPageItem
                icon={
                    <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full bg-[#4CB1F1]">
                        <span className="text-[0.813rem] text-white font-bold">P</span>
                    </div>
                }
                title="보유 포인트"
                value={`${point}P`}
            />
            <MyPageItem
                link="/mypage/spaces/likes"
                icon={
                    <img src={heart} alt="찜한 공간" className="h-[1.375rem] w-[1.375rem]" />
                }
                title="찜한 공간"
                value="보기"
            />
            <MyPageItem
                link="/mypage/notice"
                icon={
                    <img src={notice} alt="공지사항" className="h-[1.375rem] w-[1.375rem]" />
                }
                title="공지사항"
                value="보기"
            />
        </div>
    );
};

export default MyPageItemSection;