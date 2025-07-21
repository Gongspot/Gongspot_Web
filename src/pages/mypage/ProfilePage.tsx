import Nickname from "../../components/mypage/profile/Nickname";
import Profile from "../../components/mypage/profile/Profile";
import NextButton from "../../components/NextButton";
import TopHeader from "../../components/TopHeader";
import { useState } from "react";
import ActionSheet from "../../components/mypage/profile/ActionSheet";

const nickname = "카공족";

const ProfilePage = () => {
  const [overlayActive, setOverlayActive] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex-1">
        <TopHeader title="프로필 관리" backButton={true} />
        <Profile onClick={() => setOverlayActive(true)} />
        <Nickname nickname={nickname} />
      </div>
      <NextButton
        text="변경하기"
        onClick={() => {
          alert("프로필이 변경되었습니다.");
        }}
      />
      {overlayActive && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-15 z-40"
          />
          <ActionSheet
            onTake={() => {
              alert("사진을 촬영합니다.");
              setOverlayActive(false);
            }}
            onSelect={() => {
              alert("앨범에서 사진을 선택합니다.");
              setOverlayActive(false);
            }}
            onRemove={() => {
              alert("현재 사진을 지웁니다.");
              setOverlayActive(false);
            }}
            onCancel={() => {
              setOverlayActive(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
