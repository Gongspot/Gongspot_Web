import NextButton from "../NextButton";

interface NicknameProps {
  onNext: () => void;
}

const Nickname = ({ onNext }: NicknameProps) => {
  return (
    <div className="flex flex-col min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #EFF7FB 0%, #CAF1FF 100%)',
    }}>
      <div className="flex-1">
        <p className="mt-[11.625rem] text-center text-[#4CB1F1]">
          앞으로의 공부 여정을<br />함께할 이름을 알려주세요.
        </p>
        <div className="mt-[6.5rem] px-[1.875rem] w-full">
          <input
            type="text"
            className="w-full px-[1rem] py-[0.563rem] text-[0.75rem] text-black
            border border-[#E5E5E5] rounded-[0.5rem]"
            placeholder="사용할 이름을 입력해주세요. (2~12자)"
          />
        </div>
      </div>
      <NextButton text={"다음"} onClick={onNext} />
    </div>
  );
};
export default Nickname;