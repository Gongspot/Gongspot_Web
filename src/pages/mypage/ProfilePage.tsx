import Nickname from "../../components/mypage/profile/Nickname";
import Profile from "../../components/mypage/profile/Profile";
import NextButton from "../../components/NextButton";
import TopHeader from "../../components/TopHeader";
import { useEffect, useState } from "react";
import ActionSheet from "../../components/mypage/profile/ActionSheet";
import { getProfile, patchProfile } from "../../apis/mypage/mypage";
import defaultProfile from "../../assets/profile.svg";

const ProfilePage = () => {
  const [overlayActive, setOverlayActive] = useState(false);
  const [nickname, setNickname] = useState<string>("");
  const [profile, setProfile] = useState<string>(defaultProfile);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setProfile(fileUrl);
    }
    setOverlayActive(false);
  };

  const handleUpdateProfile = async () => {
    try {
      const body = {
        nickname: nickname,
        profileImg: profile,
      };
      await patchProfile(body);
      alert("프로필이 변경되었습니다.");
    } catch (error) {
      console.error("프로필 변경 실패:", error);
      alert("프로필 변경에 실패했습니다.");
    }
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data.isSuccess) {
            setNickname(data.result.nickname);
            setProfile(data.result.profileImg);
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex-1">
        <TopHeader title="프로필 관리" backButton={true} />
        <Profile profile={profile} onClick={() => setOverlayActive(true)} />
        <Nickname nickname={nickname} setNickname={setNickname} />
        <input
          type="file"
          id="profile"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <NextButton
        text="변경하기"
        onClick={handleUpdateProfile}
      />
      {overlayActive && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-20 z-40"
          />
          <ActionSheet
            onTake={() => {
              const input = document.getElementById("profile") as HTMLInputElement;
              if (input) {
                input.setAttribute("capture", "environment");
                input.click();
              }
              setOverlayActive(false);
            }}
            onSelect={() => {
              const input = document.getElementById("profile") as HTMLInputElement;
              if (input) {
                input.removeAttribute("capture");
                input.click();
              }
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
