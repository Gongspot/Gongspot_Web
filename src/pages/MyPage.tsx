import profile from "../assets/profile.svg";
import MenuSection from "../components/myPage/MenuSection";
import MyPageItemSection from "../components/myPage/MyPageItemSection";
import ProfileSection from "../components/myPage/ProfileSection";
import TopHeader from "../components/TopHeader";

const nickname = "카공족";
const point = 500;

const MyPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white pb-[5rem]">
      <TopHeader title="마이페이지" backButton={false} />
      <ProfileSection nickname={nickname} profile={profile} />
      <MyPageItemSection point={point} />
      <MenuSection />
    </div>
  );
};

export default MyPage;
