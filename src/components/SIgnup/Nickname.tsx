import { useState } from "react";
import NextButton from "../NextButton";

interface NicknameProps {
  onNext: () => void;
  nickname: string;
  setNickname: (value: string) => void;
}

const Nickname = ({ onNext, nickname, setNickname }: NicknameProps) => {
  const [message, setMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const checkNickname = () => {
    if (nickname === "카공족") {
      setMessage("이미 사용 중인 닉네임입니다.");
    } else {
      setMessage("사용 가능한 닉네임입니다.");
      setIsAvailable(true);
    }
  };

  const buttonClass = nickname.trim()
    ? "text-[#4CB1F1] cursor-pointer"
    : "text-[#ADAEBC] cursor-not-allowed";
  
  return (
    <div className="flex flex-col min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #EFF7FB 0%, #CAF1FF 100%)',
    }}>
      <div className="flex-1 px-[1.875rem]">
        <p className="mt-[11.625rem] text-center text-[#4CB1F1]">
          앞으로의 공부 여정을<br />함께할 이름을 알려주세요.
        </p>
        <div className="flex items-center relative mt-[6.5rem] w-full">
          <input
            type="text"
            className="w-full px-[1rem] py-[0.563rem] text-[0.75rem] text-black
            border border-[#E5E5E5] rounded-[0.5rem]"
            placeholder="사용할 이름을 입력해주세요. (2~12자)"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsAvailable(false);
              setMessage("");
            }}
          />
          <button
            type="button"
            className={`text-[0.75rem] font-medium absolute right-[1rem] ${buttonClass}`}
            onClick={checkNickname}
            disabled={!nickname.trim()}
          >
            중복확인
          </button>
        </div>
        {message && (
          <div
            className="mt-[0.5rem] px-[0.875rem] text-[0.75rem] w-full text-left text-[#4CB1F1]"
          >
            {message}
          </div>
        )}
      </div>
      <NextButton text={"다음"} onClick={onNext} disabled={!isAvailable} />
    </div>
  );
};
export default Nickname;