import Symbol from "../../assets/symbol.svg?react";
import Logo from '../../assets/whiteLogo.svg?react';

const LoginMainView = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center"
      style={{
        background: 'linear-gradient(180deg, #EFF7FB 0%, #CAF1FF 100%)',
    }}>
      <p className="text-center text-[1.125rem] text-[#4CB1F1]">
        청년을 위한 공부지도
      </p>
      <div className="flex flex-col items-center mt-[2.375rem] space-y-[0.5rem]">
        <Symbol
          className="text-[#4CB1F1] scale-[0.8]"
        />
        <Logo
          className="text-[#4CB1F1] scale-[0.8]"
        />
      </div>
    </div>
  );
};
export default LoginMainView;