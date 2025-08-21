import Nickname from "../components/signup/Nickname";
import BasicInfo from "../components/signup/BasicInfo";
import { useEffect, useState } from "react";

const SignupPage = () => {
  const [step, setStep] = useState("nickname");
  const [nickname, setNickname] = useState("");

  const handleNext = () => {
    setStep("userinfo");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");

    if (state !== "local") return;
    
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const isNewUserParam = urlParams.get("isNewUser");
    const isNewUserBoolean = isNewUserParam === "true";

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("isNewUser", JSON.stringify(isNewUserBoolean));

      // 쿼리 파라미터 삭제
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  return (
    <div>
      {step === "nickname" && 
        <Nickname 
          onNext={handleNext} 
          nickname={nickname}
          setNickname={setNickname} 
        />}
      {step === "userinfo" && <BasicInfo nickname={nickname} />}
    </div>
  );
};
export default SignupPage;