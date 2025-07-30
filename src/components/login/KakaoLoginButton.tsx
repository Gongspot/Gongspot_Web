import Kakao from '../../assets/kakao.svg?react';
import { useEffect, useState } from "react";

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

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

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email,profile_nickname,profile_image`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  
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
          onClick={handleLogin}
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