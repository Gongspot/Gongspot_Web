import Nickname from "../components/profile/Nickname";
import Profile from "../components/profile/Profile";
import TopHeader from "../components/TopHeader";

const nickname = "카공족";

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <TopHeader title="프로필 관리" backButton={true} />
      <Profile />
      <Nickname nickname={nickname} />
    </div>
  );
};

export default ProfilePage;
