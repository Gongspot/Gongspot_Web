import MyPageItem from "../components/myPage/MyPageItem";
import TopHeader from "../components/TopHeader";
import heart from '../assets/heart.svg';
import notice from '../assets/notice.svg';
import Menu from "../components/myPage/Menu";
import SubMenu from "../components/myPage/SubMemu";
import profile from '../assets/profile.svg';

const nickname = "카공족";
const point = 500;

const MyPage = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <TopHeader title="마이페이지" backButton={false} />
      <div className="pt-[2.5rem]">
        <div className="flex items-center m-[1.75rem] mb-[1.938rem]">
          <span className="flex w-[2.938rem] h-[2.938rem] rounded-full bg-[#D9D9D9] items-center justify-center">
            <img src={profile} alt="프로필" />
          </span>
          <span className="flex flex-col justify-center ml-[1.125rem]">
            <h1 className="text-[1.438rem]">
              <span className="font-bold text-[#4CB1F1]">{nickname}</span>님
            </h1>
            <p className="text-[0.938rem] text-[#616161]">오늘 하루도 환영합니다!</p>
          </span>
        </div>
      </div>
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
      
      <Menu text="프로필 관리" />
      <SubMenu text="프로필 관리" />
      <div className="mt-[1.25rem] border-b border-[#CCCCCC] h-[0.063rem] w-full" />
      <Menu text="공관 관리" />
      <div className="flex flex-col gap-[0.563rem]">
        <SubMenu text="내가 방문한 공간" />
        <SubMenu text="새 공간 등록 신청" />
      </div>
      <div className="mt-[1.25rem] border-b border-[#CCCCCC] h-[0.063rem] w-full" />
      <Menu text="알림 설정" />
      <SubMenu text="알림 설정" />
      <div className="mt-[1.25rem] border-b border-[#CCCCCC] h-[0.063rem] w-full" />
      <Menu text="포인트" />
      <div className="flex flex-col gap-[0.563rem]">
        <SubMenu text="나의 포인트" />
        <SubMenu text="포인트 충전하기" />
      </div>
    </div>
  );
};

export default MyPage;