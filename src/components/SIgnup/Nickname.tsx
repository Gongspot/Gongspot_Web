import NextButton from "./NextButton";

const Nickname = () => {
  return (
    <div className="min-h-screen text-center text-[#4CB1F1]"
    style={{
        background: 'linear-gradient(180deg, #EFF7FB 0%, #CAF1FF 100%)',
      }}>
      <div className="pt-[11.625rem]">
        앞으로의 공부 여정을<br />함께할 이름을 알려주세요.
      </div>

      <div className="mt-[6.5rem] px-[1.875rem] w-full">
        <input
          type="text"
          className="w-full px-[1rem] py-[0.563rem] text-[0.75rem] text-[#C7C7C7] border border-[#E5E5E5] rounded-[0.5rem]"
          placeholder="사용할 이름을 입력해주세요. (2~12자)"
        />
      </div>
      <div className="fixed bottom-0 w-full px-[1.75rem] pb-[1.875rem] bg-transparent">
        <NextButton text={"다음"} />
      </div>
    </div>
  );
};
export default Nickname;