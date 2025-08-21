import { useState } from "react";
import NextButton from "../NextButton";

interface NicknameProps {
  onNext: () => void;
  nickname: string;
  setNickname: (value: string) => void;
}

const Nickname = ({ onNext, nickname, setNickname }: NicknameProps) => {
  const [isAvailable, setIsAvailable] = useState(false);

  const buttonClass = nickname.trim()
    ? "bg-[#4CB1F1] text-white cursor-pointer"
    : "bg-[#D4D4D4] text-white cursor-not-allowed";

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
              const value = e.target.value;
              setNickname(value);
              setIsAvailable(true);
              if (value.trim()) {
                setIsAvailable(true);
              } else {
                setIsAvailable(false);
              }
            }}
          />
        </div>
      </div>
      <NextButton 
        text={"다음"}
        className={`w-full leading-[2.875rem] bg-[#4CB1F1] text-[1rem] rounded-[0.313rem] ${buttonClass}`}
        onClick={onNext}
        disabled={!isAvailable} />
    </div>
  );
};
export default Nickname;