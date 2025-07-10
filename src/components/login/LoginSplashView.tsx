import Symbol from "../../assets/symbol.svg?react";
import Logo from '../../assets/whiteLogo.svg?react';
import { useEffect, useState } from "react";
import Background from "./Background";

const LoginSplashView = () => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center">
      <Background animate={animate} />
      <div className="relative z-10 flex flex-col items-center">
        <p className={`text-center text-[1.125rem] transition-colors duration-[2000ms]
          ${animate ? 'text-white' : 'text-[#4CB1F1]'}`}>
          청년을 위한 공부지도
        </p>
        <div className="flex flex-col items-center mt-[2.375rem]">
          <Symbol
            className={`
              transition-transform transition-colors duration-[2000ms] mb-[0.5rem]
              ${animate ? 'text-white scale-100' : 'text-[#4CB1F1] scale-[0.8]'}
            `}
          />
          <Logo
            className={`
              transition-transform transition-colors duration-[2000ms]
              ${animate ? 'text-white scale-100' : 'text-[#4CB1F1] scale-[0.8]'}
            `}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginSplashView;