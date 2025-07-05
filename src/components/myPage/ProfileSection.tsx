interface ProfileSectionProps {
    nickname: string;
    profile: string;
}

const ProfileSection = ({ nickname, profile }: ProfileSectionProps) => {
    return (
        <div className="pt-[2.5rem]">
            <div className="mb-[1.938rem] m-[1.75rem] flex items-center">
                <span className="flex h-[2.938rem] w-[2.938rem] items-center justify-center rounded-full bg-[#D9D9D9]">
                    <img src={profile} alt="프로필" />
                </span>
                <span className="ml-[1.125rem] flex flex-col justify-center">
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