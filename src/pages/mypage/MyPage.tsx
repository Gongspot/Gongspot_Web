import { useState } from "react";
import MenuSection from "../../components/mypage/MenuSection";
import MyPageItemSection from "../../components/mypage/MyPageItemSection";
import ProfileSection from "../../components/mypage/ProfileSection";
import TopHeader from "../../components/TopHeader";
import ActionSheet from "../../components/mypage/account/ActionSheet";
import { postLogout } from "../../apis/mypage/mypage";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  const fetchLogout = async () => {
    try {
      const data = await postLogout();
      if (data.isSuccess) {
        alert("로그아웃 되었습니다.");
        navigate("/");
      }
    } catch (e) {
      console.error("Error fetching logout:", e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white pb-[5rem] scrollbar-hide">
      <TopHeader title="마이페이지" backButton={false} />
      <ProfileSection />
      <MyPageItemSection />
      <MenuSection onLogoutClick={() => setLogout(true)} />
      {logout && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-20 z-50"
          />
          <ActionSheet
            onClick={() => {
              fetchLogout();
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
