import profile from "../../assets/profile.svg";
import camera from "../../assets/camera.svg";

const Profile = () => {
    return (
        <div className="mt-[2.5rem]">
            <div className="pt-[2.75rem] flex items-center justify-center">
                <span className="flex relative w-[5.25rem] h-[5.25rem] items-center justify-center 
                rounded-full bg-[#D9D9D9]">
                    <img src={profile} alt="프로필" className="w-[3rem] h-[3rem]" />
                    <span className="flex w-[1.625rem] h-[1.625rem] items-center justify-center rounded-full 
                    bg-white border-[0.063rem] border-[#D9D9D9] absolute bottom-0 right-0">
                        <img src={camera} alt="카메라" />
                    </span>
                </span>
            </div>
        </div>
    );
};

export default Profile;