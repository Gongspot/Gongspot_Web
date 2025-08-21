import { useState } from "react";
import NextButton from "../../components/NextButton";
import TopHeader from "../../components/TopHeader";
import ContentSection from "../../components/mypage/account/ContentSection";
import ConfirmButton from "../../components/mypage/account/ConfirmButton";
import { patchQuit } from "../../apis/mypage/mypage";
import { useNavigate } from "react-router-dom";

const WithdrawalPage = () => {
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const disabledClass =
    "w-full py-[0.813rem] bg-white text-[#8F9098] text-[1rem] rounded-[0.313rem] border-[0.063rem] border-[#CCCCCC]";

  const fetchQuit = async () => {
    try {
      const data = await patchQuit();
      if (data.isSuccess) {
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      }
    } catch (e) {
      console.error("Error fetching logout:", e);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex-1">
        <TopHeader title="회원 탈퇴" backButton={true} />
        <ContentSection />
      </div>
      <div className="flex items-center justify-start px-[1.75rem] py-[0.75rem]">
        <ConfirmButton 
          selected={selected}
          onClick={() => setSelected((prev) => !prev)}
        />
        <span className="pl-[0.5rem] text-[0.75rem]">공스팟 회원 탈퇴 유의사항을 확인했습니다.</span>
      </div>
      <NextButton
        text="탈퇴하기"
        className={!selected ? disabledClass : undefined}
        disabled={!selected}
        onClick={() => {
          fetchQuit();
        }}
      />
    </div>
  );
};

export default WithdrawalPage;
