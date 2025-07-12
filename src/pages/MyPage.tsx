import { useState } from "react";
import profile from "../assets/profile.svg";
import MenuSection from "../components/myPage/MenuSection";
import MyPageItemSection from "../components/myPage/MyPageItemSection";
import ProfileSection from "../components/myPage/ProfileSection";
import TopHeader from "../components/TopHeader";
import ActionSheet from "../components/myPage/account/ActionSheet";

const nickname = "카공족";
const point = 500;

const MyPage = () => {
  const [logout, setLogout] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-white pb-[5rem]">
      <TopHeader title="마이페이지" backButton={false} />
      <ProfileSection nickname={nickname} profile={profile} />
      <MyPageItemSection point={point} />
      <MenuSection onLogoutClick={() => setLogout(true)} />
      {logout && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-15 z-50"
          />
          <ActionSheet
            onClick={() => {
              alert("로그아웃 되었습니다.");
              setLogout(false);
            }}
            onCancel={() => {
              setLogout(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default MyPage;
