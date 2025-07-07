import profile from "../assets/profile.svg";
import TopHeader from "../components/homepage/TopHeader";
import ProfileSection from "../components/myPage/ProfileSection";
import MyPageItemSection from "../components/myPage/MyPageItemSection";
import MenuSection from "../components/myPage/MenuSection";

const nickname = "카공족";
const point = 500;

const MyPage = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <TopHeader title="마이페이지" backButton={false} />
      <ProfileSection nickname={nickname} profile={profile} />
      <MyPageItemSection point={point} />
      <MenuSection />
    </div>
  );
};

export default MyPage;
