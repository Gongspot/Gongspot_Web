import Kakao from '../../assets/kakao.svg?react';
import { useEffect, useState } from "react";

const KakaoLoginButton = () => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [kakaoVisible, setKakaoVisible] = useState(false);

  useEffect(() => {
    const buttonTimer = setTimeout(() => setButtonVisible(true), 10);
    const kakaoTimer = setTimeout(() => setKakaoVisible(true), 200);
    return () => {
      clearTimeout(buttonTimer);
      clearTimeout(kakaoTimer);
    };
  }, []);
  
  return (
      <div className="flex items-center w-[300px] mx-auto relative">
        <Kakao 
          className={`
              transition-opacity transition-colors absolute left-[24px]
              ${kakaoVisible ? 'text-black' : 'text-[#FEE500]'}
            `}
          style={{ 
            opacity: kakaoVisible ? 1 : 0,
            color: kakaoVisible ? 'black' : '#FEE500', 
            transition: 'color 1.5s, opacity 1s',
          }}
        />
        <button
          className="transition-opacity transition-colors 
            w-[300px] h-[45px] bg-[#FEE500] rounded-[12px] text-[#000000D9]"
          style={{ 
            opacity: buttonVisible ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        >
          카카오 로그인
        </button>
      </div>
  );
};

export default KakaoLoginButton;