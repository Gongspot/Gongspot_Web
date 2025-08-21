import { useEffect, useState } from "react";
import { getProfile } from "../../apis/mypage/mypage";
import defaultProfile from "../../assets/profile.svg";

const ProfileSection = () => {
    const [nickname, setNickname] = useState<string | null>(null);
    const [profile, setProfile] = useState<string>(defaultProfile);
    const isDefault = profile === defaultProfile;

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
        <div className="pt-0">
            <div className="m-[1.75rem] flex items-center">
                <span className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#D9D9D9]">
                    <img 
                        src={profile} alt="프로필"
                        className={`object-cover rounded-full ${isDefault ? 'w-[1.5rem] h-[1.5rem]' : 'w-full h-full'}`} />
                </span>
                <span className="ml-[1.125rem] flex flex-col justify-center font-medium">
                    <h1 className="text-[1.438rem]">
                        <span className="font-bold text-[#4CB1F1]">{nickname}</span>님
                    </h1>
                    <p className="text-[0.938rem] text-[#616161]">오늘 하루도 환영합니다!</p>
                </span>
            </div>
        </div>
    );
};

export default ProfileSection;