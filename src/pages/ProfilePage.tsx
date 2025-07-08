import Nickname from "../components/profile/Nickname";
import Profile from "../components/profile/Profile";
import NextButton from "../components/NextButton";
import TopHeader from "../components/TopHeader";
import { useState } from "react";

const nickname = "카공족";

const ProfilePage = () => {
  const [overlayActive, setOverlayActive] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <TopHeader title="프로필 관리" backButton={true} />
      <Profile onClick={() => setOverlayActive(true)} />
      <Nickname nickname={nickname} />
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
          <div className="fixed bottom-0 w-full px-[1rem] pb-[1.5rem] z-50">
            <button
              className="w-full bg-[#EFEFEF] text-[#007AFF] text-[1.125rem] rounded-[0.75rem]"
            >
              <p className="py-[1.125rem]">지금 촬영하기</p>
              <div className="w-full border-b-[0.063rem] border-[#D9D9D9]" />
              <p className="py-[1.125rem]">앨범에서 선택하기</p>
              <div className="w-full border-b-[0.063rem] border-[#D9D9D9]" />
              <p className="py-[1.125rem] text-[#FF3B30]">현재 사진 지우기</p>
            </button>
            <button
              className="w-full mt-[1rem] py-[1rem] bg-white text-[#007AFF] text-[1.125rem] font-medium rounded-[0.75rem]"
              onClick={() => setOverlayActive(false)}
            >
              취소
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
