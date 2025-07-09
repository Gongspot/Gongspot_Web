import { useState } from "react";

interface NicknameProps {
  nickname: string;
}

const Nickname = ({ nickname }: NicknameProps) => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  
  const checkNickname = () => {
    if (inputValue === "") {
      setMessage("닉네임을 입력해주세요.");
    } else if (inputValue === "카공족") {
      setMessage("이미 사용 중인 닉네임입니다.");
    } else {
      setMessage("사용 가능한 닉네임입니다.");
    }
  };

  const buttonClass = inputValue.trim()
    ? "text-[#4CB1F1] cursor-pointer"
    : "text-[#ADAEBC] cursor-not-allowed";

  return (
    <div className="flex flex-col items-center mt-[2.5rem] px-[1.5rem] w-full">
      <div className="text-left text-[1rem] w-full">
        닉네임
      </div>
      <div className="mt-[0.5rem] w-full flex items-center relative">
        <input
          type="text"
          className="w-full px-[0.875rem] py-[0.563rem] text-[0.75rem] text-black border border-[#E5E5E5] rounded-[0.5rem]"
          placeholder={nickname}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="button"
          className={`text-[0.75rem] font-medium absolute right-[1.5rem] ${buttonClass}`}
          onClick={checkNickname}
          disabled={!inputValue.trim()}
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
  );
};

export default Nickname;