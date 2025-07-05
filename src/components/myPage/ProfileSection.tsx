interface ProfileSectionProps {
    nickname: string;
    profile: string;
}

const ProfileSection = ({ nickname, profile }: ProfileSectionProps) => (
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
);

export default ProfileSection;